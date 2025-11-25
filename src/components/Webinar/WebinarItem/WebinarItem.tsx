import { useNavigation } from "@react-navigation/native";
import { Webinar } from "@type/common/Webinar/Webinar.types";
import { ScreenProps } from "@type/Navigation/ScreenType";
import { formatIsoTime } from "@utils/time/time";
import { CircleDot } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
interface WebinarItemProps {
  webinar: Webinar;
}
const WebinarItem: React.FC<WebinarItemProps> = ({ webinar }) => {
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const windowWidth = Dimensions.get("window").width;
  const [coverSize, setCoverSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const { t } = useTranslation();
  const handleDetail = async () => {
    navigation.navigate("WebinarDetail", {
      slug: webinar.slug,
    });
  };

  return (
    <View
      style={{
        ...styles.WebinarItemWrapper,
      }}
    >
      <Pressable style={styles.WebinarItemMain} onPress={() => handleDetail()}>
        <Image style={styles.Cover} src={webinar.previewImageUrl} />
        <Text style={styles.Title} numberOfLines={2} ellipsizeMode="tail">
          {webinar.title}
        </Text>
        <Text style={styles.Desc} numberOfLines={4} ellipsizeMode="tail">
          {webinar.description}
        </Text>
        <View style={styles.Detail}>
          <View style={styles.DotTime}>
            <CircleDot />
            <Text style={styles.Time}>
              {formatIsoTime(`${webinar.scheduledAt}`)}
            </Text>
          </View>
          <Text style={styles.Record}>{t("insight:recorded")}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  WebinarItemWrapper: {
    width: "100%",
    marginTop: 6,
  },
  WebinarItemMain: {
    position: "relative",
    width: "100%",
    boxShadow: "0px 4px 5px 0px rgba(108, 108, 108, 0.25)",

    overflow: "hidden",
    borderRadius: 5,
    paddingBottom: 10,
  },
  Cover: {
    width: "100%",
    height: 160,
    objectFit: "cover",
  },
  Title: {
    marginTop: 4,
    paddingLeft: 6,
    paddingRight: 4,
    fontFamily: "Inter",
    fontWeight: 800,
    fontSize: 12,
    color: "#000000",
  },
  Desc: {
    marginTop: 4,
    paddingLeft: 6,
    paddingRight: 4,
    fontFamily: "Inter",
    fontSize: 10,
    color: "#727272",
  },
  Detail: {
    marginTop: 8,
    paddingTop: 8,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: "#e5e5ed",
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

export default WebinarItem;
