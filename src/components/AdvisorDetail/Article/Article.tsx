import { fetcher } from "@api/request";
import ArticleItem from "@components/Article/ArticleItem/ArticleItem";
import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import { LOCALES_MAP } from "@configs/map.config";
import { RootState } from "@redux/store";
import { ARTICLE } from "constants/url/url";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
interface ArticleProps {
  memberProfileId: string;
}
const Article: React.FC<ArticleProps> = ({ memberProfileId }) => {
  const { t } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // 每页数据条数
  const [loading, setLoading] = useState<boolean>(true); // 加载状态
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false); // 是否刷新
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [articleList, setArticleList] = useState<
    {
      id: string;
      description: string;
      slug: string;
      previewImageUrl: string;
      title: string;
      author: string;
      publishedAt: string;
    }[]
  >([]);
  const [categoryList, setCategoryList] = useState<
    { id: string; slug: string; name: string; description: string | null }[]
  >([]);
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
    // if (!hasMore) {
    //   return (
    //     <Text style={{ textAlign: "center", paddingVertical: 15 }}>
    //       {t("common:no-more-data")}
    //     </Text>
    //   );
    // }
    return null;
  };
  // 首次和搜索获取数据
  const getArtcleList = async () => {
    setLoading(true);
    try {
      let url = `${ARTICLE}?page=${page}&perPage=${pageSize}`;
      if (memberProfileId) {
        url += `&memberProfileIds[]=${memberProfileId}`;
      }
      const response = await fetcher(url, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        setArticleList(items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 下拉刷新数据
  const onRefreshArtcleList = async () => {
    try {
      let url = `${ARTICLE}?page=${page}&perPage=${pageSize}`;
      if (memberProfileId) {
        url += `&memberProfileIds[]=${memberProfileId}`;
      }
      const response = await fetcher(url, {
        method: "GET",
      });
      if (response.ok) {
        const json = await response.json();
        const items = json.payload.items;
        setArticleList(items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  // 上拉加载数据
  const onEndReachedArtcleList = async () => {
    try {
      let url = `${ARTICLE}?page=${page}&perPage=${pageSize}`;
      if (memberProfileId) {
        url += `&memberProfileIds[]=${memberProfileId}`;
      }
      const response = await fetcher(url, {
        method: "GET",
      });
      if (response.ok) {
        const json = await response.json();
        const items = json.payload.items;
        // 若果数据不足,说明没有更多数据了
        if (items.length < pageSize) {
          setHasMore(false);
        }
        setArticleList((preData) => {
          return [...preData, ...items];
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  };

  // 筛选
  useEffect(() => {
    if (page === 1 && hasMore) {
      getArtcleList();
    }
  }, [page, hasMore]);
  // 下拉刷新
  useEffect(() => {
    if (refreshing && page === 1) {
      onRefreshArtcleList();
    }
  }, [refreshing, page, hasMore]);
  useEffect(() => {
    if (page > 1 && loadingMore) {
      onEndReachedArtcleList();
    }
  }, [loadingMore, page]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : articleList.length === 0 ? (
        <Empty />
      ) : (
        <FlatList
          initialNumToRender={10}
          windowSize={10}
          numColumns={1}
          data={articleList}
          refreshing={refreshing}
          keyExtractor={(item, index) => `${index}`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#409EFF"]}
              progressBackgroundColor="#ffffff" // 背景色
            />
          }
          renderItem={({ item }) => {
            return <ArticleItem article={item} />;
          }}
          onEndReached={onEndReached} //触底时触发
          onEndReachedThreshold={0.1} // 触发时机为到达底部10%时
          ListFooterComponent={renderFooter} // 底部加载组件
          showsVerticalScrollIndicator={false}
          overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
          bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({});
export default Article;
