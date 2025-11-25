import { fetcher } from "@api/request";
import { USER_PROFILE } from "@constants/url/url";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
interface MenuItemProps {
  menuItem: {
    id: string;
    icon: React.ReactNode;
    text: string;
    path: any;
  };
}
const MenuItem: React.FC<MenuItemProps> = ({ menuItem }) => {
  // 获取用户信息
  const getUserProfile = async () => {
    try {
      const response = await fetcher(`${USER_PROFILE}`);
      if (response.ok) {
        const json = await response.json();
        const payload = json.payload;
        return payload;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const handleDetail = async () => {
    const userProfile = await getUserProfile();
    if (!userProfile) {
      return router.push("/auth/login");
    }
    router.push(menuItem.path);
  };
  return (
    <TouchableOpacity style={styles.MenuItem} onPress={() => handleDetail()}>
      {menuItem.icon}
      <Text style={styles.Text}>{menuItem.text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  MenuItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    marginTop: 4,
    fontFamily: "Inter",
    fontSize: 12,
    color: "#52525B",
  },
});

export default MenuItem;
