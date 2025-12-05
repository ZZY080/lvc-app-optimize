import { themes } from "@themes/themes";
import { Advisor } from "@type/common/Advisor/Advisor.types";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
interface AdvisorItemProps {
  advisor: Advisor;
}
const AdvisorItem: React.FC<AdvisorItemProps> = ({ advisor }) => {
  return (
    <Pressable
      style={styles.AdvisorItemWrapper}
      onPress={() => router.push(`/counselor/${advisor.slug}`)}
    >
      <View style={styles.AdvisorItemMain}>
        <View style={styles.Logo}>
          <Image
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={advisor.logoUrl || ""}
          />
        </View>
        <View style={styles.Info}>
          {/* 公司名字 */}
          <Text style={styles.Name} numberOfLines={1} ellipsizeMode="tail">
            {advisor.name}
          </Text>
          {/* 业务机会 */}
          <View style={styles.ServiceWrapper}>
            <View style={styles.ServiceMain}>
              {advisor.serviceCategories.map((item, index) => {
                return (
                  <Text key={index} style={styles.ServiceTag}>
                    {item.name}
                  </Text>
                );
              })}
            </View>
          </View>
          {/* 国家 */}
          {/* <View style={styles.CityWrapper}>
            <View style={styles.CityMain}>
              {advisor.countries.map((item, index) => {
                return (
                  <Text key={index} style={styles.CityTag}>
                    {item.name}
                  </Text>
                );
              })}
            </View>
          </View> */}
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  AdvisorItemWrapper: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  AdvisorItemMain: {
    display: "flex",
    flexDirection: "row",
  },
  Logo: {
    width: 78,
    height: 78,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    borderRadius: 5,
    padding: 10,
  },
  Info: {
    flex: 1,
    display: "flex",
  },
  Name: {
    // backgroundColor: "red",
    textAlign: "left",
    fontSize: 12,
    fontWeight: 800,
  },
  // 业务机会
  ServiceWrapper: {
    marginTop: 10,
  },
  ServiceMain: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ServiceTag: {
    fontSize: 8,
    marginRight: 10,
    marginBottom: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: themes.color.themeColor,
    borderRadius: 6,
    color: themes.color.themeColor,
  },
  // 国家
  CityWrapper: {
    marginTop: 10,
  },
  CityMain: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  CityTag: {
    fontSize: 8,
    marginRight: 10,
    marginBottom: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 0.3,
    borderColor: themes.color.themeColor,
    borderRadius: 6,
    color: themes.color.themeColor,
  },
});

export default AdvisorItem;
