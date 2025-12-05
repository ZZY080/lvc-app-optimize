import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import { LOCALES_MAP } from "@configs/map.config";
import { RootState } from "@redux/store";
import { Advisor as AdvisorType } from "@type/common/Advisor/Advisor.types";
import { MEMBER_PROFILE } from "constants/url/url";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import AdvisorItem from "../AdvisorItem/AdvisorItem";
interface AdvisorProps {
  q: string;
  topicId: string | undefined;
}
const Advisor: React.FC<AdvisorProps> = ({ q, topicId }) => {
  const lang = useSelector((state: RootState) => state.language.lang);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false); // 是否刷新
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [advisorList, setAdvisorList] = useState<AdvisorType[]>([]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
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
  // 获得文档
  const getAdvisorList = async () => {
    setLoading(true);
    try {
      let url = `${MEMBER_PROFILE}?page=${page}&perPage=${pageSize}`;
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
        setAdvisorList(items);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  // 下拉刷新数据
  const onRefreshAdvisorList = async () => {
    try {
      let url = `${MEMBER_PROFILE}?page=${page}&perPage=${pageSize}`;
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
        setAdvisorList(items);
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  // 上拉加载数据
  const onEndReachedAdvisorList = async () => {
    try {
      let url = `${MEMBER_PROFILE}?page=${page}&perPage=${pageSize}`;
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
        // 如果数据不足,说明没有更多数据了
        if (items.length < pageSize) {
          setHasMore(false);
        }
        setAdvisorList((preData) => {
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
      getAdvisorList();
    }
  }, [q, page, hasMore]);

  useEffect(() => {
    if (refreshing && page === 1) {
      onRefreshAdvisorList();
    }
  }, [refreshing, page, hasMore]);
  useEffect(() => {
    if (page > 1 && loadingMore) {
      onEndReachedAdvisorList();
    }
  }, [loadingMore, page]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : advisorList.length === 0 ? (
        <Empty />
      ) : (
        <FlatList
          data={advisorList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <AdvisorItem key={item.id} advisor={item} />;
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#6562A9"]}
              progressBackgroundColor="#ffffff" // 背景色
            />
          }
          onEndReached={onEndReached} //触底时触发
          onEndReachedThreshold={0.1} // 触发时机为到达底部10%时
          ListFooterComponent={renderFooter} // 底部加载组件
          showsVerticalScrollIndicator={false}
          overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
          bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  DocumentWrapper: {},
  DocumentMain: {},
});
export default Advisor;
