import { fetcher } from "@api/request";
import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import Article from "@components/SolutionDetail/Article/Article";
import Course from "@components/SolutionDetail/Course/Course";
import Document from "@components/SolutionDetail/Document/Document";
import Filter from "@components/SolutionDetail/Filter/Filter";
import HelpItem from "@components/SolutionDetail/HelpItem/HelpItem";
import Webinar from "@components/SolutionDetail/Webinar/Webinar";

import { TOPIC } from "@constants/url/url";
import { Help, Solution } from "@type/common/Solution/Solution.types";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BriefcaseBusiness, ChevronLeft, Users } from "lucide-react-native";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SolutionDetailScreen = () => {
  const { q, topicId, slug } = useLocalSearchParams<{
    q: string;
    topicId: string;
    slug: string;
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
    // {
    //   id: "4",
    //   name: t("search-detail:advisor"),
    // },
  ]);
  // 默认激活第一个
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const handleBack = () => {
    router.back();
  };
  const [solutionDetailData, setSolutionDetail] = useState<Solution | null>(
    null
  );
  const [helpList, setHelpList] = useState<Help[]>([
    {
      icon: <Users color={"#333179"} size={30} strokeWidth={0.8} />,
      title: t("solution:support"),
      description: t("solution:support-desc"),
      path: "Login",
      hint: t("solution:contact-us"),
    },
    {
      icon: <BriefcaseBusiness color={"#333179"} size={30} strokeWidth={0.8} />,
      title: t("solution:advisors"),
      description: t("solution:need-service"),
      path: "Advisor",
      hint: t("solution:browser-advisors"),
    },
  ]);
  // 获取课程
  const getSolutionDetailList = async () => {
    setLoading(true);
    try {
      const response = await fetcher(`${TOPIC}/${slug}`, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        const payload = json.payload;
        setSolutionDetail(payload);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSolutionDetailList();
  }, []);
  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} />
        {/* 返回和操作 */}
        <View style={styles.NavigateAction}>
          <Pressable onPress={() => handleBack()} style={styles.Navigate}>
            <ChevronLeft color={"#71717A"} size={20} />
            <Text style={{ fontSize: 14, fontWeight: 400, color: "#27272A" }}>
              {t("solution:solution")}
            </Text>
          </Pressable>
          <Text style={styles.Action}>{t("common:save")}</Text>
        </View>
        {loading ? (
          <Loading />
        ) : solutionDetailData ? (
          <Fragment>
            <Text style={styles.Title}>{solutionDetailData.title}</Text>
            <Text style={styles.Description}>
              {solutionDetailData.description}
            </Text>
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
              </View>
            </View>
            {/* 未找到 */}
            <View style={styles.SectionTitleWrapper}>
              <Text style={styles.SectionTitleMain}>
                {t("solution:not-found")}
              </Text>
            </View>
            <View style={styles.SectionDescriptionWrapper}>
              <Text style={styles.SectionDescriptionMain}>
                {t("solution:help-find")}
              </Text>
            </View>
            {/* 帮助 */}
            <View style={styles.HelpWrapper}>
              <ScrollView
                horizontal
                overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
                bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
                showsHorizontalScrollIndicator={false}
                style={styles.HelpMain}
              >
                {helpList.map((item, index) => {
                  return <HelpItem key={index} help={item} />;
                })}
              </ScrollView>
            </View>
          </Fragment>
        ) : (
          <Empty />
        )}
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
    flex: 1,
    display: "flex",
    backgroundColor: "#ffffff",
  },
  NavigateAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    marginTop: 10,
  },
  Navigate: {
    height: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  Action: {
    fontSize: 14,
    color: "#006FEE",
    display: "none",
  },
  Title: {
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 400,
    color: "#000000",
  },
  Description: {
    marginTop: 16,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: 300,
    color: "#A1A1AA",
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
    backgroundColor: "#ffffff",
    paddingTop: 10,
    paddingHorizontal: 10,
    height: 280,
  },
  ScrollMain: {
    height: 280,
    paddingBottom: 20,
  },
  // 未找到
  SectionTitleWrapper: {
    paddingHorizontal: 10,
  },
  SectionTitleMain: {
    fontSize: 16,
    fontWeight: 400,
    color: "#3F3F46",
  },
  SectionDescriptionWrapper: {
    marginTop: 6,
    paddingHorizontal: 10,
  },
  SectionDescriptionMain: {
    fontSize: 12,
    fontWeight: 300,
    color: "#3F3F46",
  },
  HelpWrapper: {
    marginTop: 16,
    paddingLeft: 10,
  },
  HelpMain: {
    display: "flex",
    flexDirection: "row",
  },
});
export default SolutionDetailScreen;
