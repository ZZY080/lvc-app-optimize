import { formatIsoTime } from "@utils/time/time";
import { upperCase, upperFirst, wrap } from "lodash";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
interface OrderItemProps {
  id: string;
  title: string;
  price: number;
  resourceId: string;
  resourceType: "product" | "course";
  resourceVariantType: string;
  createdAt: string;
}
const OrderItem: React.FC<OrderItemProps> = ({
  id,
  title,
  price,
  resourceId,
  resourceType,
  createdAt,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.OrderItemWrapper}>
      <View style={styles.OrderItemMain}>
        <Text style={styles.Title}>{title}</Text>
        <View style={styles.Tags}>
          <Text style={styles.Type}>
            {t("my-order:resource-type")} {upperFirst(resourceType)}
          </Text>
          <Text style={styles.Order}>{id}</Text>
        </View>
        <View style={styles.TotalPrice}>
          <Text style={styles.Total}> {t("common:total")}:</Text>
          <Text style={styles.Price}>${price / 100}</Text>
        </View>
        <View style={styles.Divide}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  OrderItemWrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  OrderItemMain: {
    flexGrow: 1,
  },
  Title: {
    fontSize: 14,
    fontWeight: 400,
    color: "#3F3F46",
  },
  InfoPrice: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  Info: {
    flex: 1,
  },
  Word: {
    fontSize: 10,
    marginBottom: 5,
  },

  Tags: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  Type: {
    backgroundColor: "#E6E5FA",
    fontSize: 10,
    fontWeight: 300,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    color: "#4A4791",
    marginRight: 10,
  },
  Order: {
    backgroundColor: "#E4E4E7",
    fontSize: 10,
    fontWeight: 300,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    color: "#71717A",
  },

  TotalPrice: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Total: {
    fontSize: 12,
    fontWeight: 300,
    color: "#71717A",
  },
  Price: {
    fontSize: 12,
    fontWeight: 300,
    color: "#71717A",
  },
  Divide: {
    marginTop: 10,
    width: "100%",
    height: 1,
    backgroundColor: "#11111126",
  },
});

export default OrderItem;
