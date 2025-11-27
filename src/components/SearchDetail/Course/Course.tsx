import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import CourseItem from "@components/Course/CourseItem/CourseItem";
import { LOCALES_MAP } from "@configs/map.config";
import { COURSE } from "@constants/url/url";
import { RootState } from "@redux/store";
import { Course as CourseType } from "@type/common/Course/Course.types";
import { useFocusEffect } from "expo-router";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
interface CourseProps {
  q: string;
  topicId: string | undefined;
}
const Course: React.FC<CourseProps> = ({ q, topicId }) => {
  const lang = useSelector((state: RootState) => state.language.lang);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1); // 页码
  const [pageSize, setPageSize] = useState<number>(10); // 每页数据条数
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true); // 是否还有更多数据
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // 课程
  const [courseList, setCourseList] = useState<CourseType[]>([]);
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
        url += `&q=${q}`;
      }
      if (topicId) {
        url += `&topicIds[]=${topicId}`;
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
        url += `&q=${q}`;
      }
      if (topicId) {
        url += `&topicIds[]=${topicId}`;
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
        url += `&q=${q}`;
      }
      if (topicId) {
        url += `&topicIds[]=${topicId}`;
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

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      setHasMore(true);
      return () => {
        // 可选：屏幕失焦时清理
      };
    }, [accessToken])
  );

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
  return (
    <Fragment>
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
    </Fragment>
  );
};

const styles = StyleSheet.create({});
export default Course;
