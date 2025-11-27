import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "@redux/store";

import { AdvisorDetail } from "@type/common/Advisor/Advisor.types";

import { fetcher } from "@api/request";
import Article from "@components/AdvisorDetail/Article/Article";
import Course from "@components/AdvisorDetail/Course/Course";
import Description from "@components/AdvisorDetail/Description/Description";
import Document from "@components/AdvisorDetail/Document/Document";
import Filter from "@components/AdvisorDetail/Filter/Filter";
import Webinar from "@components/AdvisorDetail/Webinar/Webinar";
import { MEMBER_PROFILE } from "@constants/url/url";
import { formatIsoTime } from "@utils/time/time";
import * as MailComposer from "expo-mail-composer";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
const AdvisorDetailScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const lang = useSelector((state: RootState) => state.language.lang);
  const { t } = useTranslation();
  const navigation = useNavigation();
  // 默认激活第一个
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [advisorData, setAdvisorData] = useState<AdvisorDetail | null>(null);
  const [categoryList, setCategoryList] = useState<
    {
      id: string;
      name: string;
    }[]
  >([
    {
      id: "0",
      name: t("search-detail:description"),
    },
    {
      id: "1",
      name: t("search-detail:product"),
    },
    {
      id: "2",
      name: t("search-detail:course"),
    },
    {
      id: "3",
      name: t("search-detail:article"),
    },
    {
      id: "4",
      name: t("search-detail:webinar"),
    },
    // {
    //   id: "4",
    //   name: t("search-detail:advisor"),
    // },
  ]);

  const handleBack = () => {
    router.back();
  };
  // 获得文档
  const getAdvisorData = async () => {
    setLoading(true);
    try {
      let url = `${MEMBER_PROFILE}/${slug}`;
      const response = await fetcher(url, {
        method: "GET",
      });
      if (response.ok) {
        const json = await response.json();
        const payload = json.payload;
        setAdvisorData(payload);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  // 发送邮件
  const sendEmail = async () => {
    if (advisorData && advisorData.email) {
      try {
        const isAvailable = await MailComposer.isAvailableAsync();
        if (!isAvailable) {
          alert("邮件功能不可用");
          return;
        }
        await MailComposer.composeAsync({
          recipients: [advisorData.email], // 收件人
          subject: "", // 主题
          body: "", // 邮件正文
          isHtml: false, // 是否使用 HTML 格式
        });
      } catch (error) {}
    }
  };

  useEffect(() => {
    getAdvisorData();
  }, []);
  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="light" />
        {/* 返回和操作 */}
        <View style={styles.NavigateAction}>
          <Pressable onPress={() => handleBack()} style={styles.Navigate}>
            <ChevronLeft color={"#71717A"} size={20} />
            <Text style={{ fontSize: 14, fontWeight: 400, color: "#27272A" }}>
              {t("advisor:advisors")}
            </Text>
          </Pressable>
          <Text style={styles.Action}>{t("common:save")}</Text>
        </View>
        {loading ? (
          <Loading />
        ) : advisorData ? (
          <Fragment>
            {/* 头部 */}
            <View style={styles.Header}>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text
                  style={{ color: "#000000", fontSize: 20, fontWeight: 400 }}
                >
                  {advisorData.name}
                </Text>
                <View style={{ flex: 1 }}></View>
                {/* <View
                  style={{
                    marginTop: 6,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    paddingVertical: 6,
                    backgroundColor: "#E6E5FA",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 10,
                  }}
                >
                  <Text style={{ color: "#4A4791", fontSize: 12 }}>
                    {t("advisor:send-an-inquiry")}
                  </Text>
                  <ArrowRight color="#4A4791" size={20} strokeWidth={0.3} />
                </View> */}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 91,
                    height: 91,
                    objectFit: "contain",
                  }}
                  src={advisorData.logoUrl || ""}
                />

                <Text style={{ color: "#A1A1AA", fontSize: 12 }}>
                  {t("advisor:join-in")}
                  {formatIsoTime(advisorData.createdAt)}
                </Text>
              </View>
            </View>
            {/* 筛选 */}
            <Filter
              categoryList={categoryList}
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
            />
            {/* 内容区域 */}
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <View style={{ flex: 1, paddingBottom: 10 }}>
                {tabIndex === 0 ? (
                  <Description description={advisorData.description} />
                ) : null}
                {tabIndex === 1 ? (
                  <Document memberProfileId={advisorData.id} />
                ) : null}
                {tabIndex === 2 ? (
                  <Course memberProfileId={advisorData.id} />
                ) : null}
                {tabIndex === 3 ? (
                  <Article memberProfileId={advisorData.id} />
                ) : null}
                {tabIndex === 4 ? (
                  <Webinar memberProfileId={advisorData.id} />
                ) : null}
              </View>
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
  // 头部
  Header: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 10,
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
  ScrollWrapper: {},
  ScrollMain: {},
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

export default AdvisorDetailScreen;
