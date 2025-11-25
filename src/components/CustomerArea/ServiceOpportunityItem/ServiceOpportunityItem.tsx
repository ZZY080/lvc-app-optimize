import { useNavigation } from "@react-navigation/native";
import { ServiceOpportunity } from "@type/common/Opportunity/Opportunity.types";
import { ScreenProps } from "@type/Navigation/ScreenType";

import { Pressable, StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import reactiveTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useTranslation } from "react-i18next";
interface ServiceOpportunityItemProps {
  serviceOpportunity: ServiceOpportunity;
}
const ServiceOpportunityItem: React.FC<ServiceOpportunityItemProps> = ({
  serviceOpportunity,
}) => {
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const { t } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);
  dayjs.extend(reactiveTime);
  dayjs.locale(lang === "cn" ? "zh-cn" : "en");
  const handleDetail = () => {
    navigation.navigate("CustomerAreaServiceRequirementDetail", {
      id: serviceOpportunity.id,
    });
  };
  return (
    <Pressable
      onPress={() => handleDetail()}
      style={styles.ServiceOpportunityItemWrapper}
    >
      <View style={styles.ServiceOpportunityItemMain}>
        <Text style={styles.Time}>
          {t("opportunity:updated-on") + " "}
          {dayjs(new Date(serviceOpportunity.updatedAt)).fromNow()}
        </Text>
        <Text style={styles.Title} numberOfLines={2} ellipsizeMode="tail">
          {serviceOpportunity.title}
        </Text>
        <View style={styles.CountryWrapper}>
          <View style={styles.CountryMain}>
            {serviceOpportunity.countries.map((item, index) => {
              return (
                <Text style={styles.CountryWord} key={index}>
                  {item.name}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={styles.Divide}></View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  ServiceOpportunityItemWrapper: {
    marginBottom: 20,
  },
  ServiceOpportunityItemMain: {},
  Time: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: 300,
  },
  Title: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20,
    color: "#3F3F46",
  },
  CountryWrapper: {
    marginTop: 10,
  },
  CountryMain: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 10,
    rowGap: 10,
  },
  CountryWord: {
    backgroundColor: "#6562A933",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 10,
    color: "#6562A9",
  },
  Divide: {
    marginTop: 20,
    width: "90%",
    height: 1,
    backgroundColor: "#11111126",
  },
});
export default ServiceOpportunityItem;
