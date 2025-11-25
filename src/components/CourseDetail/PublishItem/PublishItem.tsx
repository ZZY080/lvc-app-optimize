import { CourseDetail } from "@type/common/Course/Course.types";
import { CirclePlay } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
interface PublishItemProps {
  memberProfile: CourseDetail["memberProfiles"][0];
}
const PublishItem: React.FC<PublishItemProps> = ({ memberProfile }) => {
  return (
    <View style={styles.PublishItemWrapper}>
      <View style={styles.PublishItemMain}>
        <Text style={styles.Name}>{memberProfile.name}</Text>
        <Text style={styles.Description} numberOfLines={2} ellipsizeMode="tail">
          {memberProfile.description}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  PublishItemWrapper: {
    marginLeft: 0.4,
    marginRight: 20,
  },
  PublishItemMain: {
    width: 286,
    height: 90,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    backgroundColor: "white",
  },
  Name: {
    fontSize: 14,
    color: "#3F3F46",
    fontWeight: 400,
  },
  Description: {
    color: "#A1A1AA",
    fontSize: 10,
    marginTop: 6,
    lineHeight: 16,
  },
});

export default PublishItem;
