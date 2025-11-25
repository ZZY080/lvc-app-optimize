import { Asterisk } from "lucide-react-native";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextInput, View } from "react-native";

const RegisterMemberPending = () => {
  const { t } = useTranslation();
  useEffect(() => {}, []);
  return (
    <View style={styles.RegisterMemberPendingWrapper}>
      <View style={styles.RegisterMemberPendingMain}>
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
              </View>
              <Text style={styles.Value}>这是公司名称</Text>
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
              </View>
              <Text style={styles.Value}>这是公司描述</Text>
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
              </View>
              <Text style={styles.Value}>这是业务描述</Text>
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
              </View>
              <Text style={styles.Value}>这是经理姓名</Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.Divide, marginTop: 30 }}></View>
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
              <Text style={styles.Value}>0-5</Text>
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

              <Text style={styles.Value}>0-500k</Text>
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

              <Text style={styles.Value}>1</Text>
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

              <Text style={styles.Value}>0</Text>
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
              <Text style={styles.Value}>2025</Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.Divide, marginTop: 30 }}></View>
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
              <Text style={styles.Value}></Text>
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
              <Text style={styles.Value}></Text>
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
              <Text style={styles.Value}></Text>
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
              <Text style={styles.Value}></Text>
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
              <Text style={styles.Value}></Text>
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
              <Text style={styles.Value}></Text>
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
              <Text style={styles.Value}></Text>
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
              <Text style={styles.Value}></Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  RegisterMemberPendingWrapper: {},
  RegisterMemberPendingMain: {},
  FieldWrapper: {
    marginTop: 5,
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
    // paddingHorizontal: 10,
    width: "100%",
    // backgroundColor: "#F4F4F5",
    borderRadius: 10,
    height: 40,
  },
  Warn: {
    color: "#A1A1AA",
    fontSize: 12,
    fontWeight: 300,
  },
  Divide: {
    height: 0.6,
    backgroundColor: "#E4E4E7",
  },
});
export default RegisterMemberPending;
