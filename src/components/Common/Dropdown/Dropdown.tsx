import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  ChevronRight,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";

type Option = {
  label: string;
  value: string;
};

interface DropdownProps {
  marginTop?: number;
  options: Option[];
  placeholder?: string;
  onSelect: (value: string) => void;
  value?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  marginTop = 10,
  options,
  placeholder = "请选择...",
  onSelect,
  value,
}) => {
  const [visible, setVisible] = useState(false);
  // find  找到第一个符合要求的值并返回该值
  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <View style={{ ...styles.DropdownWrapper, marginTop }}>
      <View style={styles.DropdownMain}>
        <Pressable style={styles.dropdown} onPress={() => setVisible(true)}>
          <Text style={{ color: value ? "#000" : "#888" }}>
            {selectedLabel || placeholder}
          </Text>
          {visible ? (
            <ChevronRight color={"#71717A"} />
          ) : (
            <ChevronDown color={"#71717A"} />
          )}
        </Pressable>

        <Modal visible={visible} transparent animationType="fade">
          <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
            <View style={styles.modalContent}>
              <FlatList
                data={options}
                keyExtractor={(item, index) => `${index}`}
                showsVerticalScrollIndicator={false}
                overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
                bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.option}
                    onPress={() => {
                      onSelect(item.value);
                      setVisible(false);
                    }}
                  >
                    <Text>{item.label}</Text>
                  </Pressable>
                )}
              />
            </View>
          </Pressable>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DropdownWrapper: {
    width: "100%",
  },
  DropdownMain: {},
  dropdown: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    padding: 12,
    backgroundColor: "#F4F4F5",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    maxHeight: 300,
  },
  option: {
    padding: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
});

export default Dropdown;
