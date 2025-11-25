import { fetcher } from "@api/request";
import Loading from "@components/Common/Loading/Loading";
import CourseDirectoryItem from "@components/CourseInstance/CourseDirectoryItem/CourseDirectoryItem";
import VideoPlay from "@components/CourseInstance/VideoPlay/VideoPlay";
import {
  ACCESS_TOKEN_EXPIRE_STATUS_CODE,
  COURSE_INSTANCE,
} from "@constants/url/url";
import { CourseInstance } from "@type/common/Course/Course.types";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CourseInstanceScreen = () => {
  const { instanceId } = useLocalSearchParams();
  const { t } = useTranslation();
  const [courseData, setCourseData] = useState<CourseInstance | null>(null);
  const [currentCourseIndex, setCurrentCourseIndex] = useState<number>(0);

  const getCourseList = async () => {
    try {
      const response = await fetcher(`${COURSE_INSTANCE}/${instanceId}`, {
        method: "GET",
      });
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return router.push("/auth/login");
      }
      if (response.ok) {
        const json = await response.json();
        const payload = json.payload;
        setCourseData(payload);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getCourseList();
  }, []);
  const handleBack = () => {
    router.back();
  };
  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      <View style={styles.Content}>
        {/* 视频播放区域 */}
        {courseData ? (
          <Fragment>
            {/* 顶部状态栏 */}
            <StatusBar translucent={true} style="dark" />
            {/* 返回 */}
            <Pressable onPress={() => handleBack()} style={styles.Navigate}>
              <ChevronLeft color={"#27272A"} size={20} />
              <Text style={{ fontSize: 14, fontWeight: 400, color: "#27272A" }}>
                {t("course:course-detail")}
              </Text>
            </Pressable>
            {/* 视频播放 */}
            <VideoPlay video={courseData.videos[currentCourseIndex]} />
            {/* 屏幕滚动 */}
            <ScrollView
              style={styles.ScrollContent}
              showsVerticalScrollIndicator={false}
              overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
              bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
            >
              <Text style={styles.Title}>{courseData?.title}</Text>
              <Text
                style={{
                  ...styles.CommonHeader,
                  paddingHorizontal: 17,
                  marginTop: 10,
                }}
              >
                {t("course:course-introduction")}
              </Text>
              <Text style={styles.Desc}>{courseData?.description}</Text>

              <Text
                style={{
                  ...styles.CommonHeader,
                  paddingHorizontal: 17,
                  marginTop: 10,
                }}
              >
                {t("course:course-video")} ({courseData.videos.length})
              </Text>
              <View style={styles.CourseDirectoryWrapper}>
                <View style={styles.CourseDirectoryMain}>
                  {courseData?.videos.map((item, index) => {
                    return (
                      <CourseDirectoryItem
                        key={item.id}
                        video={item}
                        currentCourseIndex={currentCourseIndex}
                        setCurrentCourseIndex={setCurrentCourseIndex}
                        index={index}
                      />
                    );
                  })}
                </View>
              </View>
            </ScrollView>
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
    flex: 1,
    paddingBottom: 10,
  },
  // 返回
  Navigate: {
    paddingVertical: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  // 内容区域
  ScrollContent: {
    flex: 1,
  },
  CommonHeader: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: 400,
  },
  // 标题
  Title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 400,
    paddingHorizontal: 17,
    color: "#3F3F46",
  },
  Desc: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 24,
    paddingHorizontal: 17,
    color: "#A1A1AA",
  },
  ServiceWrapper: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  ServiceMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: 10,
    rowGap: 10,
  },
  ServiceWord: {
    fontSize: 10,
    borderWidth: 1,
    borderColor: "#6d73b7",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: "#6d73b7",
  },

  FirmWrapper: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  FirmMain: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    rowGap: 10,
  },
  LogoText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    borderWidth: 1,
    borderColor: "#6d73b7",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: "#6d73b7",
  },

  CourseDirectoryWrapper: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  CourseDirectoryMain: {
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
  },
});

export default CourseInstanceScreen;
