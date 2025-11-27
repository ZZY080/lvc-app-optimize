import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootState } from "@redux/store";
import { useSelector } from "react-redux";

import { themes } from "@themes/themes";
import { Solution } from "@type/common/Solution/Solution.types";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ChevronLeft, Trash2 } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
const SearchScreen = () => {
  const lang = useSelector((state: RootState) => state.language.lang);
  const { t } = useTranslation();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [q, setQ] = useState<string>("");
  const [searchHistoryList, setSearchHistoryList] = useState<string[]>(
    JSON.parse(SecureStore.getItem("history") || "[]")
  );
  const [solutionList, setSolutionList] = useState<Solution[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onChangeText = (text: string) => {
    setQ(text);
  };
  const handleSearchDetail = () => {
    if (q.trim() === "") {
      return Toast.show({
        type: "error",
        text1: t("error:search-can-not-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    router.push(`/search/${q}`);
    setSearchHistoryList((prevData) => {
      SecureStore.setItem("history", JSON.stringify([...prevData, q]));
      return [...prevData, q];
    });
  };

  const handleDelete = () => {
    setSearchHistoryList((prevData) => {
      SecureStore.setItem("history", JSON.stringify([]));
      return [];
    });
  };
  const handleHistoryDetail = (myQ: string) => {
    setQ(myQ);
    router.push(`/search/${myQ}`);
  };

  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      <View
        style={{
          ...styles.Content,
        }}
      >
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} />
        {/* 返回和搜索 */}
        <View style={styles.NavigationBackSearchWrapper}>
          <View style={styles.NavigationBackSearchMain}>
            <TouchableOpacity style={styles.Icon} onPress={() => router.back()}>
              {/* <CustomIcon name="icon-back" color={"white"} size={19} /> */}
              <ChevronLeft />
            </TouchableOpacity>
            <View style={styles.SlugSearch}>
              <TextInput
                value={q}
                style={styles.Slug}
                placeholder={t("search:search")}
                onChangeText={(text) => onChangeText(text)}
              />
              <Text style={styles.Search} onPress={() => handleSearchDetail()}>
                {t("search:search")}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.ScrollWrapper}
          showsVerticalScrollIndicator={false}
          overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
          bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
        >
          {/* 解决方案 */}
          <View style={styles.ScrollMain}>
            {/* 搜索历史 */}
            <View style={styles.HistoryHeaderWrapper}>
              <View style={styles.HistoryHeaderMain}>
                <Text style={{ fontWeight: 800 }}>
                  {t("search:search-history")}
                </Text>
                <Trash2
                  color={"gray"}
                  size={20}
                  strokeWidth={0.8}
                  onPress={() => handleDelete()}
                />
              </View>
            </View>
            {/* 历史列表 */}
            <View style={styles.HisotryListWrapper}>
              <View style={styles.HisotryListMain}>
                {searchHistoryList.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={{
                        backgroundColor: "#E6E5FA",
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 8,
                        fontSize: 10,
                        color: "#6562A9",
                      }}
                      onPress={() => handleHistoryDetail(item)}
                    >
                      {item}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
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
    display: "flex",
    backgroundColor: "#ffffff",
  },
  // 返回和搜索框
  NavigationBackSearchWrapper: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  NavigationBackSearchMain: {
    display: "flex",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
  },
  Icon: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    padding: 6,
    marginRight: 10,
  },
  SlugSearch: {
    height: 36,
    flex: 1,
    backgroundColor: "#F4F4F5",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingRight: 4,
  },
  Slug: {
    flex: 1,
    height: "100%",
    fontSize: 12,
  },
  Search: {
    backgroundColor: themes.color.themeColor,
    fontSize: 10,
    color: themes.color.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  // 解决方案
  ScrollWrapper: {
    flex: 1,
    paddingTop: 10,
  },
  ScrollMain: {
    paddingBottom: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
  },
  HistoryHeaderWrapper: {
    paddingHorizontal: 10,
  },
  HistoryHeaderMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  HisotryListWrapper: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  HisotryListMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: 10,
    rowGap: 10,
  },
});
export default SearchScreen;
