import { CourseDetail } from "@type/common/Course/Course.types";
import { CirclePlay } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
interface CourseItemProps {
  course: CourseDetail["videos"][0];
}
const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  return (
    <View style={styles.CourseItemWrapper}>
      <View style={styles.CourseItemMain}>
        <CirclePlay size={40} color={"#3F3F46"} strokeWidth={0.8} />
        <View style={styles.Info}>
          <Text style={styles.Title} numberOfLines={2} ellipsizeMode="tail">
            {course.title}
          </Text>
          <Text
            style={styles.Description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {course.description}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  CourseItemWrapper: {
    marginLeft: 0.8,
  },
  CourseItemMain: {
    width: 286,
    height: 109,
    marginRight: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  },
  Info: {
    marginLeft: 10,
    flex: 1,
  },
  Title: {
    color: "#3F3F46",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 24,
  },
  Description: {
    color: "#A1A1AA",
    fontSize: 10,
    marginTop: 6,
  },
});

export default CourseItem;
