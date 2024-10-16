import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  FlatList,
  Keyboard,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/components/Avatar";
import { colors, fontSize } from "@/constants/tokens";
import { DateHistory } from "@/types/dateHistory";
import DateHistoryList from "@/components/DateHistoryList";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "expo-router";

const dietIcons = {
  Vegan: require("@/assets/diet_icons/vegan.png"),
  "Gluten-free": require("@/assets/diet_icons/gluten_free.png"),
  "Lactose-free": require("@/assets/diet_icons/lactose_free.png"),
  Vegetarian: require("@/assets/diet_icons/vegetarian.png"),
  "Nut-free": require("@/assets/diet_icons/nut_free.png"),
  Halal: require("@/assets/diet_icons/halal.png"),
  "Dairy-free": require("@/assets/diet_icons/dairy_free.png"),
  Paleo: require("@/assets/diet_icons/paleo.png"),
  Keto: require("@/assets/diet_icons/keto.png"),
};

const darkDietIcons = {
  Vegan: require("@/assets/diet_icons/vegan.png"),
  "Gluten-free": require("@/assets/diet_icons/dark_icons/gluten_free.png"),
  "Lactose-free": require("@/assets/diet_icons/dark_icons/lactose_free.png"),
  Vegetarian: require("@/assets/diet_icons/vegetarian.png"),
  "Nut-free": require("@/assets/diet_icons/dark_icons/nut_free.png"),
  Halal: require("@/assets/diet_icons/halal.png"),
  "Dairy-free": require("@/assets/diet_icons/dark_icons/dairy_free.png"),
  Paleo: require("@/assets/diet_icons/paleo.png"),
  Keto: require("@/assets/diet_icons/keto.png"),
};

const dietOptions = Object.keys(dietIcons);

