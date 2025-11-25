import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, Text, View } from "react-native";
interface EmptyProps {
  desc?: string;
}
const Empty: React.FC<EmptyProps> = ({ desc = "暂无数据" }) => {
  // 获取屏幕宽度
  const windowWidth = Dimensions.get("window").width;
  const { t } = useTranslation();
  return (
    <View style={styles.EmptyWrapper}>
      <View style={styles.EmptyMain}>
        <LottieView
          source={require("@assets/common/empty.json")}
          style={{ width: windowWidth * 0.6, height: windowWidth * 0.6 }}
        />
        <Text style={styles.Desc}>{t("common:empty")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyWrapper: {
    flex: 1,
  },
  EmptyMain: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  Desc: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    fontWeight: 600,
    color: "black",
  },
});

export default Empty;
