import { Help } from "@type/common/Solution/Solution.types";
import * as MailComposer from "expo-mail-composer";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
interface HelpItemProps {
  help: Help;
}
const HelpItem: React.FC<HelpItemProps> = ({ help }) => {
  const sendEmail = async () => {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        alert("邮件功能不可用");
        return;
      }
      await MailComposer.composeAsync({
        recipients: ["contact@leadvisor.net"], // 收件人
        subject: "", // 主题
        body: "", // 邮件正文
        isHtml: false, // 是否使用 HTML 格式
      });
    } catch (error) {}
  };
  const handleDetail = () => {
    if (help.path === "/counselor") {
      return router.push(help.path);
    }
    sendEmail();
  };
  return (
    <View style={styles.HelpItemWrapper}>
      <View style={styles.HelpItemMain}>
        <View style={styles.Info}>
          {help.icon}
          <View style={styles.Right}>
            <Text style={styles.Title}>{help.title}</Text>
            <Text style={styles.Description}>{help.description}</Text>
          </View>
        </View>
        <View style={styles.Divide}></View>
        <Pressable
          style={styles.ContactNavigate}
          onPress={() => handleDetail()}
        >
          <Text style={styles.Contact}>{help.hint}</Text>
          <ChevronRight color={"#71717A"} size={24} strokeWidth={1} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HelpItemWrapper: {
    marginRight: 10,
  },
  HelpItemMain: {
    width: 257,
    borderWidth: 0.6,
    borderColor: "#D4D4D8",
    borderRadius: 7,
  },
  Info: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  Right: {
    marginLeft: 10,
    flex: 1,
  },
  Title: {
    fontSize: 16,
    fontWeight: 400,
    color: "#71717A",
  },
  Description: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 400,
    color: "#71717A",
    minHeight: 55,
  },
  Divide: {
    height: 1,
    backgroundColor: "#D4D4D8",
  },
  ContactNavigate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Contact: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    fontSize: 14,
    fontWeight: 400,
    color: "#71717A",
  },
});

export default HelpItem;
