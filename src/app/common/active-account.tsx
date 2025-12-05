import { fetcher } from "@api/request";
import { ACTIVE_ACCOUNT } from "@constants/url/url";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
const ActiveAccountScreen = () => {
  const [code, setCode] = useState<string>("");
  const { registerToken, from } = useLocalSearchParams() ?? {}; // 解构你传过来的参数

  const { t, i18n } = useTranslation();

  const verifyCodeRef = useRef<TextInput | null>(null);

  const handleBack = () => {
    router.back();
  };
  const handleFocus = (ref: React.RefObject<TextInput | null>) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleActive = async () => {
    if (code.trim() === "") {
      return Toast.show({
        type: "error",
        text1: t("error:code-can-not-be-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    try {
      const response = await fetcher(ACTIVE_ACCOUNT, {
        method: "POST",
        body: {
          code: code,
          token: registerToken,
        },
      });
      if (!response.ok) {
        return Toast.show({
          type: "error",
          text1: t("error:code-is-not-correct"),
          position: "top",
          visibilityTime: 2500,
        });
      }
      router.push({
        pathname: "/auth/login",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.Container} edges={["top", "bottom"]}>
      <Pressable style={styles.Content} onPress={() => Keyboard.dismiss()}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="light" />
        <Pressable onPress={() => handleBack()} style={styles.Navigate}>
          <ChevronLeft color={"#27272A"} size={20} />
          {/* <Text style={{ fontSize: 14, fontWeight: 400 }}>
            {t("active-account:register")}
          </Text> */}
        </Pressable>
        {/* 卡片部分 */}
        <View style={styles.CardWrapper}>
          <View style={styles.CardMain}>
            <Text style={styles.Title}>{t("active-account:title")}</Text>
            {/* 昵称 */}
            <Pressable
              style={styles.FieldContainer}
              onPress={() => handleFocus(verifyCodeRef)}
            >
              <TextInput
                ref={verifyCodeRef}
                autoComplete="off" // 禁用自动完成功能
                autoCorrect={false} // 禁用自动纠正
                maxLength={30}
                placeholder={t("active-account:verify-code")}
                onChangeText={setCode}
                style={{
                  fontSize: 10,
                  padding: 0,
                }}
              />
            </Pressable>

            {/* 确认按钮 */}
            <View style={styles.Verify}>
              <Button
                title={t("active-account:verify")}
                color="#6562a9"
                onPress={() => handleActive()}
              />
            </View>
            {/* 注册 */}
            <TouchableOpacity
              style={styles.Resend}
              onPress={() => router.push({ pathname: "/auth/login" })}
            >
              <Text>{t("active-account:not-receive")}?</Text>
              <Text style={{ marginLeft: 10, color: "#6562a9" }}>
                {t("active-account:resend")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  Content: {
    position: "relative",
    flex: 1,
  },
  Navigate: {
    marginTop: 10,
    height: 24,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  CardWrapper: {
    width: "95%",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      {
        translateX: "-50%",
      },
      {
        translateY: "-50%",
      },
    ],
    zIndex: 2,
  },
  CardMain: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  Title: {
    fontWeight: 800,
    fontSize: 20,
    marginBottom: 20,
  },
  FieldContainer: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e6e6e6",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  FieldText: {
    fontSize: 8,
    color: "#cacaca",
    marginBottom: 5,
  },
  FieldIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Verify: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  Resend: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default ActiveAccountScreen;
