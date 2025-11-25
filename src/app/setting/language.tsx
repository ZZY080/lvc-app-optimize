import Header from "@components/Language/Header/Header";
import LanguageItem from "@components/Language/LanguageItem/LanguageItem";
import { RootState } from "@redux/store";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
const LanguageScreen = () => {
  const { t, i18n } = useTranslation();

  const [languageIndex, setLanguageIndex] = useState<number>(
    useSelector((state: RootState) => state.language.languageIndex)
  );
  const [languageList, setLanguageList] = useState<
    {
      id: string;
      lang: string;
      text: string;
    }[]
  >([
    {
      id: "0",
      lang: "en",
      text: t("language:english"),
    },
    {
      id: "1",
      lang: "cn",
      text: t("language:chinese"),
    },
  ]);

  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      {/* 屏幕滚动 */}
      <ScrollView style={styles.Content} showsVerticalScrollIndicator={false}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="dark" />
        {/* 头部 */}
        <Header
          languageIndex={languageIndex}
          {...languageList[languageIndex]}
        />
        {/* 语言列表 */}
        <View style={styles.LanguageListWrapper}>
          <View style={styles.LanguageListMain}>
            {languageList.map((item, index) => {
              return (
                <LanguageItem
                  key={item.id}
                  {...item}
                  index={index}
                  languageIndex={languageIndex}
                  setLanguageIndex={setLanguageIndex}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#f2f3f5",
  },
  Content: {
    flex: 1,
  },
  LanguageListWrapper: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  LanguageListMain: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
});

export default LanguageScreen;
