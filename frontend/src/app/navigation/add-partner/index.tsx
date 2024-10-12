import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  Image,
  Keyboard,
} from "react-native";
import { colors, fontSize, dietIcons, gradients } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";

const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};

const AddPartnerScreen = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPersonality, setSelectedPersonality] = useState("");
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [partnerName, setPartnerName] = useState("");
  const [partnerLoves, setPartnerLoves] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [partnerAge, setPartnerAge] = useState("");

  const [ageError, setAgeError] = useState("");
  const [isAgeValid, setIsAgeValid] = useState(true);
  const [nameError, setNameError] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  const [isLovesValid, setIsLovesValid] = useState(true);
  const [lovesError, setLovesError] = useState("");

  const [partnerGradient, setPartnerGradient] =
    useState<string[]>(getRandomGradient);

  const morphScale = useRef(new Animated.Value(0.8)).current;
  const morphOpacity = useRef(new Animated.Value(0)).current;

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    morphIn();
  }, [step]);

  const morphIn = () => {
    morphScale.setValue(0.8);
    morphOpacity.setValue(0);
    Animated.parallel([
      Animated.spring(morphScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }),
      Animated.timing(morphOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const morphOut = (nextStep: number) => {
    Animated.parallel([
      Animated.timing(morphScale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(morphOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStep(nextStep);
      morphIn();
    });
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    morphOut(1);
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
      setAgeError("Age must be between 10 and 100.");
      return;
    }

    setIsAgeValid(true);
    setAgeError("");
    morphOut(2);
  };

  const handlePersonalitySelect = (personality: string) => {
    setSelectedPersonality(personality);
    morphOut(4);
  };

  const handleDietSelect = (diet: string) => {
    setSelectedDiet((prevSelectedDiet) => {
      if (prevSelectedDiet.includes(diet)) {
        return prevSelectedDiet.filter((item) => item !== diet);
      } else {
        return [...prevSelectedDiet, diet];
      }
    });
  };

  const handleNameSubmit = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const nameLength = partnerName.trim().length;

    if (!nameRegex.test(partnerName)) {
      setIsNameValid(false);
      setNameError("Name can only contain English letters and spaces.");
      return;
    }

    if (nameLength < 2 || nameLength > 18) {
      setIsNameValid(false);
      setNameError("Name must be between 2 and 18 letters.");
      return;
    }

    setIsNameValid(true);
    setNameError("");
    morphOut(3);
  };

  const handleInputChange = (text: string) => {
    if (text.includes(",")) {
      const interests = text.split(",");
      interests.forEach((interest) => {
        const trimmedInterest = interest.trim();
        if (trimmedInterest.length > 0) {
          if (/^[A-Za-z\s]+$/.test(trimmedInterest)) {
            setPartnerLoves((prev) => [...prev, trimmedInterest]);
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
      } else {
        setIsLovesValid(false);
        setLovesError("Interests can only contain letters and spaces.");
        return;
      }
      setInputText("");
    }

    if (partnerLoves.length < 3) {
      setIsLovesValid(false);
      setLovesError("Please enter at least 3 interests.");
      return;
    }

    setIsLovesValid(true);
    setLovesError("");
    Keyboard.dismiss();
    morphOut(5);
  };

  // Add partner to DB here
  const handleFinish = () => {
    console.log("Partner Info:", {
      gender: selectedGender,
      age: partnerAge,
      name: partnerName,
      personality: selectedPersonality,
      loves: partnerLoves.join(", "),
      diet:
        selectedDiet.length > 0
          ? selectedDiet.join(", ")
          : "No dietary preference",
      avatarGradient: partnerGradient,
    });

    router.replace("/partners");
  };

  const handleBack = () => {
    if (step > 0) {
      morphOut(step - 1);
    }
  };

  const validIcons = [
    "heart",
    "man",
    "woman",
    "people",
    "leaf",
    "arrow-back",
  ] as const;
  type IconName = (typeof validIcons)[number];

  const GradientIcon: React.FC<{
    name: IconName;
    size: number;
    color: string;
  }> = ({ name, size, color }) => {
    return (
      <MaskedView
        maskElement={<Ionicons name={name} size={size} color={color} />}
      >
        <LinearGradient
          colors={[color, colors.primary]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: size, height: size }}
        />
      </MaskedView>
    );
  };

  return (
    <View style={styles.container}>
      {step > 0 && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      )}

      <Animated.View
        style={[
          styles.stepContainer,
          {
            transform: [{ scale: morphScale }],
            opacity: morphOpacity,
          },
        ]}
      >
        {step === 0 && (
          <>
            <Text style={styles.questionText}>Who is your partner?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === "Female" && styles.selectedButton,
                ]}
                onPress={() => handleGenderSelect("Female")}
              >
                <GradientIcon name="heart" size={50} color="#ff6dcd" />
                <Text style={styles.genderText}>Female</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === "Male" && styles.selectedButton,
                ]}
                onPress={() => handleGenderSelect("Male")}
              >
                <GradientIcon name="heart" size={50} color="#4da9ff" />
                <Text style={styles.genderText}>Male</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {step === 1 && (
          <View>
            <Text style={styles.questionText}>
              What's {selectedGender === "Female" ? "her" : "his"} age?
            </Text>
            <TextInput
              style={[
                styles.input,
                !isAgeValid && { borderBottomColor: colors.secondary },
              ]}
              placeholder={`Enter ${selectedGender === "Female" ? "her" : "his"} age`}
              value={partnerAge}
              onChangeText={setPartnerAge}
              autoFocus
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={handleAgeSubmit}
            />
            {!isAgeValid && <Text style={styles.errorText}>{ageError}</Text>}
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.questionText}>
              What is {selectedGender === "Female" ? "her" : "his"} name?
            </Text>
            <TextInput
              style={[
                styles.input,
                !isNameValid && { borderBottomColor: colors.secondary },
              ]}
              placeholder={`Enter ${selectedGender === "Female" ? "her" : "his"} name`}
              value={partnerName}
              onChangeText={setPartnerName}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleNameSubmit}
            />
            {!isNameValid && <Text style={styles.errorText}>{nameError}</Text>}
          </View>
        )}

        {step === 3 && (
          <>
            <Text style={styles.questionText}>
              What's {selectedGender === "Female" ? "her" : "his"} personality
              type?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedPersonality === "Introvert" && styles.selectedButton,
                ]}
                onPress={() => handlePersonalitySelect("Introvert")}
              >
                <GradientIcon
                  name={selectedGender === "Female" ? "woman" : "man"}
                  size={50}
                  color={colors.secondary}
                />
                <Text style={styles.genderText}>Introvert</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedPersonality === "Extrovert" && styles.selectedButton,
                ]}
                onPress={() => handlePersonalitySelect("Extrovert")}
              >
                <GradientIcon
                  name="people"
                  size={50}
                  color={colors.secondary}
                />
                <Text style={styles.genderText}>Extrovert</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {step === 4 && (
          <View>
            <Text style={styles.questionText}>
              What does {selectedGender === "Female" ? "she" : "he"} love?
            </Text>
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
                      <Ionicons name="close" size={16} color={colors.primary} />
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
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={handleLovesSubmit}
                />
              </View>
            </View>
            {!isLovesValid && (
              <Text style={styles.errorText}>{lovesError}</Text>
            )}
            <Text style={styles.helperText}>
              *Answer as broad as you can, following example shown below.*
            </Text>
            <Text style={styles.exampleText}>
              Example: Sunsets, concerts, Thai food, art, John Wick, horses.
            </Text>
          </View>
        )}

        {step === 5 && (
          <>
            <Text style={styles.questionText}>
              What is {selectedGender === "Female" ? "her" : "his"} dietary
              preference?
            </Text>
            <View style={styles.dietButtonContainer}>
              {Object.keys(dietIcons).map((diet) => (
                <TouchableOpacity
                  key={diet}
                  style={[
                    styles.dietButton,
                    selectedDiet.includes(diet) && styles.selectedButton,
                  ]}
                  onPress={() => handleDietSelect(diet)}
                >
                  <Image
                    source={dietIcons[diet as keyof typeof dietIcons]}
                    style={styles.dietIcon}
                  />
                  <Text style={styles.dietText}>{diet}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinish}
            >
              <LinearGradient
                colors={[colors.secondary, colors.primary]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 1, y: 1.5 }}
                style={styles.generateButtonGradient}
              >
                <Text style={styles.finishText}>
                  {selectedDiet.length > 0 ? "Finish" : "Skip & Finish"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontFamily: "Nunito-Regular",
    marginLeft: 5,
  },
  stepContainer: {
    flex: 1,
  },
  questionText: {
    fontSize: 25,
    color: colors.primary,
    fontFamily: "Nunito-Bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "85%",
    gap: 20,
  },
  genderButton: {
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    flex: 1,
    backgroundColor: colors.secondaryBackground,
  },
  selectedButton: {
    backgroundColor: "#333",
  },
  genderText: {
    fontSize: fontSize.md,
    fontFamily: "Nunito-Regular",
    color: colors.primary,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    width: "80%",
    padding: 10,
    fontSize: fontSize.md,
    fontFamily: "Nunito-Regular",
    color: colors.primary,
  },
  errorText: {
    color: colors.secondary,
    fontSize: fontSize.xs,
    marginTop: 5,
  },
  helperText: {
    marginTop: 10,
    fontSize: fontSize.xs,
    fontFamily: "Nunito-Regular",
    color: colors.primary,
  },
  exampleText: {
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Italic",
    color: "#777",
    marginTop: 5,
  },
  dietButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  dietButton: {
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 10,
    width: "28%",
  },
  dietIcon: {
    width: 40,
    height: 40,
    margin: 5,
  },
  dietText: {
    fontSize: 14,
    fontFamily: "Nunito-Regular",
    color: colors.primary,
    textAlign: "center",
  },
  finishButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  generateButtonGradient: {
    paddingVertical: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },
  finishText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontFamily: "Nunito-Black",
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 5,
    marginVertical: 5,
  },
  chipText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Regular",
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: "Nunito-Regular",
    color: colors.primary,
    minWidth: 100,
  },
});

export default AddPartnerScreen;
