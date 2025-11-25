import { fetcher } from "@api/request";
import Empty from "@components/Common/Empty/Empty";
import Loading from "@components/Common/Loading/Loading";
import { updateUserProfile } from "@redux/slices/authSlice";

import {
  ACCESS_TOKEN_EXPIRE_STATUS_CODE,
  USER_PROFILE,
} from "@constants/url/url";
import { emailFormatCheck } from "@utils/email/email";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Asterisk, ChevronLeft, Link2 } from "lucide-react-native";
import { Fragment, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

const MyProfileScreen = () => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<{
    name: string;
    publicEmail: string;
    bio: string;
    location: string;
    socialLinks: {
      url: string | null;
    }[];
  } | null>();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  // 获取用户信息
  const getUserInfoData = async () => {
    setLoading(true);
    try {
      const response = await fetcher(`${USER_PROFILE}`, {
        method: "GET",
      });
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return router.replace("/auth/login");
      }
      if (response.ok) {
        const json = await response.json();
        const payload = json.payload;
        let tempSocialLinks = [
          { url: null },
          { url: null },
          { url: null },
          { url: null },
        ];
        for (let i = 0; i < payload.socialLinks.length; i++) {
          tempSocialLinks[i].url = payload.socialLinks[i];
        }
        setUserInfo({
          name: payload.name || "",
          publicEmail: payload.publicEmail || "",
          bio: payload.bio || "",
          location: payload.location || "",
          socialLinks: tempSocialLinks,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 编辑用户信息
  const updateUserInfoData = async () => {
    if (!userInfo) {
      return;
    }
    if (userInfo.name === "") {
      return Toast.show({
        type: "error",
        text1: t("error:name-can-not-be-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    if (!emailFormatCheck(userInfo.publicEmail.trim())) {
      return Toast.show({
        type: "error",
        text1: t("error:email-format-is-not-correct"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    if (userInfo.bio.trim() === "") {
      return Toast.show({
        type: "error",
        text1: t("error:bio-can-not-be-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    if (userInfo.location.trim() === "") {
      return Toast.show({
        type: "error",
        text1: t("error:location-can-not-be-empty"),
        position: "top",
        visibilityTime: 2500,
      });
    }
    try {
      const response = await fetcher(`${USER_PROFILE}`, {
        method: "PATCH",
        body: userInfo,
      });
      if (response.status === ACCESS_TOKEN_EXPIRE_STATUS_CODE) {
        return router.replace("/auth/login");
      }
      if (response.ok) {
        const json = await response.json();
        const { type } = json;
        dispatch(updateUserProfile({ name: userInfo.name }));
        if (type === "SUCCESS") {
          router.back();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useFocusEffect(
    useCallback(() => {
      // 页面每次聚焦时执行
      getUserInfoData();

      return () => {
        // 页面离开时可以做清理
      };
    }, [])
  );

  const handleBack = () => {
    router.back();
  };
  const handleChangeName = (value: string) => {
    setUserInfo((prevData: any) => {
      return {
        ...prevData,
        name: value,
      };
    });
  };
  const handleChangePublicEmail = (value: string) => {
    setUserInfo((prevData: any) => {
      return {
        ...prevData,
        publicEmail: value,
      };
    });
  };
  const handleChangeBio = (value: string) => {
    setUserInfo((prevData: any) => {
      return {
        ...prevData,
        bio: value,
      };
    });
  };
  const handleChangeLocation = (value: string) => {
    setUserInfo((prevData: any) => {
      return {
        ...prevData,
        location: value,
      };
    });
  };
  const handleUrlChange = (value: string, index: number) => {
    setUserInfo((preData: any) => {
      preData.socialLinks[index] = { url: value === "" ? null : value };
      return {
        ...preData,
        socialLinks: [...preData.socialLinks],
      };
    });
  };
  const checkUrlForamt = (url: string) => {
    const regex =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    return regex.test(url);
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="dark" />
        <View style={styles.NavigateAction}>
          <Pressable onPress={() => handleBack()} style={styles.Navigate}>
            <ChevronLeft color={"#27272A"} size={20} />
            <Text style={{ fontSize: 14, fontWeight: 400 }}>
              {t("common:account")}
            </Text>
          </Pressable>
          <Text style={styles.Action} onPress={() => updateUserInfoData()}>
            {t("common:save")}
          </Text>
        </View>
        <Text style={styles.Title}>{t("my-profile:title")}</Text>
        <Text style={styles.Warning}>{t("my-profile:title-warning")}</Text>
        {/* 内容 */}
        {loading ? (
          <Loading />
        ) : userInfo ? (
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
                          {t("my-profile:name")}
                        </Text>
                        <Asterisk size={14} color={"#C20E4D"} />
                      </View>
                      <TextInput
                        maxLength={64}
                        onChangeText={(value) => handleChangeName(value)}
                        value={userInfo.name}
                        style={styles.Value}
                      />
                      <Text
                        style={{
                          marginTop: 6,
                          color: "#A1A1AA",
                          fontSize: 12,
                          fontWeight: 300,
                        }}
                      >
                        {t("my-profile:name-warning")}
                      </Text>
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
                          {t("my-profile:public-email")}
                        </Text>
                        <Asterisk size={14} color={"#C20E4D"} />
                      </View>
                      <TextInput
                        onChangeText={(value) => handleChangePublicEmail(value)}
                        style={styles.Value}
                        value={userInfo.publicEmail}
                      />
                      <Text
                        style={{
                          marginTop: 6,
                          color: "#A1A1AA",
                          fontSize: 12,
                          fontWeight: 300,
                        }}
                      >
                        {t("my-profile:public-email-warning")}
                      </Text>
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
                          {t("my-profile:bio")}
                        </Text>

                        <Asterisk size={14} color={"#C20E4D"} />
                      </View>

                      <TextInput
                        maxLength={1024}
                        value={userInfo.bio}
                        onChangeText={(value) => handleChangeBio(value)}
                        style={{
                          ...styles.Value,
                          height: 100,
                          textAlignVertical: "top",
                        }}
                        multiline={true}
                        numberOfLines={4}
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
                          {t("my-profile:location")}
                        </Text>
                        <Asterisk size={14} color={"#C20E4D"} />
                      </View>

                      <TextInput
                        maxLength={250}
                        value={userInfo.location}
                        onChangeText={(value) => handleChangeLocation(value)}
                        style={styles.Value}
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
                          {t("my-profile:social-links")}
                        </Text>

                        <Asterisk size={14} color={"#C20E4D"} />
                      </View>
                      <Text
                        style={{
                          marginTop: 6,
                          color: "#A1A1AA",
                          fontSize: 12,
                          fontWeight: 300,
                        }}
                      >
                        {t("my-profile:social-links-warning")}
                      </Text>
                      {userInfo.socialLinks.map((item, index) => {
                        return (
                          <Fragment key={index}>
                            <View
                              style={{
                                ...styles.Value,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Link2
                                size={30}
                                strokeWidth={0.8}
                                color={"#52525B"}
                              />
                              <TextInput
                                maxLength={250}
                                value={item.url ? item.url : ""}
                                onChangeText={(value) =>
                                  handleUrlChange(value, index)
                                }
                                style={{ flex: 1 }}
                              />
                            </View>
                            {item.url && !checkUrlForamt(item.url) && (
                              <Text style={styles.Error}>
                                {t("error:url-format-is-not-correct")}
                              </Text>
                            )}
                          </Fragment>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <Empty />
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

  NavigateAction: {
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
  Action: {
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
  Error: {
    marginTop: 4,
    color: "red",
  },
});

export default MyProfileScreen;
