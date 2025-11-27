import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

interface SectionHeaderProps {
  title?: string;
  marginTop?: number;
  paddingHorizontal?: number;
  path?: any;
  hasBar?: boolean;
  hasMore?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title = "",
  marginTop = 25,
  path = "",
  hasBar = false,
  hasMore = false,
  paddingHorizontal = 17,
}) => {
  const { t } = useTranslation();
  const handleDetail = () => {
    if (path === "") {
      return Alert.alert("暂无详情");
    }
    router.push(path);
  };
  return (
    <Pressable
      style={{
        ...styles.SectionHeaderWrapper,
        marginTop: marginTop,
        paddingHorizontal,
      }}
    >
      <View style={styles.SectionHeaderMain}>
        {/* Bar 和 标题 */}
        <View style={styles.BarTitle}>
          {hasBar ? <View style={styles.Bar}></View> : null}
          <Text style={styles.Title}>{title}</Text>
        </View>
        {/* 更多 */}
        {hasMore && (
          <Pressable onPress={() => handleDetail()} style={styles.MoreIcon}>
            <Text style={styles.More}>{t("product:more")}</Text>
            <ChevronRight color={"gray"} size={15} strokeWidth={1} />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // 通用的头部
  SectionHeaderWrapper: {},
  SectionHeaderMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  BarTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Bar: {
    width: 4,
    height: 20,
    backgroundColor: "#6D73B7",
    marginRight: 5,
  },

  Title: {
    fontSize: 16,
    fontWeight: 300,
    color: "#3F3F46",
  },
  MoreIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  More: {
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0,
    color: "#71717A",
    marginRight: 4,
  },
  Icon: {
    width: 16,
    height: 16,
    objectFit: "cover",
  },
});

export default SectionHeader;
