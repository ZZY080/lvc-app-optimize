import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import CourseItem from "@components/Course/CourseItem/CourseItem";
import { LOCALES_MAP } from "@configs/map.config";
import {
  ACCESS_TOKEN_EXPIRE_STATUS_CODE,
  COURSE_INSTANCE,
} from "@constants/url/url";
import { RootState } from "@redux/store";
import { Course } from "@type/common/Course/Course.types";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
const MyCourseScreen = () => {
  const { t } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [page, setPage] = useState<number>(1); // 页码
  const [pageSize, setPageSize] = useState<number>(10); // 每页数据条数
  const [show, setShow] = useState<boolean>(false); // 筛选国家
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true); // 是否还有更多数据
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // 课程
  const [courseList, setCourseList] = useState<Course[]>([]);

  const onRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    setPage(1);
  };
  const onEndReached = () => {
    if (hasMore) {
      setPage(page + 1);
      setLoadingMore(true);
    }
  };
  // 渲染加载指示器
  const renderFooter = () => {
    if (loadingMore) {
      return <ActivityIndicator size="small" color="#6562A9" />;
    }
    if (!hasMore) {
      return (
        <Text style={{ textAlign: "center", paddingVertical: 15 }}>
          {t("common:no-more-data")}
        </Text>
      );
    }
    return null;
  };

  // 获取课程
  const getCourseList = async () => {
    setLoading(true);
    try {
      let url = `${COURSE_INSTANCE}?page=${page}&perPage=${pageSize}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "accept-language": LOCALES_MAP[lang],
          ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
        },
      });

      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return router.replace("/auth/login");
      }
      if (response.ok) {
        const json = await response.json();
        const items = json.payload.items;

        setCourseList([...items]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  // 下拉刷新加载最新数据
  const onRefreshCourseList = async () => {
    try {
      let url = `${COURSE_INSTANCE}?page=${page}&perPage=${pageSize}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "accept-language": LOCALES_MAP[lang],
          ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
        },
      });
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return router.replace("/auth/login");
      }
      if (response.ok) {
        const json = await response.json();
        const items = json.payload.items;

        setCourseList(items);
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  // 上拉加载数据
  const onEndReachedCourseList = async () => {
    try {
      let url = `${COURSE_INSTANCE}?page=${page}&perPage=${pageSize}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "accept-language": LOCALES_MAP[lang],
          ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
        },
      });
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return router.replace("/auth/login");
      }
      if (response.ok) {
        const json = await response.json();
        const items = json.payload.items;
        // 如果数据不足,说明没有更多数据了
        if (items.length < pageSize) {
          setHasMore(false);
        }
        setCourseList((preData) => {
          return [...preData, ...items];
        });
      }
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (page === 1 && hasMore) {
      getCourseList();
    }
  }, [page, hasMore]);
  useEffect(() => {
    if (refreshing && page === 1) {
      onRefreshCourseList();
    }
  }, [refreshing, page, hasMore]);
  useEffect(() => {
    if (page > 1 && loadingMore) {
      onEndReachedCourseList();
    }
  }, [page, loadingMore]);

  const handleBack = () => {
    return router.back();
  };
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} />
        <Pressable onPress={() => handleBack()} style={styles.Navigate}>
          <ChevronLeft color={"#27272A"} size={20} />
          <Text style={{ fontSize: 14, fontWeight: 400 }}>
            {t("common:account")}
          </Text>
        </Pressable>
        <Text style={styles.Title}>{t("common:purchase-course")}</Text>
        {/* 内容区域 */}
        <View style={styles.ScrollWrapper}>
          <View style={styles.ScrollMain}>
            {loading ? (
              <Loading />
            ) : courseList.length === 0 ? (
              <Empty />
            ) : (
              <FlatList
                data={courseList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return <CourseItem key={item.id} course={item} />;
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#6562A9"]}
                    progressBackgroundColor="#ffffff" // 背景色
                  />
                }
                onEndReached={onEndReached} // 触发上拉加载
                onEndReachedThreshold={0.1} // 距离底部10%触发加载
                ListFooterComponent={renderFooter} // 底部加载组件
                showsVerticalScrollIndicator={false}
                overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
                bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  Content: {
    flexGrow: 1,
  },
  Navigate: {
    marginTop: 10,
    height: 24,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  Title: {
    marginTop: 20,
    paddingHorizontal: 10,
    color: "#000000",
    fontWeight: 400,
    fontSize: 20,
  },
  ScrollWrapper: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  ScrollMain: {
    flex: 1,
  },
});
export default MyCourseScreen;
