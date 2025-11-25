import { RootState } from "@redux/store";
import { themes } from "@themes/themes";
import { UserProfile } from "@type/common/User/User.types";
import { router } from "expo-router";
import { CircleUserRound, FilePenLine } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
interface BackgroundProps {
  userProfile: UserProfile | null;
}
const Background: React.FC<BackgroundProps> = ({ userProfile }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { t } = useTranslation();

  const handleProfile = () => {
    if (!userProfile) {
      router.push("/auth/login");
    }
  };
  return (
    <View style={styles.BackgroundWrapper}>
      <View
        style={{
          ...styles.BackgroundMain,
          backgroundColor: themes.color.themeColor,
        }}
      >
        {/* 个人信息 */}
        <View style={styles.Info}>
          <View
            style={{
              ...styles.Avatar,
              backgroundColor: themes.color.themeColor,
            }}
          >
            {<CircleUserRound size={80} color={"#fff"} strokeWidth={0.5} />}
          </View>
          {userProfile ? (
            <Pressable
              style={styles.NameEditEmail}
              onPress={() => router.push("/my/profile")}
            >
              <View style={styles.NameEdit}>
                <Text style={styles.Name}>{userProfile.name}</Text>
                {/* <CustomIcon name="icon-edit" /> */}
                <FilePenLine size={26} />
              </View>
              <Text style={styles.Email}>{userProfile.email}</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.NameEditEmail} onPress={handleProfile}>
              <View style={styles.NameEdit}>
                <Text style={styles.Name}>{t("my:not-login")}</Text>
              </View>
              <Text
                style={styles.Email}
                onPress={() => router.push("/auth/login")}
              >
                {t("my:email-warn")}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  BackgroundWrapper: {},
  BackgroundMain: {
    position: "relative",
    height: 218,
  },
  BackgroundLogo: {
    position: "absolute",
    top: 6,
    right: 10,
    width: 188,
    height: 188,
    objectFit: "cover",
    zIndex: 1,
  },
  Notify: {
    position: "absolute",
    top: 49,
    right: 16,
    width: 25,
    height: 25,
    objectFit: "cover",
  },
  // 个人信息
  Info: {
    position: "absolute",
    top: 98,
    left: 31,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  Avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Warning: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  NameEditEmail: {
    display: "flex",
    flexDirection: "column",
    rowGap: 5,
  },
  NameEdit: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    columnGap: 3,
  },
  Name: {
    fontFamily: "Inter",
    fontSize: 20,
    color: "#FFFFFF",
    marginRight: 20,
  },
  Edit: {
    width: 17,
    height: 17,
    objectFit: "cover",
  },
  Email: {
    marginTop: 6,
    fontFamily: "Inter",
    fontSize: 12,
    color: "#B8B4D7",
  },
});

export default Background;
