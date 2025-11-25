import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyPolicyScreen = () => {
  const { t } = useTranslation();
  const handleBack = () => {
    router.back();
  };
  return (
    <SafeAreaView style={{ ...styles.Container }} edges={["top", "bottom"]}>
      <View style={styles.Content}>
        {/* 顶部状态栏 */}
        <StatusBar style="dark" />
        <Pressable onPress={() => handleBack()} style={styles.Navigate}>
          <ChevronLeft color={"#27272A"} size={20} />
          <Text style={{ fontSize: 14, fontWeight: 400 }}>
            {t("privacy-policy:my")}
          </Text>
        </Pressable>
        <View style={styles.ScrollWrapper}>
          <ScrollView
            style={styles.ScrollMain}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            bounces={false}
          >
            <Text style={styles.Title}>{t("privacy-policy:title")}</Text>
            <Text style={styles.Desc}>{t("privacy-policy:desc")}</Text>
            <View style={styles.Divide}></View>

            <Text style={styles.CommonTitle}>
              {t("privacy-policy:personal-data-collect-title")}
            </Text>
            <Text style={styles.CommonParagraph}>
              {t("privacy-policy:personal-data-collect-desc")}
            </Text>

            {/* Data Provide */}
            <Text style={styles.CommonSubTitle}>
              {t("privacy-policy:personal-data-provide-title")}
            </Text>
            <View style={styles.CommonSubParagraphDot}>
              <Text style={styles.Dot}>•</Text>
              <Text style={styles.CommonSubParagraph}>
                {t("privacy-policy:personal-data-provide-p1")}
              </Text>
            </View>
            <View style={styles.CommonSubParagraphDot}>
              <Text style={styles.Dot}>•</Text>
              <Text style={styles.CommonSubParagraph}>
                {t("privacy-policy:personal-data-provide-p2")}
              </Text>
            </View>
            <View style={styles.CommonSubParagraphDot}>
              <Text style={styles.Dot}>•</Text>
              <Text style={styles.CommonSubParagraph}>
                {t("privacy-policy:personal-data-provide-p3")}
              </Text>
            </View>
            <View style={styles.CommonSubParagraphDot}>
              <Text style={styles.Dot}>•</Text>
              <Text style={styles.CommonSubParagraph}>
                {t("privacy-policy:personal-data-provide-p4")}
              </Text>
            </View>

            {/* Data Receive */}
            <Text style={styles.CommonSubTitle}>
              {t("privacy-policy:personal-data-receive-title")}
            </Text>
            <View style={styles.CommonSubParagraphDot}>
              <Text style={styles.Dot}>•</Text>
              <Text style={styles.CommonSubParagraph}>
                {t("privacy-policy:personal-data-receive-p1")}
              </Text>
            </View>
            <View style={styles.CommonSubParagraphDot}>
              <Text style={styles.Dot}>•</Text>
              <Text style={styles.CommonSubParagraph}>
                {t("privacy-policy:personal-data-receive-p2")}
              </Text>
            </View>
            <View style={styles.CommonSubParagraphDot}>
              <Text style={styles.Dot}>•</Text>
              <Text style={styles.CommonSubParagraph}>
                {t("privacy-policy:personal-data-receive-p3")}
              </Text>
            </View>
            <View style={styles.CommonSubParagraphDot}>
              <Text style={styles.Dot}>•</Text>
              <Text style={styles.CommonSubParagraph}>
                {t("privacy-policy:personal-data-receive-p4")}
              </Text>
            </View>
            <View style={styles.CommonSubParagraphDot}>
              <Text style={styles.Dot}>•</Text>
              <Text style={styles.CommonSubParagraph}>
                {t("privacy-policy:personal-data-receive-p5")}
              </Text>
            </View>
            {/* -------------------- */}

            <Text style={styles.CommonTitle}>
              {t("privacy-policy:data-retention-title")}
            </Text>
            <Text style={styles.CommonParagraph}>
              {t("privacy-policy:data-retention-desc")}
            </Text>

            <Text style={styles.CommonTitle}>
              {t("privacy-policy:security-measures-title")}
            </Text>
            <Text style={styles.CommonParagraph}>
              {t("privacy-policy:security-measures-desc")}
            </Text>

            <Text style={styles.CommonTitle}>
              {t("privacy-policy:data-transfers-title")}
            </Text>
            <Text style={styles.CommonParagraph}>
              {t("privacy-policy:data-transfers-desc")}
            </Text>

            <Text style={styles.CommonTitle}>
              {t("privacy-policy:contact-information-title")}
            </Text>
            <Text style={styles.CommonParagraph}>
              {t("privacy-policy:contact-information-desc")}
            </Text>
          </ScrollView>
        </View>
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
  // 内容区域
  ScrollWrapper: {
    flex: 1,
    paddingBottom: 10,
  },
  ScrollMain: {
    flex: 1,
  },
  Title: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 800,
  },
  Desc: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 12,
    lineHeight: 20,
    color: "#A1A1AA",
    paddingHorizontal: 10,
  },
  Divide: {
    marginTop: 40,
    height: 0.3,
    backgroundColor: "#11111126",
  },
  CommonTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 600,
    paddingHorizontal: 10,
  },
  CommonParagraph: {
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 12,
    lineHeight: 20,
    color: "#A1A1AA",
  },
  CommonSubTitle: {
    marginTop: 10,
    paddingHorizontal: 10,
    fontWeight: 400,
    marginBottom: 10,
  },
  CommonSubParagraphDot: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  Dot: {
    color: "#A1A1AA",
    marginRight: 10,
  },
  CommonSubParagraph: {
    flex: 1,
    color: "#A1A1AA",
  },
});

export default PrivacyPolicyScreen;
