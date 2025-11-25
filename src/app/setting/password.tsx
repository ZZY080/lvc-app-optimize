import { fetcher } from "@api/request";
import Loading from "@components/Common/Loading/Loading";
import {
  ACCESS_TOKEN_EXPIRE_STATUS_CODE,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
} from "@constants/url/url";
import { RootState } from "@redux/store";
import { themes } from "@themes/themes";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Asterisk, ChevronLeft } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

const ChangePasswordScreen = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [userInfo, setUserInfo] = useState<{
    token: string;
    code: string;
    password: string;
    repassword: string;
  }>({
    token: "",
    code: "",
    password: "",
    repassword: "",
  });

  useFocusEffect(
    useCallback(() => {
      // 页面进入时
      if (!accessToken) {
        router.replace("/auth/login"); // expo-router 使用路径而不是 screen 名称
      }

      return () => {
        // 页面离开时（blur）
        // 这里可以做清理操作
      };
    }, [accessToken, router])
  );
  useEffect(() => {
    let timer: any;
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown, isCounting]);
  const handleBack = () => {
    router.back();
  };
  // 更新用户信息
  const updateUserInfoData = async () => {
    console.log("sas");
    if (userInfo.code.trim() === "") {
      return Toast.show({
        type: "error",
        text1: t("error:code-can-not-be-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    if (userInfo.password.trim() === "") {
      return Toast.show({
        type: "error",
        text1: t("error:password-can-not-be-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    if (userInfo.repassword.trim() === "") {
      return Toast.show({
        type: "error",
        text1: t("error:confirm-password-can-not-be-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    if (userInfo.password !== userInfo.repassword) {
      return Toast.show({
        type: "error",
        text1: t("error:password-do-not-match"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    try {
      const response = await fetcher(`${RESET_PASSWORD}`, {
        method: "POST",
        body: {
          code: userInfo.code,
          token: userInfo.token,
          password: userInfo.password,
        },
      });
      console.log(response);
      if (response.status === 400) {
        return Toast.show({
          type: "error",
          text1: t("error:code-is-not-correct"),
          position: "top",
          visibilityTime: 2500,
        });
      }
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return router.replace("/auth/login");
      }
      if (response.ok) {
        const json = await response.json();
        const { type } = json;
        if (type === "SUCCESS") {
          router.back();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleGetCode = async () => {
    try {
      const response = await fetcher(`${UPDATE_PASSWORD}`, {
        method: "Get",
      });

      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return router.replace("/auth/login");
      }
      if (response.ok) {
        const json = await response.json();
        const payload = json.payload;
        setUserInfo((preData: any) => {
          return {
            ...preData,
            token: payload.token,
          };
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
    setCountdown(60);
    setIsCounting(true);
  };
  const onChangeCode = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, ""); // 限制最多6位
    setUserInfo((preData) => {
      return {
        ...preData,
        code: numericValue,
      };
    });
  };
  const onChangePassword = (value: string) => {
    setUserInfo((preData) => {
      return {
        ...preData,
        password: value,
      };
    });
  };
  const onChangeRepassword = (value: string) => {
    setUserInfo((preData) => {
      return {
        ...preData,
        repassword: value,
      };
    });
  };
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="dark" />
        <View style={styles.NavigateSave}>
          <Pressable onPress={() => handleBack()} style={styles.Navigate}>
            <ChevronLeft color={"#27272A"} size={20} />
            <Text style={{ fontSize: 14, fontWeight: 400 }}>
              {t("common:settings")}
            </Text>
          </Pressable>
          <Text style={styles.Save} onPress={() => updateUserInfoData()}>
            {t("common:save")}
          </Text>
        </View>
        <Text style={styles.Title}>{t("user:change-password")}</Text>
        <Text style={styles.Warning}>{t("user:change-password-warning")}</Text>
        {/* 内容 */}
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            style={styles.ScrollWrapper}
            showsVerticalScrollIndicator={false}
            overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
            bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
          >
            <View style={styles.ScrollMain}>
              <View style={styles.Info}>
                <View style={styles.FieldWrapper}>
                  <View style={styles.FieldMain}>
                    <View style={styles.KeyValue}>
                      <View style={styles.Key}>
                        <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 14,
                            color: "#A1A1AA",
                          }}
                        >
                          {t("user:email-code")}
                        </Text>
                        <Asterisk size={14} color={"#C20E4D"} />
                      </View>
                      <View
                        style={{
                          ...styles.Value,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextInput
                          maxLength={6}
                          value={userInfo.code}
                          keyboardType="numeric"
                          onChangeText={(value) => onChangeCode(value)}
                          style={{ flex: 1 }}
                          placeholder={t("user:email-code")}
                        />
                        <TouchableOpacity
                          onPress={handleGetCode}
                          disabled={isCounting}
                          activeOpacity={isCounting ? 1 : 0.7}
                        >
                          <Text
                            style={{
                              backgroundColor: isCounting
                                ? "#CCCCCC"
                                : themes.color.themeColor,
                              color: themes.color.white,
                              borderRadius: 10,
                              fontSize: 10,
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                            }}
                          >
                            {isCounting
                              ? `${countdown} ${t("user:code-warning")}`
                              : `${t("user:send-code")}`}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={styles.FieldMain}>
                    <View style={styles.KeyValue}>
                      <View style={styles.Key}>
                        <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 14,
                            color: "#A1A1AA",
                          }}
                        >
                          {t("user:new-password")}
                        </Text>
                        <Asterisk size={14} color={"#C20E4D"} />
                      </View>
                      <TextInput
                        value={userInfo.password}
                        onChangeText={(value) => onChangePassword(value)}
                        style={styles.Value}
                        placeholder={t("user:new-password")}
                      />
                    </View>
                  </View>

                  <View style={styles.FieldMain}>
                    <View style={styles.KeyValue}>
                      <View style={styles.Key}>
                        <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 14,
                            color: "#A1A1AA",
                          }}
                        >
                          {t("user:re-new-password")}
                        </Text>
                        <Asterisk size={14} color={"#C20E4D"} />
                      </View>

                      <TextInput
                        value={userInfo.repassword}
                        onChangeText={(value) => onChangeRepassword(value)}
                        placeholder={t("user:re-new-password")}
                        style={styles.Value}
                      />
                    </View>
                  </View>
                </View>
              </View>
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
    backgroundColor: "#FFFFFF",
  },
  Content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },

  NavigateSave: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  Navigate: {
    height: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  Save: {
    fontSize: 14,
    color: "#006FEE",
  },
  Title: {
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 400,
    color: "#000000",
  },
  Warning: {
    marginTop: 16,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: 300,
    color: "#A1A1AA",
  },
  // 内容区域
  ScrollWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  ScrollMain: {},
  // 信息
  Info: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  FieldWrapper: {
    paddingVertical: 15,

    marginBottom: 5,
  },
  FieldMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  KeyValue: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  Key: {
    display: "flex",
    flexDirection: "row",
  },
  Value: {
    marginTop: 10,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#F4F4F5",
    borderRadius: 10,
    height: 40,
  },
});

export default ChangePasswordScreen;