const PartnerDetailsScreen: React.FC = () => {
  // Hardcoded data
  const [selectedDiet, setSelectedDiet] = useState<string[]>([
    "Vegan",
    "Gluten-free",
  ]);
  const [partnerName, setPartnerName] = useState("Anna");
  const [partnerAge, setPartnerAge] = useState("21");
  const [partnerPersonality, setPartnerPersonality] = useState("Introvert");

  const [partnerLoves, setPartnerLoves] = useState<string[]>([
    "Sunsets",
    "concerts",
    "Thai food",
    "art",
    "John Wick",
    "horses",
  ]);
  const [inputText, setInputText] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isDietModalVisible, setIsDietModalVisible] = useState(false);

  const [isLovesValid, setIsLovesValid] = useState(true);
  const [lovesError, setLovesError] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [nameError, setNameError] = useState("");
  const [isAgeValid, setIsAgeValid] = useState(true);
  const [ageError, setAgeError] = useState("");

  const router = useRouter();

  // Hardcoded date histories
  const [histories, setHistories] = useState<DateHistory[]>([
    {
      id: "1",
      name: "Anna",
      age: "21",
      dateDescription: "Romantic dinner followed by a sunset walk",
      date: "2024-01-15",
      isFavorite: false,
      avatarGradient: ["#ff0262", "#ffffff"],
    },
    {
      id: "2",
      name: "Anna",
      age: "21",
      dateDescription: "Movie night and stargazing",
      date: "2024-02-10",
      isFavorite: true,
      avatarGradient: ["#d244ac", "#fff"],
    },
  ]);

  const handleFavoriteToggle = (id: string) => {
    setHistories((prevHistories) =>
      prevHistories.map((history) =>
        history.id === id
          ? { ...history, isFavorite: !history.isFavorite }
          : history
      )
    );
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Partner",
      "Are you sure you want to delete this partner?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Partner deleted");
            router.back();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSave = () => {  
    handleNameSubmit();
    handleAgeSubmit();
  
    if (partnerLoves.length < 3) {
      setIsLovesValid(false);
      setLovesError("Please enter at least 3 interests.");
    } else {
      setIsLovesValid(true);
      setLovesError("");
    }
  
    if (!isNameValid || !isAgeValid || !isLovesValid) {
      return;
    }
  
    setIsEditing(false);
    console.log("Saving updated partner details...");
    // Add PUT request to update partner details in the database here
  };  

  const handleDietSelect = (diet: string) => {
    setSelectedDiet((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  const openDietModal = () => {
    setIsDietModalVisible(true);
  };

  const closeDietModal = () => {
    setIsDietModalVisible(false);
  };

  const handleInputChange = (text: string) => {
    if (text.includes(",")) {
      const interests = text.split(",");
      interests.forEach((interest) => {
        const trimmedInterest = interest.trim();
        if (trimmedInterest.length > 0) {
          if (/^[A-Za-z\s]+$/.test(trimmedInterest)) {
            setPartnerLoves((prev) => [...prev, trimmedInterest]);
            setIsLovesValid(true);
            setLovesError("");
          } else {
            setIsLovesValid(false);
            setLovesError("Interests can only contain letters and spaces.");
          }
        }
      });
      setInputText("");
    } else {
      setInputText(text);
    }
  };

  const removeInterest = (index: number) => {
    setPartnerLoves(partnerLoves.filter((_, i) => i !== index));
  };

  const handleLovesSubmit = () => {
    if (inputText.trim().length > 0) {
      if (/^[A-Za-z\s]+$/.test(inputText.trim())) {
        setPartnerLoves([...partnerLoves, inputText.trim()]);
        setIsLovesValid(true);
        setLovesError("");
        setInputText("");
      } else {
        setIsLovesValid(false);
        setLovesError("Interests can only contain letters and spaces.");
        return;
      }
    }
    Keyboard.dismiss();
  };

  const handleNameSubmit = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const nameLength = partnerName.trim().length;

    if (!nameRegex.test(partnerName)) {
      setIsNameValid(false);
      setNameError("Only English letters.");
      return;
    }

    if (nameLength < 2 || nameLength > 10) {
      setIsNameValid(false);
      setNameError("Must be 2-18 letters.");
      return;
    }

    setIsNameValid(true);
    setNameError("");
  };

  const handleAgeSubmit = () => {
    const numberRegex = /^[0-9]+$/;
    const ageRangeRegex = /^(1[0-9]|[2-9][0-9]|100)$/;

    if (!numberRegex.test(partnerAge)) {
      setIsAgeValid(false);
      setAgeError("Only numbers are allowed.");
      return;
    }

    if (!ageRangeRegex.test(partnerAge)) {
      setIsAgeValid(false);
      setAgeError("Must be 10-100.");
      return;
    }

    setIsAgeValid(true);
    setAgeError("");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Partner Profile Card */}
        <View style={styles.partnersCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarNameContainer}>
              <Avatar gradient={["#ff0262", "#ffffff"]} style={styles.avatar} />
              <View style={styles.nameAgeContainer}>
                {isEditing ? (
                  <View>
                    <TextInput
                      style={[
                        styles.nameInput,
                        !isNameValid && { borderColor: colors.secondary },
                      ]}
                      value={partnerName}
                      onChangeText={setPartnerName}
                      placeholder="Name"
                      placeholderTextColor={"#D4D4D4"}
                      onEndEditing={handleNameSubmit}
                    />
                    {!isNameValid && (
                      <Text style={styles.nameErrorText}>{nameError}</Text>
                    )}
                  </View>
                ) : (
                  <Text style={styles.profileName}>{partnerName}</Text>
                )}

                {isEditing ? (
                  <View>
                    <TextInput
                      style={[
                        styles.ageInput,
                        !isAgeValid && { borderColor: colors.secondary },
                      ]}
                      value={partnerAge}
                      onChangeText={setPartnerAge}
                      placeholder="Age"
                      placeholderTextColor={"#D4D4D4"}
                      keyboardType="numeric"
                      onEndEditing={handleAgeSubmit}
                    />
                    {!isAgeValid && (
                      <Text style={styles.errorText}>{ageError}</Text>
                    )}
                  </View>
                ) : (
                  <Text style={styles.profileAge}>{partnerAge} years old</Text>
                )}
              </View>
            </View>
            <View style={styles.actionIconsContainer}>
              <TouchableOpacity
                onPress={isEditing ? handleSave : handleEditToggle}
                style={styles.iconButton}
              >
                <Ionicons
                  name={isEditing ? "save" : "pencil"}
                  size={24}
                  color={colors.secondaryBackground}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.iconButton}
              >
                <Ionicons
                  name="trash"
                  size={24}
                  color={colors.secondaryBackground}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Personality:</Text>
              {isEditing ? (
                <Dropdown
                  label="Personality"
                  options={["Introvert", "Extrovert"]}
                  selectedValue={partnerPersonality}
                  onValueChange={setPartnerPersonality}
                />
              ) : (
                <Text style={styles.personalityText}>{partnerPersonality}</Text>
              )}
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Loves:</Text>
              {isEditing ? (
                <View
                  style={[
                    styles.inputContainer,
                    !isLovesValid && { borderColor: colors.secondary },
                  ]}
                >
                  <View style={styles.chipsContainer}>
                    {partnerLoves.map((interest, index) => (
                      <View key={index} style={styles.chip}>
                        <Text style={styles.chipText}>{interest}</Text>
                        <TouchableOpacity onPress={() => removeInterest(index)}>
                          <Ionicons
                            name="close"
                            size={16}
                            color={colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                    <TextInput
                      style={styles.textInput}
                      placeholder={
                        partnerLoves.length === 0 ? "Separate by comma" : ""
                      }
                      value={inputText}
                      onChangeText={handleInputChange}
                      returnKeyType="done"
                      onSubmitEditing={handleLovesSubmit}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.description}>
                    {partnerLoves.join(", ")}
                  </Text>
                </View>
              )}
              {!isLovesValid && (
                <Text style={styles.errorText}>{lovesError}</Text>
              )}
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Food preferences:</Text>
              {isEditing ? (
                <TouchableOpacity
                  style={styles.dietButton}
                  onPress={openDietModal}
                >
                  <Text style={styles.editDietButtonText}>
                    Click to edit dietary preferences
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.dietButtonContainer}>
                  {selectedDiet.map((diet) => (
                    <View key={diet} style={styles.dietWrapper}>
                      <Image
                        source={
                          darkDietIcons[diet as keyof typeof darkDietIcons]
                        }
                        style={styles.dietIcon}
                      />
                      <Text style={styles.dietText}>{diet}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        <Text style={styles.header}>Dates History</Text>

        {/* Date History List */}
        <DateHistoryList
          histories={histories}
          onActionPress={handleFavoriteToggle}
          showAvatar={false}
        />

        {/* Dietary Preferences Modal */}
        <Modal
          visible={isDietModalVisible}
          animationType="fade"
          onRequestClose={closeDietModal}
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Dietary Preferences</Text>
              <FlatList
                data={dietOptions}
                keyExtractor={(item) => item}
                renderItem={({ item: diet }) => (
                  <TouchableOpacity
                    key={diet}
                    style={[
                      styles.modalDietButton,
                      selectedDiet.includes(diet) && styles.selectedButton,
                    ]}
                    onPress={() => handleDietSelect(diet)}
                  >
                    <Image
                      source={dietIcons[diet as keyof typeof dietIcons]}
                      style={styles.modalDietIcon}
                    />
                    <Text style={styles.modalDietText}>{diet}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={closeDietModal}
              >
                <Text style={styles.modalCloseButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 25,
  },
  partnersCard: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 25,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 30,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  nameAgeContainer: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.background,
    fontFamily: "Nunito-Black",
  },
  profileAge: {
    fontSize: fontSize.md,
    color: colors.selected,
    fontFamily: "Nunito-Regular",
  },
  nameInput: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.background,
    fontFamily: "Nunito-Black",
    borderWidth: 1,
    borderColor: "#999",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 4,
  },
  ageInput: {
    fontSize: fontSize.md,
    color: colors.selected,
    fontFamily: "Nunito-Regular",
    borderWidth: 1,
    borderColor: "#999",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  actionIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    width: "100%",
    marginVertical: 15,
  },
  detailsContainer: {
    width: "100%",
  },
  detailRow: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: fontSize.xs,
    color: colors.secondaryBackground,
    marginBottom: 5,
    fontFamily: "Nunito-Bold",
  },
  personalityText: {
    fontSize: fontSize.sm,
    color: colors.selected,
    fontFamily: "Nunito-Regular",
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.selected,
    fontFamily: "Nunito-Regular",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#999",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    fontSize: fontSize.md,
    fontFamily: "Nunito-Regular",
    color: colors.primary,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 5,
    marginVertical: 5,
  },
  chipText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Bold",
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: "Nunito-Regular",
    color: colors.background,
    minWidth: 100,
  },
  errorText: {
    color: colors.secondary,
    fontSize: fontSize.xs,
    marginTop: 5,
    fontFamily: "Nunito-Regular",
  },
  nameErrorText: {
    color: colors.secondary,
    fontSize: fontSize.xs,
    marginBottom: 5,
    fontFamily: "Nunito-Regular",
  },
  input: {
    fontSize: fontSize.sm,
    padding: 10,
    borderColor: "#D5D5D5",
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    fontFamily: "Nunito-Regular",
  },
  dietButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  dietButtonText: {
    fontSize: fontSize.sm,
    color: colors.secondary,
    padding: 10,
    fontFamily: "Nunito-Regular",
  },
  dietButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  dietWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  dietIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  dietText: {
    fontSize: fontSize.sm,
    color: colors.selected,
    marginRight: 8,
    fontFamily: "Nunito-Regular",
  },
  selectedButton: {
    backgroundColor: colors.selected,
  },
  editDietButtonText: {
    color: colors.secondary,
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Regular",
  },
  header: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Nunito-Black",
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
  modalTitle: {
    fontSize: fontSize.md,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.primary,
    fontFamily: "Nunito-Black",
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
  modalCloseButtonText: {
    color: colors.primary,
    fontSize: fontSize.md,
    textAlign: "center",
    fontFamily: "Nunito-Bold",
  },
  modalDietButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.secondaryBackground,
    margin: 5,
    paddingLeft: 10,
    color: colors.primary,
  },
  modalDietText: {
    fontSize: fontSize.md,
    color: colors.primary,
    padding: 10,
    fontFamily: "Nunito-Regular",
  },
  modalDietIcon: {
    width: 30,
    height: 30,
    marginRight: 1,
  },
});

export default PartnerDetailsScreen;
