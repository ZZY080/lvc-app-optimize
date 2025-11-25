import { fetcher } from "@api/request";
import { USER_PROFILE } from "@constants/url/url";
import { logout } from "@redux/slices/authSlice";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
interface OperateItemProps {
  id: string;
  type: string;
  text: string;
  path: any;
}
const OperateItem: React.FC<OperateItemProps> = ({ text, path }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
  const handleDetail = async (path: any) => {
    if (path === "/auth/login") {
      dispatch(logout());
      router.back();
      return;
    }
    if (path === "/setting/password" || path === "/setting/delete-account") {
      const userProfile = await getUserProfile();
      if (!userProfile) {
        return router.push("/auth/login");
      }
    }
    router.push(path);
  };
  return (
    <Pressable style={styles.OperateItem} onPress={() => handleDetail(path)}>
      <Text style={styles.Text}>{text}</Text>
      <ChevronRight size={30} color={"#71717A"} strokeWidth={0.8} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  OperateItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Text: {
    flex: 1,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 400,
    color: "#3F3F46",
  },
});
export default OperateItem;
