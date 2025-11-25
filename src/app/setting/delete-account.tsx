import { fetcher } from "@api/request";
import {
  ACCESS_TOKEN_EXPIRE_STATUS_CODE,
  DELETE_ACCOUNT,
} from "@constants/url/url";
import { logout } from "@redux/slices/authSlice";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const DeleteAccountScreen = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleBack = () => {
    router.back();
  };
  // 更新用户信息
  const handleDelete = async () => {
    try {
      const response = await fetcher(`${DELETE_ACCOUNT}`, {
        method: "DELETE",
      });
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return router.replace("/auth/login");
      }
      if (response.ok) {
        dispatch(logout());
        return router.replace("/auth/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const handleAlert = () => {
    Alert.alert("", t("delete-account:alert-desc"), [
      {
        text: t("delete-account:alert-cancel"),
        style: "cancel",
      },
      {
        text: t("delete-account:alert-confirm"),
        style: "destructive",
        onPress: async () => {
          // TODO: 调用后端删除用户接口
          await handleDelete();
        },
      },
    ]);
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
            {t("common:settings")}
          </Text>
        </Pressable>
        {/* 主体 */}
        <View style={styles.ScrollWrapper}>
          <View style={styles.ScrollMain}>
            <Pressable style={styles.DeleteButton} onPress={handleAlert}>
              <Text style={styles.DeleteText}>
                {t("delete-account:delete-account")}
              </Text>
            </Pressable>
          </View>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  DeleteButton: {},
  DeleteText: {
    backgroundColor: "#EF4444", // 红色危险操作
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DeleteAccountScreen;
