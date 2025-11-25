import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface LanguageItemProps {
  id: string;
  lang: string;
  text: string;
  index: number;
  languageIndex: number;
  setLanguageIndex: (index: number) => void;
}
const LanguageItem: React.FC<LanguageItemProps> = ({
  text,
  lang,
  index,
  setLanguageIndex,
  languageIndex,
}) => {
  const handleSelect = () => {
    setLanguageIndex(index);
  };
  return (
    <TouchableOpacity
      style={styles.LanguageItem}
      onPress={() => handleSelect()}
    >
      <Text style={styles.Text}>{text}</Text>
      <Image
        style={{
          ...styles.Icon,
          display: index === languageIndex ? "flex" : "none",
        }}
        source={require("@assets/language/correct.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  LanguageItem: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f3f5",
    // paddingVertical: 15,
    height: 50,
    paddingHorizontal: 20,
  },
  Text: {
    fontSize: 12,
    fontWeight: 600,
  },
  Icon: {
    width: 15,
    height: 15,
    objectFit: "cover",
  },
});

export default LanguageItem;
