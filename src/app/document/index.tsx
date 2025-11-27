import { fetcher } from "@api/request";

import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";

import DocumentItem from "@components/Document/DocumentItem/DocumentItem";

import { themes } from "@themes/themes";

import { DOCUMENT } from "@constants/url/url";
import { Document } from "@type/common/Document/Document.types";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { debounce } from "lodash";
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

const DocumentScreen = () => {
  console.log("DocumentScreen");
  const { t } = useTranslation();
  const [q, setQ] = useState<string>("");
  const [page, setPage] = useState<number>(1); // 页码
  const [hasMore, setHasMore] = useState<boolean>(true); // 是否还有更多数据
  const [pageSize, setPageSize] = useState<number>(10); // 每页数据条数
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // 课程
  const [documentList, setDocumentList] = useState<Document[]>([]);

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
  const getDocumentList = async () => {
    setLoading(true);
    try {
      let url = `${DOCUMENT}?page=${page}&perPage=${pageSize}&isFree=true`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }
      const response = await fetcher(url, {
        method: "GET",
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

  const onRefreshDocumentList = async () => {
    try {
      let url = `${DOCUMENT}?page=${page}&perPage=${pageSize}&isFree=true`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }
      const response = await fetcher(url, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        setDocumentList([...items]);
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  const onEndReachedDocumentList = async () => {
    try {
      let url = `${DOCUMENT}?page=${page}&perPage=${pageSize}&isFree=true`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }
      const response = await fetcher(url, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;

        // 若果数据不足,说明没有更多数据了
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
  // useEffect(() => {
  //   const unsubscribeFocus = navigation.addListener("focus", () => {
  //     setQ("");
  //     setPage(1);
  //     setHasMore(true);
  //   });

  //   return () => {
  //     unsubscribeFocus();
  //   };
  // }, [navigation, accessToken]);

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
  }, [page, loadingMore]);

  const onChangeText = debounce((text: string) => {
    setQ(text);
    setPage(1);
    setHasMore(true);
  }, 500);
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
            {t("document:home")}
          </Text>
        </Pressable>
        {/* 标题 筛选 */}
        <View style={styles.TitleFilterWrapper}>
          <View style={styles.TitleFilterMain}>
            <Text style={styles.Title}>{t("document:all-product")}</Text>
            {/* <Text style={styles.Filter}>{t("document:filter")}</Text> */}
          </View>
        </View>
        {/* 搜索 */}
        <Pressable
          onPress={() => handleSearch()}
          style={{
            ...styles.SearchWrapper,
            backgroundColor: themes.color.white,
          }}
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
            {/* <CourseList
              navigation={navigation}
              accessToken={accessToken}
              setQ={setQ}
              q={q}
              page={page}
              setPage={setPage}
              hasMore={hasMore}
              setHasMore={setHasMore}
            /> */}
            {loading ? (
              <Loading />
            ) : documentList.length === 0 ? (
              <Empty />
            ) : (
              <FlatList
                data={documentList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return <DocumentItem key={item.id} document={item} />;
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
export default DocumentScreen;
