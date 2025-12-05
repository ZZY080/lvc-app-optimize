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
          {/* 国家 */}
          <View style={styles.CityWrapper}>
            <View style={styles.CityMain}>
              {advisor.countries.map((item, index) => {
                return (
                  <Text key={index} style={styles.CityTag}>
                    {item.name}
                  </Text>
                );
              })}
            </View>
          </View>
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
          {/* 描述 */}
          <Text
            style={styles.Description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {advisor.description}
          </Text>
          {/*  */}
          <View style={styles.Divide}></View>
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
  // 国家
  CityWrapper: {},
  CityMain: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  CityTag: {
    fontSize: 10,
    fontWeight: 300,
    color: "#3F3F46",
  },
  Name: {
    // backgroundColor: "red",
    textAlign: "left",
    fontSize: 14,
    fontWeight: 400,
    color: "#3F3F46",
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
    backgroundColor: "#6562A933",
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: "#6562A9",
    fontSize: 10,
    fontWeight: 300,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  Description: {
    fontSize: 12,
    fontWeight: 300,
    color: "#A1A1AA",
  },
  Divide: {
    marginTop: 20,
    height: 1,
    backgroundColor: "#11111126",
  },
});

export default AdvisorItem;
