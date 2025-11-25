import Dropdown from "@components/Common/Dropdown/Dropdown";
import { useNavigation } from "@react-navigation/native";
import {
  BranchesRange,
  FeeEarnersRange,
  RegisterMemberForm as RegisterMemberFormType,
  RevenueRange,
} from "@type/common/Opportunity/Opportunity.types";
import { ScreenProps } from "@type/Navigation/ScreenType";
import { Asterisk, Upload } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
const RegisterMemberForm = () => {
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const { t } = useTranslation();
  const handleBack = () => {
    navigation.goBack();
  };
  const [registerMemberForm, setRegisterMemberForm] = useState<
    RegisterMemberFormType<number>
  >({
    name: "kenny",
    description: "sdasd",
    businessDescription: "sdds",
    managerName: "1212",
    feeEarnersRange: FeeEarnersRange.FIFTY_ONE_TO_HUNDRED,
    revenueRange: RevenueRange.HALF_TO_ONE,
    branchesRange: BranchesRange.ABOVE_TEN,
    numPartners: 12,
    yearFounded: 2015,
    logoUrl:
      "https://stlvc.blob.core.windows.net/member-documents/create-requests/mXbEnMlAr19/logo_20250424T085148.jpg?sv=2025-05-05&st=2025-05-08T06%3A36%3A40Z&se=2025-05-08T12%3A56%3A40Z&skoid=cb0e88e3-4976-43b7-9b80-ad8fe0e89c5a&sktid=79307fb1-2889-4472-ad2a-33e4f17b987d&skt=2025-05-08T06%3A36%3A40Z&ske=2025-05-08T12%3A56%3A40Z&sks=b&skv=2025-05-05&sr=b&sp=r&sig=OLOay8WLO9%2BAofY7m2rPAwUFfuWW3orYZU2OvIqRS7M%3D",
    businessLicenseUrl:
      "https://stlvc.blob.core.windows.net/member-documents/create-requests/mXbEnMlAr19/business_license_20250424T085147.jpg?sv=2025-05-05&st=2025-05-08T06%3A36%3A40Z&se=2025-05-08T12%3A56%3A40Z&skoid=cb0e88e3-4976-43b7-9b80-ad8fe0e89c5a&sktid=79307fb1-2889-4472-ad2a-33e4f17b987d&skt=2025-05-08T06%3A36%3A40Z&ske=2025-05-08T12%3A56%3A40Z&sks=b&skv=2025-05-05&sr=b&sp=r&sig=vmAuzzveH3%2F79p8pKjZHYjSKLYUKUTB55%2BO%2B6I18IuY%3D",
    spRequestFormUrl:
      "https://www.leadvisor.net/_next/image?url=https%3A…9VmE35oZlq%2Flogo_20231206T221757.webp&w=256&q=75",
    countryCodes: ["zh", "cn"],
    languageCodes: ["zh", "cn"],
    serviceIds: ["123"],
    serviceCategoryIds: ["4MWJKnPDYBo"],
    address: {
      countryCode: "zh",
      region: "123",
      zipcode: "121212",
      addressOne: "sasas",
      addressTwo: "1233",
      email: "2916363651@qq.com",
    },
  });
  const [selected, setSelected] = useState("");

  const uploadLogo = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // setImage(result.assets[0]);
      console.log(result.assets[0].uri);
    }
  };
  const uploadBussinessLicense = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // setImage(result.assets[0]);
      console.log(result.assets[0].uri);
      const formData = new FormData();

      fetch("http://192.168.2.20:8080/enterprise/file/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
          files: {
            uri: result.assets[0].uri,
            type: "image/jpeg",
            name: "file",
          },
        }),
      });
    }
  };
  return (
    <View>
      <View>
        {/* 基本信息 */}
        <Text
          style={{
            marginTop: 20,
            paddingHorizontal: 10,
            color: "#3F3F46",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          {t("opportunity:basic-information-title")}
        </Text>
        <Text
          style={{
            marginTop: 10,
            paddingHorizontal: 10,
            color: "#71717A",
            fontSize: 12,
            fontWeight: 300,
          }}
        >
          {t("opportunity:basic-information-desc")}
        </Text>
        {/* 字段 */}
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
                  {t("opportunity:firm-name")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <TextInput
                maxLength={64}
                style={styles.Value}
                placeholder={t("opportunity:firm-name-placeholder")}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:firm-description")}
                </Text>

                <Asterisk size={14} color={"#C20E4D"} />
              </View>

              <TextInput
                maxLength={1024}
                placeholder={t("opportunity:firm-description-placeholder")}
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
        </View>
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
                  {t("opportunity:bussiness-description")}
                </Text>

                <Asterisk size={14} color={"#C20E4D"} />
              </View>

              <TextInput
                maxLength={1024}
                placeholder={t("opportunity:bussiness-description-placeholder")}
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
        </View>
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
                  {t("opportunity:manager-name")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>

              <TextInput
                placeholder={t("opportunity:manager-name-placeholder")}
                maxLength={250}
                style={styles.Value}
              />
            </View>
          </View>
        </View>
        {/* 公司详情 */}
        <Text
          style={{
            marginTop: 20,
            paddingHorizontal: 10,
            color: "#3F3F46",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          {t("opportunity:business-details-title")}
        </Text>
        <Text
          style={{
            marginTop: 10,
            paddingHorizontal: 10,
            color: "#71717A",
            fontSize: 12,
            fontWeight: 300,
          }}
        >
          {t("opportunity:business-details-desc")}
        </Text>
        {/* 字段 */}
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
                  {t("opportunity:fee-earner-range")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <Dropdown
                options={[
                  { label: "苹果", value: "apple" },
                  { label: "鸭梨", value: "pear" },
                  { label: "荔枝", value: "lizhi" },
                  { label: "苹果", value: "s" },
                ]}
                value={selected}
                onSelect={(val) => setSelected(val)}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:revenue-range")}
                </Text>

                <Asterisk size={14} color={"#C20E4D"} />
              </View>

              <Dropdown
                options={[
                  { label: "苹果", value: "apple" },
                  { label: "鸭梨", value: "pear" },
                  { label: "荔枝", value: "lizhi" },
                  { label: "苹果", value: "s" },
                ]}
                value={selected}
                onSelect={(val) => setSelected(val)}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:branch-range")}
                </Text>

                <Asterisk size={14} color={"#C20E4D"} />
              </View>

              <Dropdown
                options={[
                  { label: "苹果", value: "apple" },
                  { label: "鸭梨", value: "pear" },
                  { label: "荔枝", value: "lizhi" },
                  { label: "苹果", value: "s" },
                ]}
                value={selected}
                onSelect={(val) => setSelected(val)}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:number-of-partners")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>

              <Dropdown
                options={[
                  { label: "苹果", value: "apple" },
                  { label: "鸭梨", value: "pear" },
                  { label: "荔枝", value: "lizhi" },
                  { label: "苹果", value: "s" },
                ]}
                value={selected}
                onSelect={(val) => setSelected(val)}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:year-founded")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <TextInput
                inputMode="numeric"
                maxLength={250}
                style={styles.Value}
              />
            </View>
          </View>
        </View>
        {/* 地址信息 */}
        <Text
          style={{
            marginTop: 20,
            paddingHorizontal: 10,
            color: "#3F3F46",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          {t("opportunity:address-infomation-title")}
        </Text>
        <Text
          style={{
            marginTop: 10,
            paddingHorizontal: 10,
            color: "#71717A",
            fontSize: 12,
            fontWeight: 300,
          }}
        >
          {t("opportunity:address-infomation-desc")}
        </Text>
        {/* 字段 */}
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
                  {t("opportunity:primary-street-address")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <TextInput
                inputMode="numeric"
                placeholder={t(
                  "opportunity:primary-street-address-placeholder"
                )}
                maxLength={250}
                style={styles.Value}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:apartment-unit")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <TextInput
                inputMode="numeric"
                placeholder={t("opportunity:apartment-unit-placeholder")}
                maxLength={250}
                style={styles.Value}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:state-region")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <TextInput
                placeholder={t("opportunity:state-region-placeholder")}
                inputMode="numeric"
                maxLength={250}
                style={styles.Value}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:zip-code")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <TextInput
                placeholder={t("opportunity:zip-code-placeholder")}
                inputMode="numeric"
                maxLength={250}
                style={styles.Value}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:country")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <Dropdown
                placeholder={t("opportunity:country-placeholder")}
                options={[
                  { label: "苹果", value: "apple" },
                  { label: "鸭梨", value: "pear" },
                  { label: "荔枝", value: "lizhi" },
                  { label: "苹果", value: "s" },
                ]}
                value={selected}
                onSelect={(val) => setSelected(val)}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:email")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <TextInput
                placeholder={t("opportunity:email-placeholder")}
                inputMode="numeric"
                maxLength={250}
                style={styles.Value}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:phone")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <TextInput
                placeholder={t("opportunity:phone-placeholder")}
                inputMode="numeric"
                maxLength={250}
                style={styles.Value}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:fax")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <TextInput
                placeholder={t("opportunity:fax-placeholder")}
                inputMode="numeric"
                maxLength={250}
                style={styles.Value}
              />
            </View>
          </View>
        </View>
        {/* 标签 */}
        <Text
          style={{
            marginTop: 20,
            paddingHorizontal: 10,
            color: "#3F3F46",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          {t("opportunity:tag-title")}
        </Text>
        <Text
          style={{
            marginTop: 10,
            paddingHorizontal: 10,
            color: "#71717A",
            fontSize: 12,
            fontWeight: 300,
          }}
        >
          {t("opportunity:tag-desc")}
        </Text>
        {/* 字段 */}
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
                  {t("opportunity:coutries")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <Dropdown
                placeholder={t("opportunity:coutries-placeholder")}
                options={[
                  { label: "苹果", value: "apple" },
                  { label: "鸭梨", value: "pear" },
                  { label: "荔枝", value: "lizhi" },
                  { label: "苹果", value: "s" },
                ]}
                value={selected}
                onSelect={(val) => setSelected(val)}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:languages")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <Dropdown
                placeholder={t("opportunity:languages-placeholder")}
                options={[
                  { label: "苹果", value: "apple" },
                  { label: "鸭梨", value: "pear" },
                  { label: "荔枝", value: "lizhi" },
                  { label: "苹果", value: "s" },
                ]}
                value={selected}
                onSelect={(val) => setSelected(val)}
              />
            </View>
          </View>
        </View>
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
                  {t("opportunity:service-categories")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <Dropdown
                placeholder={t("opportunity:service-categories-placeholder")}
                options={[
                  { label: "苹果", value: "apple" },
                  { label: "鸭梨", value: "pear" },
                  { label: "荔枝", value: "lizhi" },
                  { label: "苹果", value: "s" },
                ]}
                value={selected}
                onSelect={(val) => setSelected(val)}
              />
            </View>
          </View>
        </View>
        {/* 文件 */}
        <Text
          style={{
            marginTop: 20,
            paddingHorizontal: 10,
            color: "#3F3F46",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          {t("opportunity:file-title")}
        </Text>
        <Text
          style={{
            marginTop: 10,
            paddingHorizontal: 10,
            color: "#71717A",
            fontSize: 12,
            fontWeight: 300,
          }}
        >
          {t("opportunity:file-desc")}
        </Text>
        {/* 字段 */}
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
                  {t("opportunity:logo")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <Pressable
                onPress={() => uploadLogo()}
                style={{
                  ...styles.Value,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#71717A",
                  }}
                >
                  {t("opportunity:select-file")}
                </Text>
                <Upload size={26} color={"#71717A"} strokeWidth={0.8} />
              </Pressable>
              <Text style={{ ...styles.Warn, marginTop: 6 }}>
                {t("opportunity:logo-file-size-warn")}
              </Text>
              <Text style={{ ...styles.Warn, marginTop: 6 }}>
                {t("opportunity:logo-file-type-warn")}
              </Text>
            </View>
          </View>
        </View>
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
                  {t("opportunity:business-license")}
                </Text>
                <Asterisk size={14} color={"#C20E4D"} />
              </View>
              <Pressable
                onPress={() => uploadBussinessLicense()}
                style={{
                  ...styles.Value,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#71717A",
                  }}
                >
                  {t("opportunity:select-file")}
                </Text>
                <Upload size={26} color={"#71717A"} strokeWidth={0.8} />
              </Pressable>
              <Text style={{ ...styles.Warn, marginTop: 6 }}>
                {t("opportunity:business-license-file-size-warn")}
              </Text>
              <Text style={{ ...styles.Warn, marginTop: 6 }}>
                {t("opportunity:business-license-file-type-warn")}
              </Text>
            </View>
          </View>
        </View>
        {/* 营业执照提示 */}
        <View style={styles.LicenseWrapper}>
          <Text style={styles.LicenseMain}>
            {t("opportunity:business-license-warning")}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  RegisterMemberFormWrapper: {},
  RegisterMemberFormMain: {},
  ProcessWrapper: {
    paddingHorizontal: 10,
  },
  ProcessMain: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    borderWidth: 0.8,
    borderColor: "#D4D4D8",
    borderRadius: 10,
    rowGap: 10,
  },
  ProcessWord: {
    fontSize: 12,
  },
  ProcessIcon: {},
  // 字段
  FieldWrapper: {
    marginTop: 10,
    // paddingVertical: 15,
    paddingHorizontal: 10,
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
  Warn: {
    color: "#A1A1AA",
    fontSize: 12,
    fontWeight: 300,
  },
  LicenseWrapper: {
    marginTop: 40,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  LicenseMain: {
    fontSize: 12,
    fontWeight: 300,
    lineHeight: 20,
    color: "#71717A",
  },
  Error: {
    marginTop: 4,
    color: "red",
  },
});

export default RegisterMemberForm;
