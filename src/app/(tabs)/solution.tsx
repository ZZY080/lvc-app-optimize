import { fetcher } from "@api/request";
import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import { TOPIC } from "@constants/url/url";
import { themes } from "@themes/themes";
import { Solution } from "@type/common/Solution/Solution.types";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const SolutionScreen = () => {
  const { t } = useTranslation();
  const [q, setQ] = useState<string>("");
  const [solutionList, setSolutionList] = useState<Solution[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onChangeText = (text: string) => {
    setQ(text);
  };
  // 跳转到搜索
  const handleSearch = () => {
    router.push("/search");
  };
  // 获取课程
  const getSolutionList = async () => {
    setLoading(true);
    try {
      const response = await fetcher(`${TOPIC}?page=${1}&perPage=${4}`, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        const items = json.payload;
        setSolutionList(items);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSolutionList();
  }, []);
  return (
    <SafeAreaView style={styles.Container} edges={["top"]}>
      <View
        style={{
          ...styles.Content,
        }}
      >
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="dark" />
        {/* 返回和搜索 */}
        <Pressable style={styles.SearchWrapper} onPress={() => handleSearch()}>
          <View style={styles.SearchMain}>
            <Search color={"#A1A1AA"} size={20} strokeWidth={0.8} />
            {/* <TextInput
              style={styles.Slug}
              placeholder={t("solution:solution")}
              onChangeText={(text) => onChangeText(text)}
            /> */}
            <Text style={styles.Slug}>{t("solution:solution")}</Text>
            <Text style={styles.Search}>{t("search:search")}</Text>
          </View>
        </Pressable>

        {loading ? (
          <Loading />
        ) : solutionList.length === 0 ? (
          <Empty /> // 解决方案
        ) : (
          <ScrollView
            style={styles.SolutionWrapper}
            showsVerticalScrollIndicator={false}
            overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
            bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
          >
            {/* 解决方案 */}
            <View style={styles.SolutionMain}>
              {solutionList.map((item) => {
                return (
                  <Pressable
                    style={styles.ItemWrapper}
                    key={item.id}
                    onPress={() =>
                      router.push(
                        `/solution/${item.id}/?q=${q}&topicId=${item.id}&slug=${item.slug}`
                      )
                    }
                  >
                    <View style={styles.ItemMain}>
                      <Text style={styles.Title}>{item.title}</Text>
                      <Text style={styles.Desc}>{item.description}</Text>
                      <View style={styles.Divide}></View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        )}
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
  SearchWrapper: {
    backgroundColor: themes.color.white,
    paddingHorizontal: 10,
  },
  SearchMain: {
    height: 40,
    backgroundColor: "#F4F4F5",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  Slug: {
    marginLeft: 6,
    flex: 1,
    color: "#71717A",
    fontSize: 12,
  },
  Search: {
    backgroundColor: "#6562A933",
    fontSize: 10,
    color: "#6562A9",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  // 解决方案
  SolutionWrapper: {
    flex: 1,
    paddingTop: 6,
  },
  SolutionMain: {
    paddingBottom: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
  },
  ItemWrapper: {
    paddingVertical: 12,
    paddingLeft: 15,
    paddingRight: 12,
  },
  ItemMain: {},
  Title: {
    fontWeight: 400,
    fontSize: 13,
    color: "#3F3F46",
  },
  Desc: {
    marginTop: 10,
    fontSize: 12,
    color: "#A1A1AA",
  },
  Divide: {
    marginTop: 30,
    borderBottomWidth: 0.4,
    borderColor: "#11111126",
  },
});
export default SolutionScreen;
