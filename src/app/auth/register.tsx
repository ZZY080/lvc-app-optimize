import { fetcher } from "@api/request";
import { REGISTER } from "@constants/url/url";
import { useNavigation } from "@react-navigation/native";
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
const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const { t, i18n } = useTranslation();
  const emailRef = useRef<TextInput | null>(null);
  const pwdRef = useRef<TextInput | null>(null);
  const confirmPwdRef = useRef<TextInput>(null);
  const handleBack = () => {
    navigation.goBack();
  };
  const handleFocus = (ref: React.RefObject<TextInput | null>) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleConfirm = async () => {
    if (name.trim() === "") {
      return Toast.show({
        type: "error",
        text1: t("error:name-can-not-be-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
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
    if (confirmPwd.trim() === "") {
      return Toast.show({
        type: "error",
        text1: t("error:confirm-password-can-not-be-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    if (pwd !== confirmPwd) {
      return Toast.show({
        type: "error",
        text1: t("error:password-do-not-match"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    try {
      const response = await fetcher(REGISTER, {
        method: "POST",
        body: {
          name,
          email,
          password: pwd,
        },
      });
      if (!response.ok) {
        return Toast.show({
          type: "error",
          text1: t("error:email-exist"),
          position: "top",
          visibilityTime: 2500,
        });
      }
      const json = await response.json();
      const registerToken = json.payload.token;
      if (registerToken) {
        navigation.navigate("ActiveAccount", {
          registerToken,
          from: "register",
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
          <Text style={{ fontSize: 14, fontWeight: 400 }}>
            {t("register:login")}
          </Text>
        </Pressable>
        {/* 卡片部分 */}
        <View style={styles.CardWrapper}>
          <View style={styles.CardMain}>
            <Text style={styles.Title}>{t("register:register")}</Text>
            {/* 昵称 */}
            <Pressable
              style={styles.FieldContainer}
              onPress={() => handleFocus(emailRef)}
            >
              <Text style={styles.FieldText}>{t("register:name")}</Text>
              <TextInput
                ref={emailRef}
                autoComplete="off" // 禁用自动完成功能
                autoCorrect={false} // 禁用自动纠正
                maxLength={30}
                placeholder={t("register:name-placeholder")}
                onChangeText={setName}
                style={{
                  fontSize: 10,
                  padding: 0,
                }}
              />
            </Pressable>
            {/* 邮箱 */}
            <Pressable
              style={styles.FieldContainer}
              onPress={() => handleFocus(emailRef)}
            >
              <Text style={styles.FieldText}>{t("register:email")}</Text>
              <TextInput
                ref={emailRef}
                autoComplete="off" // 禁用自动完成功能
                autoCorrect={false} // 禁用自动纠正
                maxLength={30}
                placeholder={t("register:email-placeholder")}
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
              <Text style={styles.FieldText}>{t("register:password")}</Text>
              <View style={styles.FieldIcon}>
                <TextInput
                  ref={pwdRef}
                  autoComplete="off" // 禁用自动完成功能
                  autoCorrect={false} // 禁用自动纠正
                  secureTextEntry={!isShow}
                  maxLength={19}
                  placeholder={t("register:password-placeholder")}
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
            {/* 确认密码 */}
            <Pressable
              style={styles.FieldContainer}
              onPress={() => handleFocus(confirmPwdRef)}
            >
              <Text style={styles.FieldText}>
                {t("register:confirm-password")}
              </Text>
              <View style={styles.FieldIcon}>
                <TextInput
                  ref={confirmPwdRef}
                  autoComplete="off" // 禁用自动完成功能
                  autoCorrect={false} // 禁用自动纠正
                  secureTextEntry={!isShow}
                  maxLength={19}
                  placeholder={t("register:confirm-password-placeholder")}
                  onChangeText={setConfirmPwd}
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
            {/* 确认按钮 */}
            <View style={styles.Confirm}>
              <Button
                title={t("register:confirm")}
                color="#6562a9"
                onPress={() => handleConfirm()}
              />
            </View>
            {/* 注册 */}
            <TouchableOpacity
              style={styles.SignIn}
              onPress={() => router.back()}
            >
              <Text>{t("register:have-singned-up")}?</Text>
              <Text style={{ marginLeft: 10, color: "#6562a9" }}>
                {t("register:sign-in-now")}
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
  VerifyCode: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  // 获取验证码的字体
  Text: {
    fontSize: 10,
    color: "white",
  },
  Confirm: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  SignIn: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default RegisterScreen;
