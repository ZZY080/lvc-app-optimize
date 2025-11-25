import Loading from "@components/Common/Loading/Loading";
import { LOCALES_MAP } from "@configs/map.config";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "@redux/store";
import { ScreenProps } from "@type/Navigation/ScreenType";
import { SHORT_VIDEO } from "constants/url/url";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import VideoItem from "../VideoItem/VideoItem";
import Empty from "@components/Common/Empty/Empty";
interface VideoItemProps {
  navigation: ScreenProps["navigation"];
  accessToken: string | null;
}
const VideoList: React.FC<VideoItemProps> = ({ navigation, accessToken }) => {
  const lang = useSelector((state: RootState) => state.language.lang);

  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1); // 页码
  const [pageSize, setPageSize] = useState<number>(10); // 每页数据条数
  const [loading, setLoading] = useState<boolean>(true); // 加载状态
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true); // 是否还有更多数据
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [videoList, setVideoList] = useState<
    {
      id: string;
      title: string;
      previewImageUrl: string;
      videoUrl: string;
      videoHLSUrl: string;
    }[]
  >([]);

  // 下拉刷新加载最新数据
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
  // 获取短视频
  const getVideoList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SHORT_VIDEO}?page=${page}&perPage=${pageSize}`,
        {
          method: "GET",
          headers: {
            "accept-language": LOCALES_MAP[lang],
            ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        const Items = json.payload.items;
        const formattedItems = Items.map((item: any) => {
          return {
            id: item.id,
            previewImageUrl: item.previewImageUrl,
            title: item.title,
            videoUrl: item.videoUrl,
            videoHLSUrl: item.videoHLSUrl,
          };
        });

        setVideoList(formattedItems);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
  // 下拉刷新数据
  const onRefreshVideoList = async () => {
    try {
      const response = await fetch(
        `${SHORT_VIDEO}?page=${page}&perPage=${pageSize}`,
        {
          method: "GET",
          headers: {
            "accept-language": LOCALES_MAP[lang],
            ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        const Items = json.payload.items;
        const formattedItems = Items.map((item: any) => {
          return {
            id: item.id,
            previewImageUrl: item.previewImageUrl,
            title: item.title,
            videoUrl: item.videoUrl,
            videoHLSUrl: item.videoHLSUrl,
          };
        });

        setVideoList([...formattedItems]);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setRefreshing(false);
    }
  };
  // 上拉加载数据
  const onEndReachedVideoList = async () => {
    try {
      const response = await fetch(
        `${SHORT_VIDEO}?page=${page}&perPage=${pageSize}`,
        {
          method: "GET",
          headers: {
            "accept-language": LOCALES_MAP[lang],
            ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        const Items = json.payload.items;
        const formattedItems = Items.map((item: any) => {
          return {
            id: item.id,
            previewImageUrl: item.previewImageUrl,
            title: item.title,
            videoUrl: item.videoUrl,
            videoHLSUrl: item.videoHLSUrl,
          };
        });
        // 如果数据不足,说明没有更多数据了
        if (formattedItems.length < pageSize) {
          setHasMore(false);
        }
        setVideoList((preData) => {
          return [...preData, ...formattedItems];
        });
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoadingMore(false);
    }
  };
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      setPage(1);
      setHasMore(true);
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation, accessToken]);
  useEffect(() => {
    if (page === 1 && hasMore) {
      getVideoList();
    }
  }, [page, hasMore]);
  useEffect(() => {
    if (refreshing && page === 1) {
      onRefreshVideoList();
    }
  }, [refreshing, page, hasMore]);
  useEffect(() => {
    if (page > 1 && loadingMore) {
      onEndReachedVideoList();
    }
  }, [page, loadingMore]);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loading />
      ) : videoList.length === 0 ? (
        <Empty />
      ) : (
        <FlatList
          data={videoList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <VideoItem key={item.id} {...item} />;
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#6562A9"]}
              progressBackgroundColor="#ffffff" // 背景色
            />
          }
          onEndReached={onEndReached} // 触发上拉加载
          onEndReachedThreshold={0.1} // 距离底部10%触发加载
          ListFooterComponent={renderFooter} // 底部加载组件
          showsVerticalScrollIndicator={false}
          overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
          bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default VideoList;
