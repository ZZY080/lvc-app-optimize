import { themes } from "@themes/themes";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, ShieldCheck } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReviewScreen = () => {
  const { t } = useTranslation();
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="dark" />
        {/* 返回 */}
        <View style={styles.NavigateAction}>
          <Pressable onPress={() => handleBack()} style={styles.Navigate}>
            <ChevronLeft color={"#27272A"} size={20} />
            <Text style={{ fontSize: 14, fontWeight: 400 }}>
              {t("common:home")}
            </Text>
          </Pressable>
        </View>
        <View style={styles.ScrollWrapper}>
          <View style={styles.ScrollMain}>
            <ShieldCheck
              color={themes.color.themeColor}
              size={100}
              strokeWidth={0.6}
            />
            <Text style={styles.Desc}>注册信息处于审核中</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  Content: {
    flex: 1,
  },
  NavigateAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 40,
  },
  Navigate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  Action: {
    fontSize: 14,
    color: "#006FEE",
  },
  ScrollWrapper: {
    flex: 1,
  },
  ScrollMain: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Desc: {
    color: themes.color.themeColor,
    marginTop: 10,
  },
});

export default ReviewScreen;
