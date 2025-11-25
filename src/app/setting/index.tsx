import OperateItem from "@components/My/OperateItem/OperateItem";

import { router } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingScreen = () => {
  const { t, i18n } = useTranslation();
  const [operateList, setOperateList] = useState<
    {
      id: string;
      type: string;
      text: string;
      path: any;
    }[]
  >([
    {
      id: "1",
      type: "",
      text: t("my:modify-password"),
      path: "/setting/password",
    },

    {
      id: "2",
      type: "",
      text: t("my:language-setting"),
      path: "/setting/language",
    },
    {
      id: "3",
      type: "",
      text: t("my:logout"),
      path: "/auth/login",
    },
    {
      id: "4",
      type: "",
      text: t("my:delete-account"),
      path: "/setting/delete-account",
    },
  ]);
  const handleBack = () => {
    router.back();
  };
  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar style="dark" />
        {/* 返回和搜索 */}
        <Pressable onPress={() => handleBack()} style={styles.Navigate}>
          <ChevronLeft color={"#27272A"} size={20} />
          <Text style={{ fontSize: 14, fontWeight: 400 }}>
            {t("common:profile")}
          </Text>
        </Pressable>
        <View style={styles.ScrollWrapper}>
          <ScrollView
            style={styles.ScrollMain}
            showsVerticalScrollIndicator={false}
            overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
            bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
          >
            {/* 动作列表 */}
            <View style={styles.OperateWrapper}>
              <View style={styles.OperateMain}>
                {operateList.map((item) => {
                  return <OperateItem key={item.id} {...item} />;
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  Content: {
    flexGrow: 1,
  },
  Navigate: {
    marginTop: 10,
    height: 24,
    paddingHorizontal: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  ScrollWrapper: {
    flex: 1,
  },
  ScrollMain: {
    flex: 1,
  },
  // 动作列表
  OperateWrapper: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  OperateMain: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    rowGap: 30,
  },
});
export default SettingScreen;
