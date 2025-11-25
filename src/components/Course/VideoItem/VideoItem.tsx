import { useNavigation } from "@react-navigation/native";
import { ScreenProps } from "@type/Navigation/ScreenType";
import { Play } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
interface VideoItemProps {
  id: string;
  title: string;
  previewImageUrl: string;
  videoUrl: string;
  videoHLSUrl: string;
}
const VideoItem: React.FC<VideoItemProps> = ({
  videoUrl,
  previewImageUrl,
  title,
}) => {
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const { t } = useTranslation();
  return (
    <Pressable
      style={styles.VideoItemWrapper}
      onPress={() =>
        navigation.navigate("VideoPlayer", {
          videoUrl: videoUrl,
        })
      }
    >
      <View style={styles.VideoItemMain}>
        <View style={styles.PicIconTag}>
          <Image style={styles.Pic} src={previewImageUrl} />
          <Play style={styles.Icon} color={"gray"} />
          <Text style={styles.Tag}>{t("common:shorts")}</Text>
        </View>
        <Text style={styles.Title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  VideoItemWrapper: { marginBottom: 16 },
  VideoItemMain: {},
  PicIconTag: {
    position: "relative",
    width: "100%",
    height: 200,
    borderRadius: 10,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  Pic: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  Icon: {
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
    width: 45,
    height: 45,
    objectFit: "cover",
  },
  Tag: {
    position: "absolute",
    top: 12,
    right: 14,
    borderRadius: 9,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FFFFFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "Inter",
    fontSize: 12,
    color: "#FFFFFF",
  },
  Title: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 800,
    color: "#000000",
    marginTop: 10,
    paddingLeft: 6,
  },
});

export default VideoItem;
