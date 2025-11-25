import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import { MEMBER_PROFILE, SERVICE_CATEGORY } from "@constants/url/url";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "@redux/store";
import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";

import { fetcher } from "@api/request";
import AdvisorItem from "@components/Advisor/AdvisorItem/AdvisorItem";
import { themes } from "@themes/themes";
import { Advisor as AdvisorType } from "@type/common/Advisor/Advisor.types";
import { StatusBar } from "expo-status-bar";
import { Search } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CounselorScreen = () => {
  const lang = useSelector((state: RootState) => state.language.lang);
  const navigation = useNavigation<any>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { t } = useTranslation();
  const [q, setQ] = useState<string>("");
  const [categoryList, setCategoryList] = useState<
    { id: string; slug: string; name: string; description: string | null }[]
  >([]);
  const [serviceCategoryId, setServiceCategoryId] = useState<string>("");
  const [show, setShow] = useState<boolean>(false); // 筛选国家
  const [countryCodeList, setCountryCodeList] = useState<string[]>([]); // 国家类型筛选
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false); // 是否刷新
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [advisorList, setAdvisorList] = useState<AdvisorType[]>([]);
  // 跳转到搜索
  const handleSearch = () => {
    navigation.navigate("Search");
  };
  const onChangeText = (text: string) => {
    setQ(text);
    setCountryCodeList([]);
    setPage(1);
    setHasMore(true);
  };
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
  // 获得类别
  const getCategoryList = async () => {
    try {
      const response = await fetcher(`${SERVICE_CATEGORY}`, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload;
        setCategoryList([
          {
            id: "",
            slug: t("resource:all"),
            name: t("resource:all"),
            description: "",
          },
          ...items,
        ]);
      }
    } catch (error) {
    } finally {
    }
  };
  // 获得文档
  const getAdvisorList = async () => {
    setLoading(true);
    try {
      let url = `${MEMBER_PROFILE}?page=${page}&perPage=${pageSize}`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }
      if (serviceCategoryId.length > 0) {
        url += `&serviceCategoryId=${serviceCategoryId}`;
      }
      if (countryCodeList.length > 0) {
        url += `&countryCodes[]=${countryCodeList[0]}`;
      }

      const response = await fetcher(url, {
        method: "GET",
      });

      if (response.ok) {
        const json = await response.json();
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
      if (serviceCategoryId.length > 0) {
        url += `&serviceCategoryId=${serviceCategoryId}`;
      }
      if (countryCodeList.length > 0) {
        url += `&countryCodes[]=${countryCodeList[0]}`;
      }
      //   if (topicId) {
      //     url += `&topicIds[]=${topicId}`;
      //   }
      const response = await fetcher(url, {
        method: "GET",
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
      if (serviceCategoryId.length > 0) {
        url += `&serviceCategoryId=${serviceCategoryId}`;
      }
      if (countryCodeList.length > 0) {
        url += `&countryCodes[]=${countryCodeList[0]}`;
      }
      //   if (topicId) {
      //     url += `&topicIds[]=${topicId}`;
      //   }
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
    getCategoryList();
  }, []);
  useEffect(() => {
    if (page === 1 && hasMore) {
      getAdvisorList();
    }
  }, [q, serviceCategoryId, countryCodeList, page, hasMore]);

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
    <SafeAreaView style={styles.Container} edges={["top"]}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="dark" />
        {/* 搜索 */}
        <Pressable style={styles.SearchWrapper} onPress={() => handleSearch()}>
          <View style={styles.SearchMain}>
            <Search color={"#A1A1AA"} size={20} strokeWidth={0.8} />
            <Text style={styles.Slug}>{t("advisor:advisor")}</Text>
            <Text style={styles.Search}>{t("search:search")}</Text>
          </View>
        </Pressable>
        {/* 筛选 */}
        {/* <Filter
          categoryList={categoryList}
          setServiceCategoryId={setServiceCategoryId}
          setPage={setPage}
          setHasMore={setHasMore}
          show={show}
          setShow={setShow}
        /> */}
        {/* 内容区域 */}
        <View style={styles.ScrollWrapper}>
          <View style={styles.ScrollMain}>
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
          </View>
        </View>
        {/* <CountryPicker
          lang={lang}
          show={show}
          pickerButtonOnPress={(item) => {
            setCountryCodeList([item.code]);
            setPage(1);
            setHasMore(true);
            setShow(false);
          }}
        /> */}
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
  // 返回和搜索框
  SearchWrapper: {
    backgroundColor: themes.color.white,
    paddingHorizontal: 10,
  },
  SearchMain: {
    height: 40,
    backgroundColor: "#F4F4F5",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  Slug: {
    marginLeft: 6,
    flex: 1,
    color: "#71717A",
    fontSize: 12,
  },
  Search: {
    backgroundColor: "#6562A933",
    fontSize: 10,
    color: "#6562A9",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
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
export default CounselorScreen;
