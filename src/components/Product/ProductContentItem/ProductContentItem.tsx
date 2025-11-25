import { useNavigation } from "@react-navigation/native";
import { themes } from "@themes/themes";
import { Document } from "@type/common/Document/Document.types";
import { ScreenProps } from "@type/Navigation/ScreenType";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
interface ProductContentItemProps {
  index: number;
  document: Document;
}
const ProductContentItem: React.FC<ProductContentItemProps> = ({
  document,
  index,
}) => {
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const { t } = useTranslation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("DocumentDetail", { slug: document.product.slug })
      }
      style={{
        ...styles.ProductContentItemWrapper,
        paddingRight: (index + 1) % 2 === 1 ? 2 : 0,
        paddingLeft: (index + 1) % 2 === 0 ? 2 : 0,
      }}
      key={index}
    >
      <View
        style={{
          ...styles.ProductContentItemMain,
          backgroundColor: themes.color.white,
        }}
      >
        <View style={styles.IconTag}>
          {/* <Text style={styles.Tag} numberOfLines={1} ellipsizeMode="tail">
            {document.product.services[0].name}
          </Text> */}
          <Image
            style={styles.Icon}
            source={require("@assets/product/business-file-icon.png")}
          />
        </View>
        <Text style={styles.Title} numberOfLines={2} ellipsizeMode="tail">
          {document.product.title}
        </Text>
        <View style={styles.PriceCount}>
          <Text style={styles.Price}>
            {document.instance
              ? t("common:owned")
              : document.product.price === 0
              ? t("common:free")
              : `$ ${document.product.price / 100}`}
          </Text>
          <Text style={styles.Count}>
            {t("product:files-included")}：{document.numDocuments}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ProductContentItemWrapper: {
    width: "50%",
    marginBottom: 6,
  },
  ProductContentItemMain: {
    borderRadius: 6,
    overflow: "hidden",
    paddingBottom: 8,
  },
  IconTag: {
    position: "relative",
    height: 149,
    borderRadius: 6,
  },
  Tag: {
    position: "absolute",
    top: 7,
    right: 7,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(51, 51, 51, 0.9)",
    color: "rgba(51, 51, 51, 0.9)",
    fontSize: 10,
  },
  Icon: {
    position: "absolute",
    width: 50,
    height: 50,
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
    objectFit: "cover",
  },
  Title: {
    height: 35,
    fontFamily: "Inter",
    fontSize: 12,
    color: "#000000",
    paddingHorizontal: 8,
  },
  PriceCount: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  Price: {
    flex: 1,
    fontSize: 10,
    fontWeight: 500,
    color: "#DB7E13",
  },
  Count: {
    fontSize: 10,
    fontWeight: 500,
    color: "#6562A9",
  },
});

export default ProductContentItem;
