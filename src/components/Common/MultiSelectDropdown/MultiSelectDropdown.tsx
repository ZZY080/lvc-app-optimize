import { ChevronDown, ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
} from "react-native";

type Option = {
  label: string;
  value: string;
};

interface MultiSelectDropdownProps {
  marginTop?: number;
  options: Option[];
  placeholder?: string;
  onSelect: (values: string[]) => void;
  selectedValues?: string[];
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  marginTop = 10,
  options,
  placeholder = "",
  onSelect,
  selectedValues = [],
}) => {
  const [visible, setVisible] = useState(false);

  const toggleSelection = (value: string) => {
    const newSelectedValues = [...selectedValues];
    const index = newSelectedValues.indexOf(value);

    if (index > -1) {
      // 如果已选中，则移除
      newSelectedValues.splice(index, 1);
    } else {
      // 如果未选中，则添加
      newSelectedValues.push(value);
    }

    onSelect(newSelectedValues);
  };

  // 获取已选中的标签
  const selectedLabels = options
    .filter((opt) => selectedValues.includes(opt.value))
    .map((opt) => opt.label)
    .join(", ");

  return (
    <View style={{ ...styles.DropdownWrapper, marginTop }}>
      <View style={styles.DropdownMain}>
        <Pressable style={styles.dropdown} onPress={() => setVisible(true)}>
          <Text
            style={{
              color: selectedValues.length ? "#000" : "#888",
              fontSize: 11,
              flex: 1,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {selectedLabels || placeholder}
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
                keyExtractor={(item) => item.value}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                bounces={false}
                renderItem={({ item }) => {
                  const isSelected = selectedValues.includes(item.value);
                  return (
                    <Pressable
                      style={[
                        styles.option,
                        isSelected && styles.selectedOption,
                      ]}
                      onPress={() => toggleSelection(item.value)}
                    >
                      <Text style={{ fontSize: 10 }}>{item.label}</Text>
                      <Text
                        style={{
                          ...styles.checkmark,
                          color: isSelected ? "#007AFF" : "#fff",
                        }}
                      >
                        ✓
                      </Text>
                    </Pressable>
                  );
                }}
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
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    // backgroundColor: "#f0f0f0",
  },
  checkmark: {
    fontWeight: "bold",
  },
});

export default MultiSelectDropdown;
