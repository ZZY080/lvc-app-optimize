import { ScrollView, StyleSheet, Text, View } from "react-native";

interface DescriptionProps {
  description: string;
}
const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <View style={styles.DescriptionWrapper}>
      <ScrollView
        style={styles.DescriptionMain}
        showsVerticalScrollIndicator={false}
        overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
        bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
      >
        <Text style={styles.Word}>{description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  DescriptionWrapper: {},
  DescriptionMain: {},
  Word: {
    fontSize: 14,
    fontWeight: 300,
    color: "#71717A",
  },
});

export default Description;
