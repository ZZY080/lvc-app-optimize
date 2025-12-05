import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "../CustomIcon/CustomIcon";

interface NavigateBackProps {
  title?: string;
  backgroundColor?: string;
  marginTop?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  color?: string;
  size?: number;
}
const NavigateBack: React.FC<NavigateBackProps> = ({
  title = "",
  backgroundColor = "#FFFFFF",
  marginTop = 0,
  paddingVertical = 15,
  paddingHorizontal = 10,
  color = "white",
  size = 15,
}) => {
  return (
    <View
      style={{
        ...styles.NavigateBackWrapper,
        marginTop,
        paddingHorizontal,
        paddingVertical,
        backgroundColor,
      }}
    >
      <View style={styles.NavigateBackMain}>
        <TouchableOpacity style={styles.Icon} onPress={() => router.back()}>
          <CustomIcon name="icon-back" color={color} size={size} />
        </TouchableOpacity>
        <Text style={styles.Title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  NavigateBackWrapper: {
    borderBottomWidth: 0.4,
    borderBottomColor: "#e5e5e5",
    // marginBottom: 5,
  },
  NavigateBackMain: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Icon: {
    position: "absolute",
    left: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  Title: {
    paddingHorizontal: 80,
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 800,
  },
});

export default NavigateBack;
