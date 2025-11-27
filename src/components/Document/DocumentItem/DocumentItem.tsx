import { themes } from "@themes/themes";
import { Document } from "@type/common/Document/Document.types";
import { router } from "expo-router";
import { FileBox } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface DocumentItemProps {
  document: Document;
}
const DocumentItem: React.FC<DocumentItemProps> = ({ document }) => {
  const { t } = useTranslation();
  const handleDetail = () => {
    router.push(`/document/${document.product.slug}`);
  };
  return (
    <Pressable
      onPress={() => handleDetail()}
      style={styles.DocumentItemWrapper}
    >
      <View style={styles.DocumentItemMain}>
        <FileBox size={30} strokeWidth={0.6} color={themes.color.themeColor} />
        <View style={styles.Info}>
          {/* 标题 */}
          <Text style={styles.Title} numberOfLines={1} ellipsizeMode="tail">
            {document.product.title}
          </Text>
          <Text style={styles.Desc} numberOfLines={3} ellipsizeMode="tail">
            {document.product.memberProfiles[0]?.name}
          </Text>
          <View style={styles.Divide}></View>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  DocumentItemWrapper: {
    marginTop: 6,
  },
  DocumentItemMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
  },

  Info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 15,
  },
  Title: {
    fontSize: 14,
    fontWeight: 400,
    color: "#3F3F46",
  },
  Desc: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 300,
    color: "#71717A",
  },
  Divide: {
    marginTop: 20,
    width: "100%",
    height: 1,
    borderRadius: 1,
    backgroundColor: "#11111126",
  },
});
export default DocumentItem;
