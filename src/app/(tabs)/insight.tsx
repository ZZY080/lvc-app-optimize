import { fetcher } from "@api/request";
import Loading from "@components/Common/Loading/Loading";
import Article from "@components/Insight/Article/Article";
import Featured from "@components/Insight/Featured/Featured";
import Filter from "@components/Insight/Filter/Filter";
import InvestmentOpportunity from "@components/Insight/InvestmentOpportunity/InvestmentOpportunity";
import Webinar from "@components/Insight/Webinar/Webinar";
import { RootState } from "@redux/store";

import { USER_PROFILE } from "@constants/url/url";
import { useNavigation } from "@react-navigation/native";
import { themes } from "@themes/themes";
import { UserProfile } from "@type/common/User/User.types";
import { StatusBar } from "expo-status-bar";
import { Search } from "lucide-react-native";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const Insightcreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [categoryList, setCategoryList] = useState<
    {
      id: string;
      name: string;
    }[]
  >([
    {
      id: "0",
      name: t("insight:featured"),
    },
    {
      id: "1",
      name: t("insight:articles"),
    },
    {
      id: "2",
      name: t("insight:webinars"),
    },
    {
      id: "2",
      name: t("insight:investment-opportunity"),
    },
  ]);
  // 默认激活第一个
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // 跳转到搜索
  const handleSearch = () => {
    navigation.navigate("Search");
  };
  // 获取用户信息
  const getUserProfile = async () => {
    setLoading(true);
    try {
      const response = await fetcher(`${USER_PROFILE}`);
      if (response.ok) {
        const json = await response.json();
        const payload = json.payload;
        setUserProfile(payload);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      getUserProfile();
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {});

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation, accessToken]);

  return (
    <SafeAreaView
      style={{
        ...styles.Container,
      }}
      edges={["top"]}
    >
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} />
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            {/* 搜索 */}
            <Pressable
              onPress={() => handleSearch()}
              style={styles.SearchWrapper}
            >
              <View style={styles.SearchMain}>
                <Search color={"#A1A1AA"} size={20} strokeWidth={0.8} />
                <Text style={styles.Slug}>{t("insight:insight")}</Text>
                <Text style={styles.Search}>{t("search:search")}</Text>
              </View>
            </Pressable>
            {/* 筛选 */}
            <Filter
              categoryList={categoryList}
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
              userProfile={userProfile}
            />
            {/* 内容 */}
            {tabIndex === 0 ? <Featured /> : null}
            {tabIndex === 1 ? <Article /> : null}
            {tabIndex === 2 ? <Webinar /> : null}
            {tabIndex === 3 ? <InvestmentOpportunity /> : null}
          </Fragment>
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
    flexGrow: 1,
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
});
export default Insightcreen;
