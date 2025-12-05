import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import ResourceItem from "@components/Document/DocumentItem/DocumentItem";
import { LOCALES_MAP } from "@configs/map.config";
import { DOCUMENT } from "@constants/url/url";
import { RootState } from "@redux/store";
import { Document as DocumentType } from "@type/common/Document/Document.types";
import { useFocusEffect } from "expo-router";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
interface DocumentProps {
  q: string;
  topicId: string | undefined;
}
const Document: React.FC<DocumentProps> = ({ q, topicId }) => {
  const lang = useSelector((state: RootState) => state.language.lang);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false); // 是否刷新
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [documentList, setDocumentList] = useState<DocumentType[]>([]);

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
  const getDocumentList = async () => {
    setLoading(true);
    try {
      let url = `${DOCUMENT}?page=${page}&perPage=${pageSize}&isFree=true`;
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
        setDocumentList(items);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  // 下拉刷新数据
  const onRefreshDocumentList = async () => {
    try {
      let url = `${DOCUMENT}?page=${page}&perPage=${pageSize}&isFree=true`;
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
        setDocumentList(items);
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  // 上拉加载数据
  const onEndReachedDocumentList = async () => {
    try {
      let url = `${DOCUMENT}?page=${page}&perPage=${pageSize}&isFree=true`;
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
        setDocumentList((preData) => {
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
      // 页面获得焦点时执行
      setPage(1);
      setHasMore(true);

      return () => {
        // 页面失焦时执行（可选）
      };
    }, [])
  );

  useEffect(() => {
    if (page === 1 && hasMore) {
      getDocumentList();
    }
  }, [q, page, hasMore]);

  useEffect(() => {
    if (refreshing && page === 1) {
      onRefreshDocumentList();
    }
  }, [refreshing, page, hasMore]);
  useEffect(() => {
    if (page > 1 && loadingMore) {
      onEndReachedDocumentList();
    }
  }, [loadingMore, page]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : documentList.length === 0 ? (
        <Empty />
      ) : (
        <FlatList
          data={documentList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <ResourceItem document={item} />;
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
          bounces={true} // 禁用溢出时的波纹效果 适用于 ios 平台
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  DocumentWrapper: {},
  DocumentMain: {},
});
export default Document;
