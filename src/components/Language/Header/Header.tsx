import { switchLanguage } from "@redux/slices/languageSlice";
import { RootState } from "@redux/store";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
interface HeaderProps {
  languageIndex: number;
  id: string;
  lang: string;
  text: string;
}
const Header: React.FC<HeaderProps> = ({ languageIndex, lang }) => {
  const { t, i18n } = useTranslation();
  const persistorLanguageIndex = useSelector(
    (state: RootState) => state.language.languageIndex
  );
  const dispatch = useDispatch();
  const handleCancel = () => {
    router.back();
  };
  const handleDone = (languageIndex: number) => {
    dispatch(switchLanguage({ lang, languageIndex }));
    i18n.changeLanguage(lang).then(async () => {
      router.dismissAll();
      router.replace("/(tabs)"); // 直接跳转到 Splash 页面，并替换当前路由
    });
  };
  return (
    <View style={styles.HeaderWrapper}>
      <View style={styles.HeaderMain}>
        <TouchableOpacity onPress={() => handleCancel()}>
          <Text style={styles.Cancel}>{t("language:cancel")}</Text>
        </TouchableOpacity>
        <Text style={styles.Language}>{t("language:language")}</Text>

        {persistorLanguageIndex === languageIndex ? (
          <Text style={{ width: 40, fontSize: 13, color: "#f2f3f5" }}>
            {t("language:done")}
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => handleDone(languageIndex)}
            disabled={persistorLanguageIndex === languageIndex ? true : false}
          >
            <Text style={styles.Done}>{t("language:done")}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderWrapper: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  HeaderMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Cancel: {},
  Language: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    fontWeight: 800,
  },
  Done: {
    width: 40,
    fontSize: 13,
    color: "#6b97e1",
  },
});

export default Header;
