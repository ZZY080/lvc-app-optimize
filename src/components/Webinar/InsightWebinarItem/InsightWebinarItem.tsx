import { formatIsoTime } from "@utils/time/time";
import { router } from "expo-router";
import { CircleDot } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
interface InsightWebinarItemProps {
  index: number;
  id: string;
  slug: string;
  title: string;
  description: string;
  previewImageUrl: string;
  scheduledAt: string | null;
  duration: number | null;
  recordingAvailable: boolean;
}
const InsightWebinarItem: React.FC<InsightWebinarItemProps> = ({
  index,
  id,
  slug,
  previewImageUrl,
  title,
  scheduledAt,
}) => {
  const { t } = useTranslation();
  const handleDetail = async () => {
    router.push(`/webinar/${slug}`);
  };
  return (
    <View
      style={{
        ...styles.WebinarItemWrapper,
        paddingRight: (index + 1) % 2 === 1 ? 5 : 0,
        paddingLeft: (index + 1) % 2 === 0 ? 5 : 0,
      }}
    >
      <Pressable style={styles.WebinarItemMain} onPress={() => handleDetail()}>
        <Image style={styles.Cover} src={previewImageUrl} />
        <Text style={styles.Title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={styles.Detail}>
          <View style={styles.DotTime}>
            <CircleDot style={styles.Dot} />
            <Text style={styles.Time}>{formatIsoTime(`${scheduledAt}`)}</Text>
          </View>
          <Text style={styles.Record}>{t("insight:recorded")}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  WebinarItemWrapper: {
    width: "50%",
    height: 152,
    marginBottom: 15,
  },
  WebinarItemMain: {
    position: "relative",
    width: "100%",
    height: "100%",
    boxShadow: "0px 4px 5px 0px rgba(108, 108, 108, 0.25)",
    overflow: "hidden",
    borderRadius: 5,
  },
  Cover: {
    width: "100%",
    height: 90,
    objectFit: "cover",
  },
  Title: {
    marginTop: 4,
    paddingLeft: 6,
    paddingRight: 4,
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 12,
    color: "#000000",
  },
  Detail: {
    width: "100%",
    position: "absolute",
    bottom: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  DotTime: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Dot: {
    width: 4,
    height: 4,
    objectFit: "cover",
    marginRight: 4,
  },
  Time: {
    fontFamily: "Poppins",
    fontSize: 9,
    fontWeight: 300,
    color: "#C4C4C4",
  },
  Record: {
    fontFamily: "Poppins",
    fontSize: 9,
    fontWeight: 300,
    color: "#A8A5DF",
  },
});

export default InsightWebinarItem;
