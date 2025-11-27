import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import { LOCALES_MAP } from "@configs/map.config";
import { ARTICLE, ARTICLE_WEBVIEW_URL } from "@constants/url/url";
import { RootState } from "@redux/store";
import { ArticleDetail } from "@type/common/Article/Article.types";
import { formatIsoTime } from "@utils/time/time";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { fetcher } from "@api/request";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, Share, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";
const ArticleDetailScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const lang = useSelector((state: RootState) => state.language.lang);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [articleDetailData, setArticleDetailData] =
    useState<ArticleDetail | null>(null);
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [webViewHeight, setWebViewHeight] = useState(0);
  const getArticleDetailData = async () => {
    setLoading(true);
    try {
      const response = await fetcher(`${ARTICLE}/${slug}`, {
        method: "GET",
      });
      if (response.ok) {
        const json = await response.json();
        setArticleDetailData(json.payload);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleBack = () => {
    router.back();
  };
  const shareArticle = async () => {
    try {
      await Share.share(
        {
          title: "标题",
          message: `${ARTICLE_WEBVIEW_URL}/${LOCALES_MAP[lang]}/m/insights/articles/${slug}`,
          url: `${ARTICLE_WEBVIEW_URL}/${LOCALES_MAP[lang]}/m/insights/articles/${slug}`, // iOS 需要单独提供 URL
        },
        {
          dialogTitle: "123",
        }
      );
    } catch (error) {
      // console.log("分享失败:", error.message);
    }
  };
  useEffect(() => {
    getArticleDetailData();
  }, []);

  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
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
        <Text style={styles.Action} onPress={() => shareArticle()}>
          {t("insight:share")}
        </Text>
      </View>
      {loading ? (
        <Loading />
      ) : articleDetailData ? (
        <Fragment>
          {/* 封面 */}
          <View style={styles.Cover}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                // borderRadius: 10,
              }}
              src={articleDetailData?.previewImageUrl}
            />
          </View>
          {/* 标题 */}
          <Text style={styles.Title}>{articleDetailData.title}</Text>
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
              {formatIsoTime(articleDetailData.publishedAt || "")}
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
              {articleDetailData.memberProfiles.map((item, index) => {
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
          {/* WebView */}
          <View
            style={{
              ...styles.Content,
              width: "100%",
              flex: 1,
              paddingHorizontal: 10,
              marginTop: 10,
              position: "relative",
            }}
          >
            <WebView
              source={{
                uri: `${ARTICLE_WEBVIEW_URL}/${LOCALES_MAP[lang]}/m/insights/articles/${slug}`,
              }}
              originWhitelist={["*"]}
              startInLoadingState={true}
              // renderLoading={() => <Loading />}
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
              bounces={false}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </View>
        </Fragment>
      ) : (
        <Empty />
      )}
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
    display: "flex",
    flexDirection: "column",
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
  // 封面
  Cover: {
    position: "relative",
    width: "100%",
    height: 186,
    overflow: "hidden",
  },

  // 标题
  Title: {
    marginTop: 20,
    paddingHorizontal: 10,
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: 400,
    color: "#000000",
  },
  Divide: {
    marginTop: 30,
    height: 1,
    backgroundColor: "#E4E4E7",
  },
  Desc: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 17,
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 500,
    color: "#999999",
  },
});
export default ArticleDetailScreen;
