import { fetcher } from "@api/request";
import ArticleItem from "@components/Article/ArticleItem/ArticleItem";
import NewArticleItem from "@components/Article/NewArticleItem/NewArticleItem";
import Loading from "@components/Common/Loading/Loading";
import InsightWebinarItem from "@components/Webinar/InsightWebinarItem/InsightWebinarItem";
import { ARTICLE, WEBINAR } from "@constants/url/url";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "@redux/store";
import { Article } from "@type/common/Article/Article.types";
import { InsightWebinar } from "@type/common/Webinar/Webinar.types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const Featured = () => {
  const { t } = useTranslation();
  const [releaseList, setReleaseList] = useState<Article[]>([]);
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [webinarList, setWebinarList] = useState<InsightWebinar[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const navigation = useNavigation<any>();
  // 获取最新发布
  const getReleaseList = async () => {
    try {
      const response = await fetcher(`${ARTICLE}?page=${1}&perPage=${4}`, {
        method: "GET",
      });
      if (response.ok) {
        const json = await response.json();
        const items = json.payload.items;
        setReleaseList([...items]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 获取文章
  const getArtcleList = async () => {
    try {
      const response = await fetcher(`${ARTICLE}?page=${2}&perPage=${5}`, {
        method: "GET",
      });
      if (response.ok) {
        const json = await response.json();
        const items = json.payload.items;
        setArticleList([...items]);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  // 获取webinar
  const getWebinarList = async () => {
    try {
      const response = await fetcher(`${WEBINAR}?page=${1}&perPage=${5}`, {
        method: "GET",
      });
      if (response.ok) {
        const json = await response.json();
        const items = json.payload.items;
        setWebinarList([...items]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllList = async () => {
    setIsLoading(true);
    try {
      await Promise.all([getReleaseList(), getArtcleList(), getWebinarList()]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllList();
  }, []);
  return (
    <View style={styles.FeaturedWrapper}>
      <View style={styles.FeaturedMain}>
        {isLoading ? (
          <Loading />
        ) : (
          <View style={styles.ScrollWrapper}>
            <ScrollView
              style={styles.ScrollMain}
              showsVerticalScrollIndicator={false}
              overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
              bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
            >
              <View style={styles.NewPulishWrapper}>
                <ScrollView
                  style={styles.NewPublishMain}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
                  bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
                >
                  {releaseList.map((item) => {
                    return <NewArticleItem key={item.id} article={item} />;
                  })}
                </ScrollView>
              </View>
              <View style={styles.ArticleWrapper}>
                <View style={styles.ArticleMain}>
                  {articleList.map((item) => {
                    return <ArticleItem article={item} key={item.id} />;
                  })}
                </View>
              </View>
              <View style={styles.WebinarWrapper}>
                <View style={styles.WebinarMain}>
                  {webinarList.map((item, index) => {
                    return (
                      <InsightWebinarItem
                        key={item.id}
                        index={index}
                        {...item}
                      />
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FeaturedWrapper: {
    flex: 1,
  },
  FeaturedMain: {
    flex: 1,
  },
  // 滚动内容
  ScrollWrapper: {
    flex: 1,
  },
  ScrollMain: {
    flex: 1,
  },
  // 最新发布内容
  NewPulishWrapper: {
    paddingLeft: 6,
    marginTop: 0,
  },
  NewPublishMain: {},
  // 文章
  ArticleWrapper: {
    marginTop: 15,
    paddingHorizontal: 6,
  },
  ArticleMain: {},
  // 网络研讨会
  WebinarWrapper: {
    marginTop: 15,
    paddingHorizontal: 6,
  },
  WebinarMain: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Featured;
