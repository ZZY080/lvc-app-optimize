import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import CourseItem from "@components/Course/CourseItem/CourseItem";
import { LOCALES_MAP } from "@configs/map.config";
import { COURSE } from "@constants/url/url";
import { RootState } from "@redux/store";
import { themes } from "@themes/themes";
import { Course } from "@type/common/Course/Course.types";
import { router } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { ChevronLeft, Search } from "lucide-react-native";
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

const CourseScreen = () => {
  const { t } = useTranslation();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [q, setQ] = useState<string>("");
  const [page, setPage] = useState<number>(1); // 页码
  const [hasMore, setHasMore] = useState<boolean>(true); // 是否还有更多数据
  const lang = useSelector((state: RootState) => state.language.lang);
  const [pageSize, setPageSize] = useState<number>(10); // 每页数据条数
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // 课程
  const [courseList, setCourseList] = useState<Course[]>([]);

  // 跳转到搜索
  const handleSearch = () => {
    router.push("/search");
  };
  // 下拉刷新加载最新数据
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
      let url = `${COURSE}?page=${page}&perPage=${pageSize}&isFree=true`;
      if (q.trim().length > 0) {
        url += `&q=${q}&isFree=true`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "accept-language": LOCALES_MAP[lang],
          ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
        },
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        setCourseList(items);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onRefreshCourseList = async () => {
    try {
      let url = `${COURSE}?page=${page}&perPage=${pageSize}&isFree=true`;
      if (q.trim().length > 0) {
        url += `&q=${q}&isFree=true`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "accept-language": LOCALES_MAP[lang],
          ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
        },
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        setCourseList([...items]);
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  const onEndReachedCourseList = async () => {
    try {
      let url = `${COURSE}?page=${page}&perPage=${pageSize}&isFree=true`;
      if (q.trim().length > 0) {
        url += `&q=${q}&isFree=true`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "accept-language": LOCALES_MAP[lang],
          ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
        },
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;

        // 若果数据不足,说明没有更多数据了
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
  }, [q, page, hasMore]);
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
    router.back();
  };
  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="dark" />
        {/* 返回 */}
        <Pressable onPress={() => handleBack()} style={styles.Navigate}>
          <ChevronLeft color={"#27272A"} size={20} />
          <Text style={{ fontSize: 14, fontWeight: 400, color: "#27272A" }}>
            {t("common:home")}
          </Text>
        </Pressable>
        {/* 标题 筛选 */}
        <View style={styles.TitleFilterWrapper}>
          <View style={styles.TitleFilterMain}>
            <Text style={styles.Title}>{t("course:all-course")}</Text>
            {/* <Text style={styles.Filter}>{t("course:filter")}</Text> */}
          </View>
        </View>
        {/* 搜索 */}
        <Pressable
          style={{
            ...styles.SearchWrapper,
            backgroundColor: themes.color.white,
          }}
          onPress={() => handleSearch()}
        >
          <View style={styles.SearchMain}>
            <View style={styles.SlugSearch}>
              <Text
                style={styles.Slug}
                // placeholder="Search"
                // onChangeText={(text) => onChangeText(text)}
              >
                {t("common:search")}
              </Text>
              <Search size={20} color={"#A1A1AA"} strokeWidth={0.8} />
            </View>
          </View>
        </Pressable>
        {/* 屏幕滚动 */}
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
    backgroundColor: "#ffffff",
  },
  Content: {
    flexGrow: 1,
  },
  // 返回
  Navigate: {
    marginTop: 10,
    height: 24,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  // 标题筛选
  TitleFilterWrapper: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  TitleFilterMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Title: {
    color: "#000000",
    fontWeight: 400,
    fontSize: 20,
  },
  Filter: {
    color: "#006FEE",
    fontWeight: 400,
    fontSize: 14,
  },
  // 搜索
  SearchWrapper: {
    marginTop: 20,
    paddingHorizontal: 6,
  },
  SearchMain: {
    display: "flex",
    height: 40,
  },
  SlugSearch: {
    flex: 1,
    height: 30,
    backgroundColor: "#F4F4F5",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  Slug: {
    flex: 1,
    color: "#71717A",
  },

  ScrollWrapper: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 6,
  },
  ScrollMain: {
    flex: 1,
  },
});
export default CourseScreen;
