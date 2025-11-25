import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import OrderItem from "@components/Order/OrderItem/OrderItem";
import { LOCALES_MAP } from "@configs/map.config";
import { ACCESS_TOKEN_EXPIRE_STATUS_CODE, ORDER } from "@constants/url/url";
import { RootState } from "@redux/store";
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

const OrderScreen = () => {
  const lang = useSelector((state: RootState) => state.language.lang);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false); // 是否刷新
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [orderList, setOrderList] = useState<
    {
      id: string;
      title: string;
      price: number;
      resourceId: string;
      resourceType: "product" | "course";
      resourceVariantType: string;
      createdAt: string;
    }[]
  >([]);
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
  const getOrderList = async () => {
    setLoading(true);
    try {
      let url = `${ORDER}`;
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
        setOrderList(items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // 下拉刷新加载最新数据
  const onRefreshOrderList = async () => {
    try {
      let url = `${ORDER}`;
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
        setOrderList(items);
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  // 上拉加载数据
  const onEndReachedOrderList = async () => {
    try {
      let url = `${ORDER}`;
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
          console.log(items.length);
          setHasMore(false);
        }
        setOrderList((preData) => {
          return [...preData, ...items];
        });
      }
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };
  useEffect(() => {
    getOrderList();
  }, []);
  // useEffect(() => {
  //   if (page === 1 && hasMore) {
  //     getOrderList();
  //   }
  // }, [q, serviceCategoryId, page, hasMore]);
  useEffect(() => {
    if (refreshing && page === 1) {
      onRefreshOrderList();
    }
  }, [refreshing, page, hasMore]);
  // useEffect(() => {
  //   if (page > 1 && loadingMore) {
  //     onEndReachedOrderList();
  //   }
  // }, [page, loadingMore]);
  const handleBack = () => {
    router.back();
  };
  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
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
        <Text style={styles.Title}>{t("common:my-order")}</Text>
        {/* 滚动内容 */}
        <View style={styles.ScrollWrapper}>
          <View style={styles.ScrollMain}>
            {loading ? (
              <Loading />
            ) : orderList.length === 0 ? (
              <Empty />
            ) : (
              <FlatList
                data={orderList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return <OrderItem {...item} />;
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#6562A9"]}
                    progressBackgroundColor="#ffffff" // 背景色
                  />
                }
                // onEndReached={onEndReached} // 触发上拉加载
                // onEndReachedThreshold={0.1} // 距离底部10%触发加载
                // ListFooterComponent={renderFooter} // 底部加载组件
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

export default OrderScreen;
