import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import DocumentItem from "@components/Document/DocumentItem/DocumentItem";
import { LOCALES_MAP } from "@configs/map.config";
import { ACCESS_TOKEN_EXPIRE_STATUS_CODE, DOCUMENT } from "@constants/url/url";
import { RootState } from "@redux/store";
import { Document } from "@type/common/Document/Document.types";
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

const MyProductScreen = () => {
  const lang = useSelector((state: RootState) => state.language.lang);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const { t } = useTranslation();

  const [documentList, setDocumentList] = useState<Document[]>([]);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [show, setShow] = useState<boolean>(false); // 筛选国家
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false); // 是否刷新
  const [hasMore, setHasMore] = useState<boolean>(true);
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
  const getDocumentList = async () => {
    setLoading(true);
    try {
      let url = `${DOCUMENT}/instance?page=${page}&perPage=${pageSize}&isFree=true`;

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
      let url = `${DOCUMENT}/instance?page=${page}&perPage=${pageSize}&isFree=true`;
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
      let url = `${DOCUMENT}/instance?page=${page}&perPage=${pageSize}&isFree=true`;
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
        setDocumentList((preData) => {
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
      getDocumentList();
    }
  }, [page, hasMore]);
  useEffect(() => {
    if (refreshing && page === 1) {
      onRefreshDocumentList();
    }
  }, [refreshing, page, hasMore]);
  useEffect(() => {
    if (page > 1 && loadingMore) {
      onEndReachedDocumentList();
    }
  }, [page, loadingMore]);
  const handleBack = () => {
    router.back();
  };
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="dark" />
        <Pressable onPress={() => handleBack()} style={styles.Navigate}>
          <ChevronLeft color={"#27272A"} size={20} />
          <Text style={{ fontSize: 14, fontWeight: 400 }}>
            {t("common:account")}
          </Text>
        </Pressable>
        {/* <NavigateBack paddingHorizontal={20} title={t("my:order")} /> */}
        <Text style={styles.Title}>{t("common:product")}</Text>
        {/* 内容区域 */}
        <View style={styles.ScrollWrapper}>
          <View style={styles.ScrollMain}>
            {loading ? (
              <Loading />
            ) : documentList.length === 0 ? (
              <Empty />
            ) : (
              <FlatList
                data={documentList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return <DocumentItem document={item} />;
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  Content: {
    flex: 1,
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
    paddingHorizontal: 17,
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

export default MyProductScreen;
