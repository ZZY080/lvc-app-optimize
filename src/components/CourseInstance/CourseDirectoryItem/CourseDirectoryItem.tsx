import CustomIcon from "@components/Common/CustomIcon/CustomIcon";
import { formatSecondsToTime } from "@utils/time/time";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { CirclePlay } from "lucide-react-native";
import { CourseDetail } from "@type/common/Course/Course.types";
import { useTranslation } from "react-i18next";
interface CourseDirectoryItemProps {
  index: number;
  currentCourseIndex: number;
  setCurrentCourseIndex: React.Dispatch<React.SetStateAction<number>>;
  video: CourseDetail["videos"][0];
}
const CourseDirectoryItem: React.FC<CourseDirectoryItemProps> = ({
  index,
  currentCourseIndex,
  setCurrentCourseIndex,
  video,
}) => {
  const { t } = useTranslation();
  const handleCourseIndex = (index: number) => {
    setCurrentCourseIndex(index);
  };
  return (
    <View style={{ ...styles.CourseDirectoryItemWrapper }}>
      <Pressable
        style={{
          ...styles.CourseDirectoryItemMain,
        }}
        onPress={() => handleCourseIndex(index)}
      >
        <CirclePlay size={40} color={"#3F3F46"} strokeWidth={0.8} />
        <View style={styles.Info}>
          <Text style={styles.Title} numberOfLines={2}>
            {video.title}
          </Text>
          <Text
            style={styles.Description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {video.description}
          </Text>
          <View style={{ ...styles.Play }}>
            <Text
              style={{
                ...styles.Word,
                backgroundColor:
                  index === currentCourseIndex ? "#6562A933" : "#fff",
                color: index === currentCourseIndex ? "#6562A9" : "#fff",
              }}
            >
              {t("course:playing")}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  CourseDirectoryItemWrapper: {
    paddingHorizontal: 6,
  },
  CourseDirectoryItemMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: "white",
  },
  Info: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
    alignItems: "flex-start",
    flex: 1,
  },
  Title: {
    flex: 1,
    color: "#3F3F46",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 20,
  },

  Description: {
    flex: 1,
    fontSize: 10,
    color: "#A1A1AA",
  },
  Play: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Word: {
    backgroundColor: "#6562A933",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 8,
    fontWeight: 400,
    color: "#6562A9",
  },
});

export default CourseDirectoryItem;
