import { Image, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import SectionHeader from "@components/Common/SectionHeader/SectionHeader";
import { DocumentInstance } from "@type/common/Document/Document.types";
interface ProductInfomationProps {
  product: DocumentInstance["product"];
}
const ProductInfomation: React.FC<ProductInfomationProps> = ({ product }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.ProductInfomationWrapper}>
      <View style={styles.ProductInfomationMain}>
        <SectionHeader
          hasBar={true}
          title={t("document-instance:product-information")}
          marginTop={0}
          paddingHorizontal={0}
        />
        <Text style={{ ...styles.Title, marginTop: 10 }}>
          {t("document-instance:Title")}
        </Text>
        <Text style={styles.Desc}>{product.title}</Text>
        <Text style={styles.Title}>{t("document-instance:desc")}</Text>
        <Text style={styles.Desc}>{product.description}</Text>
        <Text style={styles.Title}>{t("document-instance:tags")}</Text>
        <View style={styles.Type}>
          {product.services.map((item, index) => {
            return (
              <Text style={styles.Label} key={item.id}>
                {item.name}
              </Text>
            );
          })}
        </View>
        <Text style={styles.Title}>
          {t("document-instance:product-provider")}
        </Text>
        <View style={styles.FirmWrapper}>
          <View style={styles.FirmMain}>
            {product?.memberProfiles.map((item) => {
              return (
                <View style={styles.LogoText} key={item.id}>
                  <Image
                    src={item.logoUrl || ""}
                    style={{
                      width: 50,
                      height: 25,
                      objectFit: "contain",
                    }}
                  />
                  <Text style={{ color: "#6d73b7", fontSize: 12 }}>
                    {item.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProductInfomationWrapper: {
    paddingHorizontal: 10,
  },
  ProductInfomationMain: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    borderRadius: 5,
    fontSize: 10,
  },
  Title: {
    color: "#727272",
    fontSize: 12,
    marginBottom: 5,
  },
  Desc: {
    color: "#565656",
    fontSize: 10,
    marginBottom: 5,
  },

  // 标签
  Type: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 8,
    columnGap: 4,
    marginBottom: 5,
  },
  Label: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#6562A9",
    borderRadius: 3,
    paddingHorizontal: 9,
    paddingVertical: 2,
    fontFamily: "Inter",
    fontSize: 10,
    color: "#6562A9",
  },
  // 产品提供机构
  FirmWrapper: {
    // marginTop: 10,
    // paddingHorizontal: 28,
  },
  FirmMain: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    rowGap: 10,
  },
  LogoText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    borderWidth: 1,
    borderColor: "#6d73b7",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: "#6d73b7",
  },
});
export default ProductInfomation;
