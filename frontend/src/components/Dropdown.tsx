import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize } from "@/constants/tokens";

const Dropdown: React.FC<{
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  label: string;
}> = ({ options, selectedValue, onValueChange, label }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    closeModal();
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownButton} onPress={openModal}>
        <Text style={styles.selectedValue}>{selectedValue}</Text>
        <Ionicons name="chevron-down" size={20} color={colors.background} />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D5D5D5",
  },
  selectedValue: {
    fontSize: fontSize.sm,
    color: colors.background,
    fontFamily: "Nunito-Regular",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 15,
    padding: 20,
    width: "80%",
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 10,
    marginVertical: 5,
  },
  optionText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    textAlign: "center",
    fontFamily: "Nunito-Regular",
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  closeButtonText: {
    color: colors.background,
    fontSize: fontSize.sm,
    textAlign: "center",
  },
});

export default Dropdown;
