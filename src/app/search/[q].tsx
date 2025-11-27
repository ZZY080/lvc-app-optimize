import Advisor from "@components/SearchDetail/Advisor/Advisor";
import Article from "@components/SearchDetail/Article/Article";
import Course from "@components/SearchDetail/Course/Course";
import Document from "@components/SearchDetail/Document/Document";
import Filter from "@components/SearchDetail/Filter/Filter";
import Webinar from "@components/SearchDetail/Webinar/Webinar";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, Search } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchDetailScreen = () => {
  const { q, topicId } = useLocalSearchParams<{
    q: string;
    topicId: string;
  }>();
  const { t } = useTranslation();
  const [categoryList, setCategoryList] = useState<
    {
      id: string;
      name: string;
    }[]
  >([
    {
      id: "0",
      name: t("search-detail:product"),
    },
    {
      id: "1",
      name: t("search-detail:course"),
    },
    {
      id: "2",
      name: t("search-detail:article"),
    },
    {
      id: "3",
      name: t("search-detail:webinar"),
    },
    {
      id: "4",
      name: t("search-detail:advisor"),
    },
  ]);
  // 默认激活第一个
  const [tabIndex, setTabIndex] = useState<number>(0);
  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="light" />
        {/* 返回和搜索 */}
        <View style={styles.NavigationBackSearchWrapper}>
          <View style={styles.NavigationBackSearchMain}>
            <TouchableOpacity style={styles.Icon} onPress={() => router.back()}>
              {/* <CustomIcon name="icon-back" color={"white"} size={15} /> */}
              <ChevronLeft />
            </TouchableOpacity>
            <Pressable style={styles.SlugSearch} onPress={() => router.back()}>
              <TextInput
                style={styles.Slug}
                placeholder={t("search-detail:search")}
                value={q}
                onFocus={() => router.back()}
              />
              {/* <CustomIcon name="icon-search" color="#C4C4C4" /> */}
              <Search />
            </Pressable>
          </View>
        </View>
        {/* 筛选 */}
        <Filter
          categoryList={categoryList}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
        {/* 内容区域 */}
        <View style={styles.ScrollWrapper}>
          <View style={styles.ScrollMain}>
            {tabIndex === 0 ? <Document q={q} topicId={topicId} /> : null}
            {tabIndex === 1 ? <Course q={q} topicId={topicId} /> : null}
            {tabIndex === 2 ? <Article q={q} topicId={topicId} /> : null}
            {tabIndex === 3 ? <Webinar q={q} topicId={topicId} /> : null}
            {tabIndex === 4 ? <Advisor q={q} topicId={topicId} /> : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Content: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
  },
  // 返回和搜索框
  NavigationBackSearchWrapper: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
  },
  NavigationBackSearchMain: {
    display: "flex",
    flexDirection: "row",
    height: 36,
    alignItems: "center",
  },
  Icon: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    padding: 6,
    marginRight: 10,
  },
  SlugSearch: {
    height: "100%",
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  Slug: {
    flex: 1,
    height: "100%",
    fontSize: 12,
  },
  // 筛选
  FilterWrapper: {
    paddingHorizontal: 17,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 3px 5px 0px rgba(182, 182, 182, 0.25)",
  },
  FilterMain: {
    height: 45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // tab切换
  TabBarWrapper: {},
  TabBarMain: {
    display: "flex",
    flexDirection: "row",
  },
  TabBarItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: 25,
  },
  // 滚动内容
  ScrollWrapper: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  ScrollMain: {
    flex: 1,
  },
});
export default SearchDetailScreen;
