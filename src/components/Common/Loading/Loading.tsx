import { ActivityIndicator, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
const Loading = () => {
  return (
    <View style={styles.LoadingWrapper}>
      <View style={styles.LoadingMain}>
        {/* <LottieView
          source={require("@assets/common/loading.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        /> */}
        <ActivityIndicator size={"large"} color={"#6D73B7"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  LoadingWrapper: {
    flex: 1,
  },
  LoadingMain: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Loading;
