import { fetcher } from "@api/request";
import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import WebinarItem from "@components/Webinar/WebinarItem/WebinarItem";
import { LOCALES_MAP } from "@configs/map.config";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "@redux/store";
import { Webinar as WebinarType } from "@type/common/Webinar/Webinar.types";
import { WEBINAR } from "constants/url/url";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
interface WebinarProps {
  q: string;
  topicId: string | undefined;
}
const Webinar: React.FC<WebinarProps> = ({ q, topicId }) => {
  const lang = useSelector((state: RootState) => state.language.lang);
  const navigation = useNavigation();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { t } = useTranslation();
  const [webinarList, setWebinarList] = useState<WebinarType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false); // 是否刷新
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false); // 筛选国家

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
    if (!hasMore) {
      return (
        <Text style={{ textAlign: "center", paddingVertical: 15 }}>
          {t("common:no-more-data")}
        </Text>
      );
    }
    return null;
  };

  // 获得文档
  const getWebinarList = async () => {
    setLoading(true);
    try {
      let url = `${WEBINAR}?page=${page}&perPage=${pageSize}`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }
      if (topicId) {
        url += `&topicIds[]=${topicId}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "accept-language": LOCALES_MAP[lang],
          ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
        },
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        setWebinarList(items);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // 下拉刷新数据
  const onRefreshWebinarList = async () => {
    try {
      let url = `${WEBINAR}?page=${page}&perPage=${pageSize}`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }
      if (topicId) {
        url += `&topicIds[]=${topicId}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "accept-language": LOCALES_MAP[lang],
          ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
        },
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload.items;
        setWebinarList(items);
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  // 上拉加载数据
  const onEndReachedWebinarList = async () => {
    try {
      let url = `${WEBINAR}?page=${page}&perPage=${pageSize}`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }
      if (topicId) {
        url += `&topicIds[]=${topicId}`;
      }
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
        setWebinarList((preData) => {
          return [...preData, ...items];
        });
      }
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };
  useEffect(() => {
    if (page === 1 && hasMore) {
      getWebinarList();
    }
  }, [q, page, hasMore]);

  useEffect(() => {
    if (refreshing && page === 1) {
      onRefreshWebinarList();
    }
  }, [refreshing, page, hasMore]);
  useEffect(() => {
    if (page > 1 && loadingMore) {
      onEndReachedWebinarList();
    }
  }, [page, loadingMore]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : webinarList.length === 0 ? (
        <Empty />
      ) : (
        <FlatList
          data={webinarList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <WebinarItem webinar={item} />;
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
    </Fragment>
  );
};

const styles = StyleSheet.create({});
export default Webinar;
