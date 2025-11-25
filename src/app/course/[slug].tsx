import Loading from "@components/Common/Loading/Loading";
import CourseItem from "@components/CourseDetail/CourseItem/CourseItem";
import { RootState } from "@redux/store";
// import { useStripe } from "@stripe/stripe-react-native";
import { CourseDetail } from "@type/common/Course/Course.types";

import {
  ACCESS_TOKEN_EXPIRE_STATUS_CODE,
  COURSE,
  PAYMENT_ZERO,
} from "@constants/url/url";
import dayjs from "dayjs";
import { StatusBar } from "expo-status-bar";
import {
  CalendarDays,
  ChevronLeft,
  Clock,
  MonitorPlay,
} from "lucide-react-native";
import { Fragment, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { fetcher } from "@api/request";
import PublishItem from "@components/CourseDetail/PublishItem/PublishItem";
import { formatSeconds } from "@utils/time/time";
import reactiveTime from "dayjs/plugin/relativeTime";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

const CourseDetailScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const lang = useSelector((state: RootState) => state.language.lang);
  dayjs.extend(reactiveTime);
  dayjs.locale(lang === "cn" ? "zh-cn" : "en");

  const { t } = useTranslation();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [courseDetailData, setCourseDetailData] = useState<CourseDetail | null>(
    null
  );
  const [duration, setDuration] = useState<number>(0);

  // const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // 获取课程
  const getCourseDetailList = async () => {
    try {
      const response = await fetcher(`${COURSE}/${slug}`, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        const payload = json.payload;
        let time: number = 0;
        payload.videos.forEach((item: CourseDetail["videos"][0]) => {
          time = time + item.duration;
        });
        setDuration(time);
        setCourseDetailData(payload);
      }
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      // 页面每次聚焦都会执行
      getCourseDetailList();

      return () => {
        // 页面离开时清理
      };
    }, [accessToken])
  );
  // 跳转到购买页
  const handlePurchasedCourse = () => {
    if (courseDetailData) {
      router.push(`/course/instance/${courseDetailData.instance?.id}`);
    }
  };
  // const initializePaymentSheet = async () => {
  //   if (!accessToken) {
  //     return navigation.navigate("Login");
  //   }
  //   if (courseDetailData) {
  //     try {
  //       const response = await fetcher(`${STRIPE_PAYMENT_SHEET}`, {
  //         method: "POST",
  //         body: {
  //           resourceId: courseDetailData.id,
  //           resourceType: "course",
  //           productName: courseDetailData.title,
  //           price: courseDetailData.price / 100,
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
    if (courseDetailData) {
      if (courseDetailData.price > 0) {
        // const paymentId = await initializePaymentSheet();
        // if (paymentId !== "-1") {
        //   await openPaymentSheet(paymentId);
        // } else {
        //   navigation.navigate("Login");
        // }
      } else {
        await handlePaymentZero(
          courseDetailData.id,
          "course",
          courseDetailData.title,
          courseDetailData.price
        );
      }
    }
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="dark" />
        {courseDetailData ? (
          <Fragment>
            {/* 头部 */}
            <View style={styles.BackEffectWrapper}>
              <View style={styles.BackEffectMain}>
                <Pressable onPress={() => handleBack()} style={styles.Navigate}>
                  <ChevronLeft color={"#27272A"} size={20} />
                  <Text
                    style={{ fontSize: 14, fontWeight: 400, color: "#27272A" }}
                  >
                    {t("course:all-course")}
                  </Text>
                </Pressable>
                {courseDetailData?.instance ? (
                  <TouchableOpacity onPress={() => handlePurchasedCourse()}>
                    <Text style={styles.Right}>
                      {t("course:continue-watching")}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => handlePay()}>
                    <Text style={styles.Right}>{t("course:free")}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* 滚动内容 */}
            <View style={styles.SrollWrapper}>
              <ScrollView
                style={styles.ScrollMain}
                showsVerticalScrollIndicator={false}
                overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
                bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
              >
                {/* Cover */}
                <View style={styles.Cover}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={courseDetailData?.previewImageUrl}
                  />
                </View>
                {/* Title */}
                <Text style={styles.Title}>{courseDetailData.title}</Text>
                <Text style={{ ...styles.CommonHeader, paddingHorizontal: 17 }}>
                  {t("course:course-introduction")}
                </Text>
                <Text style={styles.Description}>
                  {courseDetailData.description}
                </Text>
                <Text
                  style={{
                    ...styles.CommonHeader,
                    marginTop: 10,
                    paddingHorizontal: 17,
                  }}
                >
                  {t("course:course-video")}
                </Text>
                <View style={styles.CourseIntroduceWrapper}>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    style={styles.CourseIntroduceMain}
                    horizontal
                  >
                    {courseDetailData.videos.map((item) => {
                      return <CourseItem key={item.id} course={item} />;
                    })}
                  </ScrollView>
                </View>
                <View style={styles.CourseInfoWrapper}>
                  <View style={styles.CourseInfoMain}>
                    <View style={styles.CourseInfoItem}>
                      <Text style={styles.CommonHeader}>
                        {t("course:course-duration")}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 10,
                        }}
                      >
                        <Clock size={20} color={"#3F3F46"} strokeWidth={0.8} />
                        <Text
                          style={{
                            marginLeft: 6,
                            color: "#3F3F46",
                            fontSize: 14,
                            fontWeight: 300,
                          }}
                        >
                          {formatSeconds(duration, lang)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.CourseInfoItem}>
                      <Text style={styles.CommonHeader}>
                        {t("course:video-count")}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 10,
                        }}
                      >
                        <MonitorPlay
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
                          {courseDetailData.numVideos} {t("course:video")}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.CourseInfoItem}>
                      <Text style={styles.CommonHeader}>
                        {t("course:published-on")}
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
                            new Date(courseDetailData.createdAt)
                          ).fromNow()}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.CourseInfoItem}>
                      <Text style={styles.CommonHeader}>
                        {t("course:updated-on")}
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
                            new Date(courseDetailData.updatedAt)
                          ).fromNow()}
                        </Text>
                      </View>
                    </View>
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
                    style={styles.PublishMain}
                  >
                    {courseDetailData.memberProfiles.map((item) => {
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
                    {courseDetailData.countries.map((item) => {
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
                    {courseDetailData.topics.map((item) => {
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
                    {courseDetailData.serviceCategories.map((item) => {
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
          <Loading />
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
  // 滚动内容
  SrollWrapper: {
    flex: 1,
  },
  ScrollMain: {
    flex: 1,
  },
  BackEffectWrapper: {
    marginTop: 10,
    paddingRight: 10,
  },
  BackEffectMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  Navigate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  Right: {
    color: "#006FEE",
  },
  Cover: {
    marginTop: 15,
    height: 220,
    width: "100%",
  },
  CommonHeader: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: 400,
  },
  Title: {
    color: "#3F3F46",
    fontSize: 17,
    fontWeight: 400,
    padding: 17,
  },
  Description: {
    marginTop: 10,
    paddingHorizontal: 17,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 400,
    color: "#A1A1AA",
  },
  CourseIntroduceWrapper: {
    marginTop: 10,
    paddingHorizontal: 17,
  },
  CourseIntroduceMain: {
    // borderRadius: 10,
    paddingVertical: 6,
  },
  CourseInfoWrapper: {
    marginTop: 10,
    paddingHorizontal: 17,
  },
  CourseInfoMain: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  CourseInfoItem: {
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

export default CourseDetailScreen;
