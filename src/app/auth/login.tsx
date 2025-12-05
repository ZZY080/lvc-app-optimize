import { fetcher } from "@api/request";
import { LOGIN } from "@constants/url/url";
import { login } from "@redux/slices/authSlice";
import { emailFormatCheck } from "@utils/email/email";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, Eye, EyeOff } from "lucide-react-native";
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
import { useDispatch } from "react-redux";
const LoginScreen = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const dispatch = useDispatch();
  const emailRef = useRef<TextInput | null>(null);
  const pwdRef = useRef<TextInput | null>(null);
  const { t, i18n } = useTranslation();

  const handleBack = () => {
    router.back();
  };
  const handleFocus = (ref: React.RefObject<TextInput | null>) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const handleLogin = async () => {
    if (email.trim() === "") {
      return Toast.show({
        type: "error",
        text1: t("error:email-can-not-be-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    if (!emailFormatCheck(email.trim())) {
      return Toast.show({
        type: "error",
        text1: t("error:email-format-is-not-correct"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    if (pwd.trim() === "") {
      return Toast.show({
        type: "error",
        text1: t("error:password-can-not-be-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    try {
      const response = await fetcher(LOGIN, {
        method: "POST",
        body: {
          email: email,
          password: pwd,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        return Toast.show({
          type: "error",
          text1: t("error:email-password-incorrect"),
          position: "top",
          visibilityTime: 2500,
        });
      }
      const payload = json.payload;
      const accessToken = payload.accessToken;
      const registerToken = payload.token;
      if (accessToken) {
        // 触发login
        dispatch(login(payload));
        router.replace("/"); // 直接跳转到首页，并清空当前页面栈
      }
      if (registerToken) {
        router.push({
          pathname: "/common/active-account",
          params: {
            registerToken,
            from: "login",
          },
        });
      }
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
        </Pressable>
        {/* 卡片部分 */}
        <View style={styles.CardWrapper}>
          <View style={styles.CardMain}>
            <Text style={styles.Title}>{t("login:login")}</Text>
            {/* 邮箱 */}
            <Pressable
              style={styles.FieldContainer}
              onPress={() => handleFocus(emailRef)}
            >
              <Text style={styles.FieldText}>{t("login:email")}</Text>
              <TextInput
                ref={emailRef}
                autoComplete="off" // 禁用自动完成功能
                autoCorrect={false} // 禁用自动纠正
                maxLength={30}
                placeholder={t("login:email-placeholder")}
                onChangeText={setEmail}
                style={{
                  fontSize: 10,
                  padding: 0,
                }}
              />
            </Pressable>
            {/* 密码 */}
            <Pressable
              style={styles.FieldContainer}
              onPress={() => handleFocus(pwdRef)}
            >
              <Text style={styles.FieldText}>{t("login:password")}</Text>
              <View style={styles.FieldIcon}>
                <TextInput
                  ref={pwdRef}
                  autoComplete="off" // 禁用自动完成功能
                  autoCorrect={false} // 禁用自动纠正
                  secureTextEntry={!isShow}
                  maxLength={19}
                  placeholder={t("login:password-placeholder")}
                  onChangeText={setPwd}
                  style={{
                    flex: 1,
                    fontSize: 10,
                    padding: 0,
                  }}
                />
                <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                  {isShow ? (
                    <Eye size={20} color={"gray"} />
                  ) : (
                    <EyeOff size={20} color={"gray"} />
                  )}
                </TouchableOpacity>
              </View>
            </Pressable>
            {/* 忘记密码 */}
            <View style={styles.CheckboxForget}>
              <TouchableOpacity
                onPress={() => router.push("/auth/forget-password")}
              >
                <Text style={{ fontSize: 13, color: "#bdbdbf" }}>
                  {t("login:forget-password")}
                </Text>
              </TouchableOpacity>
            </View>
            {/* 登录按钮 */}
            <View style={styles.Login}>
              <Button
                title={t("login:login")}
                color="#6562a9"
                onPress={() => handleLogin()}
              />
            </View>
            <View style={styles.LineWord}>
              <View style={styles.Line}></View>
              <Text style={styles.Word}>{t("login:or")}</Text>
              <View style={styles.Line}></View>
            </View>
            {/* 注册 */}
            <TouchableOpacity
              style={styles.Register}
              onPress={() => router.push("/auth/register")}
            >
              <Text>{t("login:have-account")}?</Text>
              <Text style={{ marginLeft: 10, color: "#6562a9" }}>
                {t("login:register")}
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
    // height: 50,
    marginBottom: 10,
    paddingVertical: 5,
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
  Icon: {
    width: 16,
    height: 16,
    objectFit: "cover",
  },
  // 记住
  CheckboxForget: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  CheckBox: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#d0d0d0",
    width: 15,
    height: 15,
    borderRadius: 5,
  },
  Login: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  LineWord: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e6e6e6",
  },
  Word: {
    marginHorizontal: 10,
    fontSize: 10,
    color: "#e6e6e6",
  },
  Register: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default LoginScreen;
