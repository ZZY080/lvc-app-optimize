import { useNavigation } from "@react-navigation/native";
import { PlatformActivity } from "@type/common/PlatformActivity/PlatformActivity.types";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

interface PlatformActivityItemProps {
  platformActivity: PlatformActivity;
}

const PlatformActivityItem: React.FC<PlatformActivityItemProps> = ({
  platformActivity,
}) => {
  const navigation = useNavigation<any>();
  const handleDetail = (id: number) => {
    if (id == 0) {
      return navigation.navigate("PlatformActivityDetail", {
        id: platformActivity.id,
      });
    }
    if (id == 1) {
      return navigation.navigate("WebView", {
        url: platformActivity.shareUrl,
      });
    }
  };
  return (
    <Pressable
      onPress={() => handleDetail(platformActivity.id)}
      style={styles.PlatformActivityItemWrapper}
    >
      <View style={styles.PlatformActivityItemMain}>
        <Text style={styles.Title}>{platformActivity.title}</Text>
        <Text style={styles.Time}>{platformActivity.time}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  PlatformActivityItemWrapper: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  PlatformActivityItemMain: {
    overflow: "hidden",
    borderRadius: 12, // Slightly round the corners
    backgroundColor: "#fff",
    shadowColor: "#000", // Add shadow for better depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4, // For Android shadow
    position: "relative",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  Title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3F3F46", // Darker color for the title
    marginBottom: 8, // Space between title and description
  },
  Time: {
    marginTop: 20,
    fontSize: 14,
    color: "#3F3F46", // Lighter color for the description
  },
});

export default PlatformActivityItem;
