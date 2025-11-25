import { useNavigation } from "@react-navigation/native";
import { Course } from "@type/common/Course/Course.types";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
interface CourseItemProps {
  course: Course;
}
const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  return (
    <View style={styles.CourseItemWrapper}>
      <Pressable
        style={styles.CourseItemMain}
        onPress={() => {
          router.push(`/course/${course.slug}`);
        }}
      >
        {/* 封面 */}
        <View style={styles.Cover}>
          <Image style={styles.Pic} src={course?.previewImageUrl} />
        </View>
        {/* 信息 */}
        <View style={styles.Info}>
          {/* 标题 */}
          <Text style={styles.Title} numberOfLines={1} ellipsizeMode="tail">
            {course?.title}
          </Text>
          {/* 描述 */}
          <Text style={styles.Desc} numberOfLines={2} ellipsizeMode="tail">
            {course.memberProfiles && course.memberProfiles.length > 0
              ? course.memberProfiles[0].name
              : ""}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  CourseItemWrapper: {
    marginTop: 6,
  },
  CourseItemMain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    borderRadius: 6,
  },
  Cover: {
    position: "relative",
    width: 110,
    height: 73,
    borderRadius: 5,
    overflow: "hidden",
    opacity: 1,
    marginRight: 12,
    // 第一层阴影: 0 2px 4px rgba(0, 0, 0, .12)
    shadowColor: "#000", // 阴影颜色
    shadowOffset: { width: 0, height: 2 }, // 阴影偏移
    shadowOpacity: 0.12, // 阴影透明度
    shadowRadius: 4, // 阴影模糊半径
    // Android 阴影：elevation 控制
    elevation: 6, // 阴影深度（Android）
  },
  Pic: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  Pause: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      {
        translateX: "-50%",
      },
      {
        translateY: "-50%",
      },
    ],
    width: 25,
    height: 25,
    zIndex: 10,
    objectFit: "cover",
  },
  Info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  Title: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: 0,
    color: "#000000",
  },
  Desc: {
    fontSize: 10,
    color: "#999999",
    marginTop: 5,
  },
});

export default CourseItem;
