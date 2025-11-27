import { fetcher } from "@api/request";
import Loading from "@components/Common/Loading/Loading";
import DocumentItem from "@components/DocumentDetail/DocumentItem/DocumentItem";
import PublishItem from "@components/DocumentDetail/PublishItem/PublishItem";
import {
  ACCESS_TOKEN_EXPIRE_STATUS_CODE,
  DOCUMENT,
  DOCUMENT_INSTANCE,
  PAYMENT_ZERO,
} from "@constants/url/url";
import { RootState } from "@redux/store";
import {
  DocumentDetail,
  DocumentInstance,
} from "@type/common/Document/Document.types";

import dayjs from "dayjs";
import reactiveTime from "dayjs/plugin/relativeTime";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CalendarDays, ChevronLeft, FileText } from "lucide-react-native";
import { Fragment, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
// import { useStripe } from "@stripe/stripe-react-native";

const DocumentDetailScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { t } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);

  dayjs.extend(reactiveTime);
  dayjs.locale(lang === "cn" ? "zh-cn" : "en");
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [loading, setLoading] = useState<boolean>(false);
  const [documentDetailData, setDocumentDetailData] =
    useState<DocumentDetail | null>(null);
  const [documentInstanceData, setDocumentInstanceData] =
    useState<DocumentInstance | null>(null);
  // 获取文档
  const getDocumentDetailList = async () => {
    try {
      const response = await fetcher(`${DOCUMENT}/${slug}`, {
        method: "GET",
      });
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return router.push("/auth/login");
      }
      if (response.ok) {
        const json = await response.json();
        const payload = json.payload;

        if (payload.instance) {
          await getDocumentInstanceData(payload.instance.id);
        }

        setDocumentDetailData({ ...payload });
      }
    } catch (error) {}
  };
  // 获取支付后的实例
  const getDocumentInstanceData = async (instanceId: string) => {
    try {
      const response = await fetcher(`${DOCUMENT_INSTANCE}/${instanceId}`, {
        method: "GET",
      });
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return router.push("/auth/login");
      }
      if (response.ok) {
        const json = await response.json();
        const payload = json.payload;
        setDocumentInstanceData(payload);
      }
    } catch (error) {
    } finally {
    }
  };

  const loadAllDocumentData = async () => {
    setLoading(true);
    await getDocumentDetailList();
    setLoading(false);
  };

  const handleBack = () => {
    router.back();
  };
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  // const initializePaymentSheet = async () => {
  //   if (!accessToken) {
  //     return navigation.navigate("Login");
  //   }
  //   if (documentDetailData) {
  //     try {
  //       const response = await fetcher(`${STRIPE_PAYMENT_SHEET}`, {
  //         method: "POST",
  //         body: {
  //           resourceId: documentDetailData.product.id,
  //           resourceType: "product",
  //           productName: documentDetailData.product.title,
  //           price: documentDetailData.product.price / 100,
  //         },
  //       });
  //       if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
  //         navigation.navigate("Login");
  //         return "-1";
  //       }
  //       if (response.ok) {
  //         const json = await response.json();
  //         const { paymentId, clientSecret, ephemeralKeySecret, customerId } =
  //           json.payload;
  //         const { error } = await initPaymentSheet({
  //           merchantDisplayName: "Leadvisor",
  //           customerId: customerId,
  //           customerEphemeralKeySecret: ephemeralKeySecret,
  //           paymentIntentClientSecret: clientSecret,
  //           allowsDelayedPaymentMethods: true,
  //           defaultBillingDetails: {
  //             name: "Leadvisor",
  //           },
  //         });
  //         if (!error) {
  //           return paymentId;
  //         } else {
  //           return "-1";
  //         }
  //       }
  //     } catch (err) {
  //       return "-1";
  //     }
  //   }
  // };
  // const openPaymentSheet = async (paymentId: string) => {
  //   const { error } = await presentPaymentSheet();

  //   if (error) {
  //     //   Alert.alert(`Error code: ${error.code}`, error.message);
  //   } else {
  //     const response = await fetcher(`${STRIPE_PAYMENT_SHEET}/${paymentId}`, {
  //       method: "GET",
  //     });
  //     if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
  //       return navigation.navigate("Login");
  //     }

  //     if (response.ok) {
  //       const json = await response.json();
  //       const { status } = json.payload;
  //       if (status === "succeeded") {
  //         navigation.navigate("MyOrder");
  //       }
  //     }
  //   }
  // };
  const handlePaymentZero = async (
    resourceId: string,
    resourceType: "product" | "course",
    productName: string,
    price: number
  ) => {
    if (!accessToken) {
      return router.push("/auth/login");
    }
    const response = await fetcher(`${PAYMENT_ZERO}`, {
      method: "POST",
      body: {
        resourceId: resourceId,
        resourceType: resourceType,
        productName: productName,
        price: price,
      },
    });

    if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
      return router.push("/auth/login");
    }
    if (response.ok) {
      router.push("/my/order");
      // const json = await response.json();
      // const { type } = json;
      // if (type === "SUCCESS") {
      // }
    }
  };
  const handlePay = async () => {
    // 数据加载完毕
    if (documentDetailData) {
      if (documentDetailData.product.price > 0) {
        // const paymentId = await initializePaymentSheet();
        // if (paymentId !== "-1") {
        //   await openPaymentSheet(paymentId);
        // } else {
        //   navigation.navigate("Login");
        // }
      } else {
        await handlePaymentZero(
          documentDetailData.product.id,
          "product",
          documentDetailData.product.title,
          documentDetailData.product.price
        );
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadAllDocumentData(); // 每次屏幕聚焦时执行

      return () => {
        // 可选：屏幕失焦时清理
      };
    }, [accessToken])
  );

  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      {/* 屏幕滚动 */}
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} />
        {loading ? (
          <Loading />
        ) : documentDetailData ? (
          <Fragment>
            {/* 返回 */}
            <View style={styles.NavigateAction}>
              <Pressable onPress={() => handleBack()} style={styles.Navigate}>
                <ChevronLeft color={"#27272A"} size={20} />
                <Text style={{ fontSize: 14, fontWeight: 400 }}>
                  {t("document:all-product")}
                </Text>
              </Pressable>
              {documentDetailData && documentDetailData.instance ? (
                <Text style={styles.Action}>
                  {t("document:already-obtained")}
                </Text>
              ) : (
                <Text style={styles.Action} onPress={() => handlePay()}>
                  {t("document:free")}
                </Text>
              )}
            </View>
            <ScrollView
              style={styles.ScrollContent}
              showsVerticalScrollIndicator={false}
              overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
              bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
            >
              <Text style={styles.Title}>
                {documentDetailData.product.title}
              </Text>

              <Text style={styles.Description}>
                {documentDetailData.product.description}
              </Text>

              <Text
                style={{
                  ...styles.CommonHeader,
                  marginTop: 10,
                  paddingHorizontal: 17,
                }}
              >
                {t("document:product-document")} （
                {documentDetailData.files.length}）
              </Text>
              {/* 产品文档 */}
              <View style={styles.DocumentIntroduceWrapper}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  style={styles.DocumentIntroduceMain}
                  horizontal
                  overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
                  bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
                >
                  {documentDetailData.instance
                    ? documentInstanceData
                      ? documentInstanceData.files.map((item) => {
                          return (
                            <DocumentItem
                              instance={documentDetailData.instance}
                              key={item.id}
                              file={item}
                            />
                          );
                        })
                      : null
                    : documentDetailData.files.map((item) => {
                        return (
                          <DocumentItem
                            instance={documentDetailData.instance}
                            key={item.id}
                            file={item}
                          />
                        );
                      })}
                </ScrollView>
              </View>
              <View style={styles.DocumentInfoWrapper}>
                <View style={styles.DocumentInfoMain}>
                  <View style={styles.DocumentInfoItem}>
                    <Text style={styles.CommonHeader}>
                      {t("document:document-count")}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 10,
                      }}
                    >
                      <FileText size={20} color={"#3F3F46"} strokeWidth={0.8} />
                      <Text
                        style={{
                          marginLeft: 6,
                          color: "#3F3F46",
                          fontSize: 14,
                          fontWeight: 300,
                        }}
                      >
                        {documentDetailData.files.length}{" "}
                        {t("document:document")}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.DocumentInfoItem}>
                    <Text style={styles.CommonHeader}>
                      {t("document:updated-on")}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 10,
                      }}
                    >
                      <CalendarDays
                        size={20}
                        color={"#3F3F46"}
                        strokeWidth={0.8}
                      />
                      <Text
                        style={{
                          marginLeft: 6,
                          color: "#3F3F46",
                          fontSize: 14,
                          fontWeight: 300,
                        }}
                      >
                        {dayjs(
                          new Date(documentDetailData.product.updatedAt)
                        ).fromNow()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.DocumentInfoItem}>
                    <Text style={styles.CommonHeader}>
                      {t("document:published-on")}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 10,
                      }}
                    >
                      <CalendarDays
                        size={20}
                        color={"#3F3F46"}
                        strokeWidth={0.8}
                      />
                      <Text
                        style={{
                          marginLeft: 6,
                          color: "#3F3F46",
                          fontSize: 14,
                          fontWeight: 300,
                        }}
                      >
                        {dayjs(
                          new Date(documentDetailData.createdAt)
                        ).fromNow()}
                      </Text>
                    </View>
                  </View>
                  {documentDetailData.instance && (
                    <View style={styles.DocumentInfoItem}>
                      <Text style={styles.CommonHeader}>
                        {t("document:last-viewed")}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 10,
                        }}
                      >
                        <CalendarDays
                          size={20}
                          color={"#3F3F46"}
                          strokeWidth={0.8}
                        />
                        <Text
                          style={{
                            marginLeft: 6,
                            color: "#3F3F46",
                            fontSize: 14,
                            fontWeight: 300,
                          }}
                        >
                          {dayjs(
                            new Date(
                              documentDetailData.instance.lastAccessedAt || ""
                            )
                          ).fromNow()}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>

              <Text
                style={{
                  ...styles.CommonHeader,
                  marginTop: 10,
                  paddingHorizontal: 17,
                }}
              >
                {t("course:publisher")}
              </Text>
              <View style={styles.PublishWrapper}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
                  bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
                  style={styles.PublishMain}
                >
                  {documentDetailData.product.memberProfiles.map((item) => {
                    return <PublishItem key={item.id} memberProfile={item} />;
                  })}
                </ScrollView>
              </View>
              <Text
                style={{
                  ...styles.CommonHeader,
                  marginTop: 10,
                  paddingHorizontal: 17,
                }}
              >
                {t("course:tags")}
              </Text>
              <View style={styles.TagWrapper}>
                <View style={styles.TagMain}>
                  {documentDetailData.product.countries.map((item) => {
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
                  {documentDetailData.product.topics.map((item) => {
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
                  {documentDetailData.product.serviceCategories.map((item) => {
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
          </Fragment>
        ) : null}
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
  },
  NavigateAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingLeft: 12,
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
  },
  ScrollContent: {
    flex: 1,
    paddingBottom: 20,
  },
  Title: {
    marginTop: 20,
    paddingHorizontal: 17,
    fontSize: 18,
    fontWeight: 600,
    color: "#3F3F46",
  },

  Description: {
    marginTop: 10,
    paddingHorizontal: 17,
    color: "#A1A1AA",
    fontSize: 14,
    fontWeight: 400,
  },

  CommonHeader: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: 400,
  },

  DocumentIntroduceWrapper: {
    marginTop: 10,
    paddingHorizontal: 17,
  },
  DocumentIntroduceMain: {
    // borderRadius: 10,
    paddingVertical: 6,
  },
  DocumentInfoWrapper: {
    marginTop: 10,
    paddingHorizontal: 17,
  },
  DocumentInfoMain: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  DocumentInfoItem: {
    width: "50%",
    marginBottom: 20,
  },
  // 发布者
  PublishWrapper: {
    paddingHorizontal: 17,

    marginTop: 10,
  },
  PublishMain: {
    paddingVertical: 6,
  },
  TagWrapper: {
    marginTop: 10,
    paddingHorizontal: 17,
  },
  TagMain: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
export default DocumentDetailScreen;
