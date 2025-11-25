import { fetcher } from "@api/request";
import Loading from "@components/Common/Loading/Loading";
import Background from "@components/My/Background/Background";
import MenuItem from "@components/My/MenuItem/MenuItem";
import OperateItem from "@components/My/OperateItem/OperateItem";
import { USER_PROFILE } from "@constants/url/url";
import { RootState } from "@redux/store";
import { UserProfile } from "@type/common/User/User.types";
import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BookMarked, School, ShoppingBag, Truck } from "lucide-react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const MyScreen = () => {
  const { t, i18n } = useTranslation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const [menuList, setMenuList] = useState<
    {
      id: string;
      icon: React.ReactNode;
      text: string;
      path: any;
    }[]
  >([
    {
      id: "1",
      icon: <School size={30} color={"#52525B"} strokeWidth={0.8} />,
      text: t("my:course"),
      path: "/my/course",
    },
    {
      id: "2",
      icon: <ShoppingBag size={30} color={"#52525B"} strokeWidth={0.8} />,
      text: t("my:product"),
      path: "/my/product",
    },
    {
      id: "3",
      icon: <Truck size={30} color={"#52525B"} strokeWidth={0.8} />,
      text: t("my:order"),
      path: "/my/order",
    },
    {
      id: "4",
      icon: <BookMarked size={30} color={"#52525B"} strokeWidth={0.8} />,
      text: t("my:profile"),
      path: "/my/profile",
    },
  ]);
  const [operateList, setOperateList] = useState<
    {
      id: string;
      type: string;
      text: string;
      path: any;
    }[]
  >([
    {
      id: "10",
      type: "",
      text: t("my:settings"),
      path: "/setting",
    },
    {
      id: "5",
      type: "",
      text: t("my:privacy-policy"),
      path: "/my/privacy-policy",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  // 获取用户信息
  const getUserProfile = async () => {
    setLoading(true);
    try {
      const response = await fetcher(`${USER_PROFILE}`);
      if (response.ok) {
        const json = await response.json();
        const payload = json.payload;
        setUserProfile(payload);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // 页面每次聚焦时执行
      getUserProfile();

      return () => {
        // 页面离开时可以做清理
      };
    }, [accessToken])
  );

  return (
    <View style={styles.Container}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar style="dark" />
        {loading ? (
          <Loading />
        ) : (
          <View style={styles.ScrollWrapper}>
            <ScrollView
              style={styles.ScrollMain}
              showsVerticalScrollIndicator={false}
              overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
              bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
            >
              {/* 背景 */}
              <Background userProfile={userProfile} />
              {/* 菜单列表 */}
              <View style={styles.MenuWrapper}>
                <View style={styles.MenuMain}>
                  {menuList.map((item) => {
                    return <MenuItem key={item.id} menuItem={item} />;
                  })}
                </View>
              </View>
              {/* 动作列表 */}
              <View style={styles.OperateWrapper}>
                <View style={styles.OperateMain}>
                  {operateList.map((item) => {
                    return <OperateItem key={item.id} {...item} />;
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
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
  ScrollWrapper: {
    flex: 1,
  },
  ScrollMain: {
    flex: 1,
  },
  // 菜单列表
  MenuWrapper: {
    position: "absolute",
    top: 194,
    width: "100%",
    paddingHorizontal: 17,
  },
  MenuMain: {
    width: "100%",
    height: 98,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  // 动作列表
  OperateWrapper: {
    marginTop: 100,
    paddingHorizontal: 30,
  },
  OperateMain: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    rowGap: 30,
  },
});
export default MyScreen;
