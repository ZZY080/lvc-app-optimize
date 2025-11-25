import { CourseDetail } from "@type/common/Course/Course.types";
import {
  DocumentDetail,
  DocumentInstance,
} from "@type/common/Document/Document.types";
import { CirclePlay, Download, FileText } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import reactiveTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
interface DocumentItemProps {
  file: any;
  instance: DocumentDetail["instance"];
}
const DocumentItem: React.FC<DocumentItemProps> = ({ file, instance }) => {
  const lang = useSelector((state: RootState) => state.language.lang);
  dayjs.extend(reactiveTime);
  dayjs.locale(lang === "cn" ? "zh-cn" : "en");
  const downloadFromUrl = async (fileUrl: string) => {
    let fileName = "";
    const match = fileUrl.match(/\/([^/]+\.[a-zA-Z0-9]+)(\?|$)/);
    if (match) {
      fileName = match[1];
    }
    const result = await FileSystem.downloadAsync(
      fileUrl,
      FileSystem.documentDirectory + fileName
    );
    save(result.uri);
  };
  const save = async (uri: string) => {
    shareAsync(uri);
  };
  return (
    <View style={styles.DocumentItemWrapper}>
      <View style={styles.DocumentItemMain}>
        <FileText size={40} color={"#3F3F46"} strokeWidth={0.4} />
        <View style={styles.Info}>
          <Text style={styles.Title} numberOfLines={2} ellipsizeMode="tail">
            {file.title}
          </Text>
          {instance ? (
            <View style={styles.IconDownload}>
              <Download color={"#6562A9"} size={20} strokeWidth={0.4} />
              <Text
                style={{ fontSize: 10, color: "#6562A9" }}
                onPress={() => downloadFromUrl(file.fileUrl)}
              >
                下载
              </Text>
            </View>
          ) : (
            <Text
              style={styles.Description}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {dayjs(new Date(file.createdAt)).fromNow()}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  DocumentItemWrapper: {
    marginLeft: 0.2,
  },
  DocumentItemMain: {
    width: 286,
    height: 109,
    marginRight: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  },
  Info: {
    marginLeft: 10,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  Title: {
    color: "#3F3F46",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
  },
  Description: {
    color: "#A1A1AA",
    fontSize: 10,
    marginTop: 6,
  },
  IconDownload: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 8,
    backgroundColor: "#6562A933",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
});

export default DocumentItem;
