import { fetcher } from "@api/request";
import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import VideoPlay from "@components/WebinarDetail/VideoPlay/VideoPlay";
import { RootState } from "@redux/store";
import { WebinarDetail } from "@type/common/Webinar/Webinar.types";

import { WEBINAR } from "@constants/url/url";
import { formatIsoTime } from "@utils/time/time";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const WebinarDetailScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const lang = useSelector((state: RootState) => state.language.lang);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [webinarData, setWebinarData] = useState<WebinarDetail | null>(null);
  // 初始化视频播放器
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // 视频地址
  const getWebinarData = async () => {
    setLoading(true);
    try {
      const response = await fetcher(`${WEBINAR}/${slug}`, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        const payload = json.payload;
        setWebinarData(payload);
        setVideoUrl(payload.videoHLSUrl);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleBack = () => {
    router.back();
  };
  const shareArticle = async () => {
    // try {
    //   await Share.share(
    //     {
    //       title: "标题",
    //       message: `${ARTICLE_WEBVIEW_URL}/${LOCALES_MAP[lang]}/m/insights/articles/${slug}`,
    //       url: `${ARTICLE_WEBVIEW_URL}/${LOCALES_MAP[lang]}/m/insights/articles/${slug}`, // iOS 需要单独提供 URL
    //     },
    //     {
    //       dialogTitle: "123",
    //     }
    //   );
    // } catch (error) {
    //   // console.log("分享失败:", error.message);
    // }
  };
  useEffect(() => {
    getWebinarData();
  }, []);

  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      <View style={styles.Content}>
        {/* 视频播放区域 */}
        {loading ? (
          <Loading />
        ) : webinarData ? (
          <Fragment>
            {/* 顶部状态栏 */}
            <StatusBar translucent={true} />
            {/* 返回 */}
            <View style={styles.NavigateAction}>
              <Pressable onPress={() => handleBack()} style={styles.Navigate}>
                <ChevronLeft color={"#27272A"} size={20} />
                <Text style={{ fontSize: 14, fontWeight: 400 }}>
                  {t("insight:insight")}
                </Text>
              </Pressable>
              {/* <Text style={styles.Action} onPress={() => shareArticle()}>
                {t("insight:share")}
              </Text> */}
            </View>
            {/* 视频播放 */}
            {videoUrl && <VideoPlay videoUrl={videoUrl} />}

            <Text style={styles.Title}>{webinarData.title}</Text>
            <View
              style={{
                paddingHorizontal: 10,
                marginTop: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: 300, marginRight: 10 }}>
                {formatIsoTime(webinarData.scheduledAt || "")}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  columnGap: 10,
                  rowGap: 10,
                }}
              >
                {webinarData.memberProfiles.map((item, index) => {
                  return (
                    <Text
                      key={item.id}
                      style={{
                        backgroundColor: "#6562A933",
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 8,
                        color: "#6562A9",
                        fontSize: 10,
                        fontWeight: 300,
                      }}
                    >
                      {item.name}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View style={styles.Divide}></View>
            {/* 屏幕滚动 */}
            <View style={styles.ScrollWrapper}>
              <ScrollView
                style={styles.ScrollMain}
                showsVerticalScrollIndicator={false}
                overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
                bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
              >
                <Text style={{ ...styles.CommonHeader, marginTop: 10 }}>
                  {t("webinar:scheduled-on")}
                </Text>
                <Text style={styles.Time}>
                  {formatIsoTime(webinarData.scheduledAt || "")}
                </Text>
                <Text style={{ ...styles.CommonHeader, marginTop: 20 }}>
                  {t("webinar:webinar-description")}
                </Text>
                <Text style={styles.Desc}>{webinarData?.description}</Text>

                <Text style={{ ...styles.CommonHeader, marginTop: 20 }}>
                  {t("webinar:tags")}
                </Text>
                <View style={styles.TagWrapper}>
                  <View style={styles.TagMain}>
                    {webinarData.countries.map((item) => {
                      return (
                        <Text
                          style={{
                            backgroundColor: "#E6E5FA",
                            paddingHorizontal: 12,
                            paddingVertical: 4,
                            color: "#6562A9",
                            marginRight: 10,
                            marginBottom: 10,
                            fontSize: 10,
                            fontWeight: 300,
                            borderRadius: 10,
                          }}
                          key={item.code}
                        >
                          {item.name}
                        </Text>
                      );
                    })}
                    {webinarData.topics.map((item) => {
                      return (
                        <Text
                          style={{
                            backgroundColor: "#E6E5FA",
                            paddingHorizontal: 12,
                            paddingVertical: 4,
                            color: "#6562A9",
                            marginRight: 10,
                            marginBottom: 10,
                            fontSize: 10,
                            fontWeight: 300,
                            borderRadius: 10,
                          }}
                          key={item.id}
                        >
                          {item.title}
                        </Text>
                      );
                    })}
                    {webinarData.serviceCategories.map((item) => {
                      return (
                        <Text
                          style={{
                            backgroundColor: "#E6E5FA",
                            paddingHorizontal: 12,
                            paddingVertical: 4,
                            color: "#6562A9",
                            marginRight: 10,
                            marginBottom: 10,
                            fontSize: 10,
                            fontWeight: 300,
                            borderRadius: 10,
                          }}
                          key={item.id}
                        >
                          {item.name}
                        </Text>
                      );
                    })}
                  </View>
                </View>
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
    backgroundColor: "#FFFFFF",
  },
  Content: {
    flex: 1,
    paddingBottom: 40,
  },
  NavigateAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 40,
  },
  Navigate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  Action: {
    fontSize: 14,
    color: "#006FEE",
  },
  // 内容区域
  ScrollWrapper: {
    flex: 1,
  },
  ScrollMain: {
    flex: 1,
  },
  CommonHeader: {
    fontSize: 14,
    fontWeight: 400,
    color: "#3F3F46",
    paddingHorizontal: 10,
  },
  // 标题
  Title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 400,
    paddingHorizontal: 10,
    color: "#3F3F46",
  },
  Divide: {
    marginTop: 20,
    height: 1,
    backgroundColor: "#E4E4E7",
  },
  Time: {
    marginTop: 10,
    paddingHorizontal: 10,
    color: "#A1A1AA",
    fontSize: 14,
    fontWeight: 400,
  },
  Desc: {
    marginTop: 10,
    paddingHorizontal: 10,
    fontWeight: 400,
    fontSize: 14,
    color: "#A1A1AA",
  },
  ServiceWrapper: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  ServiceMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: 10,
    rowGap: 10,
  },
  ServiceWord: {
    fontSize: 10,
    borderWidth: 1,
    borderColor: "#6d73b7",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: "#6d73b7",
  },

  MemberProfileWrapper: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  MemberProfileMain: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    rowGap: 10,
  },
  LogoText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    borderWidth: 1,
    borderColor: "#6d73b7",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: "#6d73b7",
  },
  TagWrapper: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  TagMain: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default WebinarDetailScreen;
