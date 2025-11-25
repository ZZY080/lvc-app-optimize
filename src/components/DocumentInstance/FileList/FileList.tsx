import CustomIcon from "@components/Common/CustomIcon/CustomIcon";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { useState } from "react";
import { DocumentInstance } from "@type/common/Document/Document.types";
interface FileListProps {
  files: DocumentInstance["files"];
}
const FileList: React.FC<FileListProps> = ({ files }) => {
  const { t } = useTranslation();
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
    <View style={styles.FileListWrapper}>
      <View style={styles.FileListMain}>
        {files.map((item) => {
          return (
            <View style={styles.ItemWrapper} key={item.id}>
              <View style={styles.ItemMain}>
                <CustomIcon name="icon-file" color="#6562A9" size={30} />
                <View style={styles.Info}>
                  <Text style={styles.Title}>{item.title}</Text>
                  <TouchableOpacity
                    style={styles.IconDownload}
                    onPress={() => downloadFromUrl(item.fileUrl)}
                  >
                    <CustomIcon
                      name="icon-download"
                      color="#6562A9"
                      size={15}
                    />
                    <Text style={styles.Download}>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  FileListWrapper: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  FileListMain: {},
  ItemWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    borderRadius: 5,
    fontSize: 10,
    marginBottom: 10,
  },
  ItemMain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Info: {
    flex: 1,
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    rowGap: 9,
  },
  Title: {
    fontSize: 12,
  },
  IconDownload: {
    borderWidth: 1,
    borderColor: "#6562A9",
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    columnGap: 4,
  },
  Download: {
    fontSize: 12,
    color: "#6562A9",
  },
});

export default FileList;
