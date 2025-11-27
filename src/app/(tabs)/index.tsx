import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetcher } from "@api/request";
import NewArticleItem from "@components/Article/NewArticleItem/NewArticleItem";
import CustomIcon from "@components/Common/CustomIcon/CustomIcon";
import Loading from "@components/Common/Loading/Loading";
import SectionHeader from "@components/Common/SectionHeader/SectionHeader";
import CourseItem from "@components/Course/CourseItem/CourseItem";
import DocumentItem from "@components/Document/DocumentItem/DocumentItem";
import {
  ACCESS_TOKEN_EXPIRE_STATUS_CODE,
  ARTICLE,
  COURSE,
  DOCUMENT,
  REGISTER_MEMBER,
  REGISTER_ORG,
  USER_PROFILE,
} from "@constants/url/url";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "@redux/store";
import { themes } from "@themes/themes";
import { Article } from "@type/common/Article/Article.types";
import { Course } from "@type/common/Course/Course.types";
import { Document } from "@type/common/Document/Document.types";
import { UserProfile } from "@type/common/User/User.types";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Search } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const IndexScreen = () => {
  // 获取屏幕宽度
  const navigation = useNavigation<any>();

  // 国际化相关
  const { t, i18n } = useTranslation();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  // const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [menuList, setMenuList] = useState([
    {
      icon: <CustomIcon name="customization-fill" color="#2F6EB5" size={30} />,
      text: t("index:menu:solution"),
      path: "/solution",
    },
    {
      icon: <CustomIcon name="company-fill" color="#5CA4A9" size={30} />,
      text: t("index:menu:counselor"),
      path: "/counselor",
    },
    {
      icon: <CustomIcon name="export-service" color="#F5B041" size={30} />,
      text: t("index:menu:post-requirement"),
      path: "/insight",
    },
    {
      icon: (
        <CustomIcon
          name="money-currency-converter-fill"
          color="#E63946"
          size={30}
        />
      ),
      text: t("index:menu:investment-opportunity"),
      path: "CustomerArea",
    },
    {
      icon: <CustomIcon name="product-list-fill" color="#4CAF50" size={30} />,
      text: t("index:menu:product"),
      path: "/insight",
    },
    {
      icon: <CustomIcon name="live-fill" color="#3DA5D9" size={30} />,
      text: t("index:menu:course"),
      path: "/insight",
    },
    {
      icon: <CustomIcon name="name-card-fill" color="#FF8C42" size={30} />,
      text: t("index:menu:article"),
      path: "/insight",
    },
    {
      icon: <CustomIcon name="customer-group-fill" color="#9A77FF" size={30} />,
      text: t("index:menu:webinar"),
      path: "/insight",
    },
  ]);
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [courseList, setCourseList] = useState<Course[]>([]);

  const [documentList, setDocumentList] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 获取用户信息
  const getUserProfile = async (): Promise<UserProfile | null> => {
    try {
      const response = await fetcher(`${USER_PROFILE}`);
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        navigation.navigate("Login");
        return null;
      }
      if (response.ok) {
        const json = await response.json();
        const payload = json.payload;
        return payload;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // 获取最新发布
  const getArticleList = async () => {
    try {
      const response = await fetcher(`${ARTICLE}?page=${1}&perPage=${4}`);
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        setArticleList([...items]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 获得文档
  const getDocumentList = async () => {
    try {
      const response = await fetcher(
        `${DOCUMENT}?page=${1}&perPage=${4}&isFree=true`
      );
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        setDocumentList(items);
      }
    } catch (error) {}
  };
  // 获取课程
  const getCourseList = async () => {
    try {
      const response = await fetcher(
        `${COURSE}?page=${1}&perPage=${5}&isFree=true`
      );
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        setCourseList([...items]);
      }
    } catch (error) {}
  };

  const getAllData = async () => {
    setLoading(true);
    await getArticleList();
    await getCourseList();
    await getDocumentList();
    setLoading(false);
  };
  useEffect(() => {
    getAllData();
    const unsubscribeFocus = navigation.addListener("focus", () => {
      getAllData();
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {});

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation, accessToken]);

  const handleMenuDetail = async (path: any) => {
    if (path === "") {
      return Alert.alert(t("common:module-development"));
    }
    if (path === "MemberArea") {
      try {
        const response = await fetcher(`${REGISTER_MEMBER}`);
        // token过期或未登录
        if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
          navigation.navigate("Login");
          return;
        }
        if (response.ok) {
          const json = await response.json();
          const items = json.payload.items;
          if (items.length > 0 && items[0].status === "pending") {
            return navigation.navigate("Review");
          }
          if (items.length > 0 && items[0].status === "approved") {
            return navigation.navigate(path);
          }
          return Linking.openURL(
            "https://www.leadvisor.net/en/advisors/join"
          ).catch((error) => console.log("An error occurred", error));
        }
      } catch (error) {}
    }
    if (path === "CustomerArea") {
      try {
        const response = await fetcher(`${REGISTER_ORG}`);
        // token过期或未登录
        if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
          return navigation.navigate("Login");
        }
        if (response.ok) {
          const json = await response.json();
          const items = json.payload.items;
          if (items.length > 0 && items[0].status === "pending") {
            return navigation.navigate("Review");
          }
          if (items.length > 0 && items[0].status === "approved") {
            return navigation.navigate(path);
          }
          return Linking.openURL(
            "https://www.leadvisor.net/en/advisors/service-requirement"
          ).catch((error) => console.log("An error occurred", error));
        }
      } catch (error) {}
    }
    router.push(path);
    // navigation.navigate(path);
  };

  return (
    <SafeAreaView
      style={{
        ...styles.Container,
        backgroundColor: themes.color.white,
      }}
      edges={["top"]}
    >
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar style="dark" />
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            {/* 头部搜索页 */}
            <Pressable
              onPress={() => router.push("/search")}
              style={styles.SearchWrapper}
            >
              <View style={styles.SearchMain}>
                <Search color={"#A1A1AA"} size={20} strokeWidth={0.8} />
                <Text style={styles.Slug}>{t("index:search")}</Text>
                <Text style={styles.Search}>{t("index:search")}</Text>
              </View>
            </Pressable>
            {/* 屏幕滚动 */}
            <View style={styles.ScrollWrapper}>
              <ScrollView
                style={styles.ScrollMain}
                showsVerticalScrollIndicator={false}
                overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
                bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
              >
                {/* 菜单 */}
                <View style={styles.MenuWrapper}>
                  <View style={styles.MenuMain}>
                    {menuList.map((item, index) => {
                      return (
                        <Pressable
                          onPress={() => handleMenuDetail(item.path)}
                          style={styles.MenuItemWrapper}
                          key={index}
                        >
                          <View style={styles.MenuItemMain}>
                            {item.icon}
                            <Text style={styles.Desc}>{item.text}</Text>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
                {/* 文章 */}
                <SectionHeader
                  hasBar={false}
                  hasMore={true}
                  title={t("index:latest-release")}
                  path="/insight"
                  paddingHorizontal={15}
                  marginTop={10}
                />
                <View style={styles.NewPublishWrapper}>
                  <ScrollView
                    horizontal
                    style={styles.NewPublishMain}
                    showsHorizontalScrollIndicator={false}
                    overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
                    bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
                  >
                    {/* item项 */}
                    {articleList.map((item) => {
                      return <NewArticleItem key={item.id} article={item} />;
                    })}
                  </ScrollView>
                </View>

                {/* 课程 */}
                <SectionHeader
                  hasBar={false}
                  hasMore={true}
                  title={t("index:course")}
                  path="/course"
                  paddingHorizontal={15}
                  marginTop={25}
                />
                <View style={styles.CourseWrapper}>
                  <View style={styles.CourseMain}>
                    {courseList.map((item) => {
                      return <CourseItem course={item} key={item.id} />;
                    })}
                  </View>
                </View>

                {/* 产品 */}
                <SectionHeader
                  hasBar={false}
                  hasMore={true}
                  title={t("index:product")}
                  path="/document"
                  paddingHorizontal={15}
                  marginTop={25}
                />
                <View style={styles.DocumentWrapper}>
                  <View style={styles.DocumentMain}>
                    {documentList.map((item) => {
                      return <DocumentItem key={item.id} document={item} />;
                    })}
                  </View>
                </View>
              </ScrollView>
            </View>
          </Fragment>
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
  },
  // 头部搜索
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
    marginLeft: 10,
    color: "#A1A1AA",
    flex: 1,
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
  // 内容区域
  ScrollWrapper: {
    flex: 1,
  },
  ScrollMain: {
    flex: 1,
  },
  // 菜单
  MenuWrapper: {
    marginTop: 20,
  },
  MenuMain: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  MenuItemWrapper: {
    width: "25%",
    marginBottom: 20,
  },
  MenuItemMain: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  Icon: {},
  Desc: {
    fontSize: 12,
    fontWeight: 400,
    color: "#52525B",
    marginTop: 10,
    textAlign: "center",
  },
  // 最新发布
  NewPublishWrapper: {
    paddingLeft: 16,
    marginTop: 15,
  },
  NewPublishMain: {},

  // 课程
  CourseWrapper: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  CourseMain: {},
  // 文档
  DocumentWrapper: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  DocumentMain: {
    display: "flex",
    flexDirection: "column",
  },
  // 顾问
  AdvisorWrapper: {
    marginTop: 10,
    paddingHorizontal: 6,
  },
  AdvisorMain: {},
});
export default IndexScreen;
