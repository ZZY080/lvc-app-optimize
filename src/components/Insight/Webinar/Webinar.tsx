import { fetcher } from "@api/request";
import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";

import WebinarItem from "@components/Webinar/WebinarItem/WebinarItem";
import { useNavigation } from "@react-navigation/native";
import { Webinar as WebinarType } from "@type/common/Webinar/Webinar.types";

import { WEBINAR } from "@constants/url/url";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Webinar = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [webinarList, setWebinarList] = useState<WebinarType[]>([]);

  const [serviceCategoryId, setServiceCategoryId] = useState<string>("");
  const [countryCodeList, setCountryCodeList] = useState<string[]>([]); // 国家类型筛选
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false); // 是否刷新
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false); // 筛选国家

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

  // 获得文档
  const getWebinarList = async () => {
    setLoading(true);
    try {
      let url = `${WEBINAR}?page=${page}&perPage=${pageSize}`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }
      if (serviceCategoryId.length > 0) {
        url += `&serviceIds[]=${serviceCategoryId}`;
      }
      if (countryCodeList.length > 0) {
        url += `&countryCodes[]=${countryCodeList[0]}`;
      }
      const response = await fetcher(url, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        setWebinarList(items);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // 下拉刷新数据
  const onRefreshWebinarList = async () => {
    try {
      let url = `${WEBINAR}?page=${page}&perPage=${pageSize}`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }
      if (serviceCategoryId.length > 0) {
        url += `&serviceIds[]=${serviceCategoryId}`;
      }
      if (countryCodeList.length > 0) {
        url += `&countryCodes[]=${countryCodeList[0]}`;
      }
      const response = await fetcher(url, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        setWebinarList(items);
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  // 上拉加载数据
  const onEndReachedWebinarList = async () => {
    try {
      let url = `${WEBINAR}?page=${page}&perPage=${pageSize}`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }
      if (serviceCategoryId.length > 0) {
        url += `&serviceIds[]=${serviceCategoryId}`;
      }
      if (countryCodeList.length > 0) {
        url += `&countryCodes[]=${countryCodeList[0]}`;
      }
      const response = await fetcher(url, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        // 如果数据不足,说明没有更多数据了
        if (items.length < pageSize) {
          setHasMore(false);
        }
        setWebinarList((preData) => {
          return [...preData, ...items];
        });
      }
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };
  // 页面栈未调用
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      setPage(1);
      setHasMore(true);
    });
    // 清理监听器
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  useEffect(() => {
    if (page === 1 && hasMore) {
      getWebinarList();
    }
  }, [q, serviceCategoryId, countryCodeList, page, hasMore]);

  useEffect(() => {
    if (refreshing && page === 1) {
      onRefreshWebinarList();
    }
  }, [refreshing, page, hasMore]);
  useEffect(() => {
    if (page > 1 && loadingMore) {
      onEndReachedWebinarList();
    }
  }, [page, loadingMore]);

  return (
    <View style={styles.WebinarWrapper}>
      <View style={styles.WebinarMain}>
        {/* 内容区域 */}
        <View style={styles.ScrollWrapper}>
          <View style={styles.ScrollMain}>
            {loading ? (
              <Loading />
            ) : webinarList.length === 0 ? (
              <Empty />
            ) : (
              <FlatList
                data={webinarList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return <WebinarItem webinar={item} />;
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
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  WebinarWrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  WebinarMain: {
    flex: 1,
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

export default Webinar;
