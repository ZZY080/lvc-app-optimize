import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import { ServiceOpportunity as ServiceOpportunityType } from "@type/common/Opportunity/Opportunity.types";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ACCESS_TOKEN_EXPIRE_STATUS_CODE,
  MEMBER_ACCESS_FORBIDDEN_CODE,
  SERVICE_OPP,
} from "constants/url/url";
import { useTranslation } from "react-i18next";
import { fetcher } from "@api/request";
import { useNavigation } from "@react-navigation/native";
import ServiceOpportunityItem from "@components/MemberArea/ServiceOpportunityItem/ServiceOpportunityItem";
interface ServiceOpportunityProps {
  q: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}
const ServiceOpportunity: React.FC<ServiceOpportunityProps> = ({
  q,
  page,
  setPage,
  hasMore,
  setHasMore,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [pageSize, setPageSize] = useState<number>(10); // 每页数据条数
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [serviceOpportunityList, setServiceOpportunityList] = useState<
    ServiceOpportunityType[]
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
  // 获得机会
  const getServiceOpportunityList = async () => {
    setLoading(true);
    try {
      let url = `${SERVICE_OPP}?page=${page}&perPage=${pageSize}`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }

      const response = await fetcher(url, {
        method: "GET",
      });
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return navigation.replace("Login");
      }
      if (response.status === MEMBER_ACCESS_FORBIDDEN_CODE) {
        return navigation.navigate("RegisterMember");
      }
      if (response.ok) {
        const json = await response.json();
        const items = json.payload.items;
        setServiceOpportunityList(items);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  // 下拉刷新数据
  const onRefreshServiceOpportunityList = async () => {
    try {
      let url = `${SERVICE_OPP}?page=${page}&perPage=${pageSize}`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }

      const response = await fetcher(url, {
        method: "GET",
      });
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return navigation.replace("Login");
      }
      if (response.status === MEMBER_ACCESS_FORBIDDEN_CODE) {
        return navigation.navigate("RegisterMember");
      }
      if (response.ok) {
        const json = await response.json();
        const items = json.payload.items;
        setServiceOpportunityList(items);
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  // 上拉加载数据
  const onEndReachedServiceOpportunityList = async () => {
    try {
      let url = `${SERVICE_OPP}?page=${page}&perPage=${pageSize}`;
      if (q.trim().length > 0) {
        url += `&q=${q}`;
      }

      const response = await fetcher(url, {
        method: "GET",
      });
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return navigation.replace("Login");
      }
      if (response.status === MEMBER_ACCESS_FORBIDDEN_CODE) {
        return navigation.navigate("RegisterMember");
      }
      if (response.ok) {
        const json = await response.json();
        const items = json.payload.items;
        // 如果数据不足,说明没有更多数据了
        if (items.length < pageSize) {
          setHasMore(false);
        }
        setServiceOpportunityList((preData) => {
          return [...preData, ...items];
        });
      }
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };
  // 首次加载数据
  useEffect(() => {
    if (page === 1 && hasMore) {
      getServiceOpportunityList();
    }
  }, [q, page, hasMore]);
  // 下拉刷新
  useEffect(() => {
    if (refreshing && page === 1) {
      onRefreshServiceOpportunityList();
    }
  }, [refreshing, page, hasMore]);
  // 上拉加载
  useEffect(() => {
    if (page > 1 && loadingMore) {
      onEndReachedServiceOpportunityList();
    }
  }, [loadingMore, page]);
  return (
    <View style={styles.ServiceOpportunityWrapper}>
      <View style={styles.ServiceOpportunityMain}>
        {loading ? (
          <Loading />
        ) : serviceOpportunityList.length === 0 ? (
          <Empty />
        ) : (
          <FlatList
            data={serviceOpportunityList}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => {
              return <ServiceOpportunityItem serviceOpportunity={item} />;
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
    </View>
  );
};

const styles = StyleSheet.create({
  ServiceOpportunityWrapper: {
    flex: 1,
  },
  ServiceOpportunityMain: {
    flex: 1,
  },
});

export default ServiceOpportunity;
