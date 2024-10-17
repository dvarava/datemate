import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize } from "@/constants/tokens";
import { useFocusEffect, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Profile } from "@/types/profile";
import SubscriptionGuard from "@/guards/SubscriptionGuard";
import PartnersList from "@/components/PartnersList";
import Avatar from "@/components/Avatar";
import CustomSlider from "@/components/CustomSlider";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDateStore } from "@/store/dateStore";

const GenerateDateScreen = () => {
  const router = useRouter();
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [activityAmount, setActivityAmount] = useState(3);
  const [budget, setBudget] = useState(100);
  const [moodSelection, setMoodSelection] = useState<string[]>([]);
  const [adjustToWeather, setAdjustToWeather] = useState<boolean | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [duration, setDuration] = useState(30);
  const [preference, setPreference] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [locationCoords, setLocationCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [currentLocationAddress, setCurrentLocationAddress] = useState<
    string | null
  >(null);
  const [otherLocationAddress, setOtherLocationAddress] = useState<
    string | null
  >(null);
  const [showInfo, setShowInfo] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchLocationModalVisible, setSearchLocationModalVisible] =
    useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { generateDatePlan } = useDateStore();

  const scrollViewRef = useRef<ScrollView>(null);

  const partners: Profile[] = [
    { id: "1", name: "Anna", age: 21, avatarGradient: ["#ff0262", "#fff"] },
    { id: "2", name: "Diana", age: 23, avatarGradient: ["#4469d2", "#fff"] },
    { id: "3", name: "Tamara", age: 48, avatarGradient: ["#d244ac", "#fff"] },
  ];

  useFocusEffect(
    useCallback(() => {
      setActivityAmount(3);
      setBudget(100);
      setMoodSelection([]);
      setAdjustToWeather(null);
      setSelectedTime(null);
      setDuration(30);
      setPreference(null);
      setSelectedLocation(null);
      setLocationCoords(null);
      setShowInfo(null);
      setSelectedPartner(null);
      setModalVisible(false);

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    }, [])
  );

  const handleInfoPress = (field: string) => {
    setShowInfo(field === showInfo ? null : field);
  };

  const handleScreenPress = () => {
    setShowInfo(null);
  };

  const handleGenerate = async () => {
    if (isFetchingLocation) {
      Alert.alert("Location Error", "Please wait until we get your location.");
      return;
    }

    if (!selectedPartner) {
      Alert.alert("Error", "Please choose a partner before proceeding.");
      return;
    }

    if (!activityAmount || !preference || !selectedLocation) {
      Alert.alert(
        "Error",
        "Please fill out all required fields before proceeding."
      );
      return;
    }

    if (selectedLocation === "otherLocation" && !otherLocationAddress) {
      Alert.alert("Error", "Please select a valid location.");
      return;
    }

    if (isSubscribed) {
      if (
        !budget ||
        moodSelection.length === 0 ||
        adjustToWeather === null ||
        !selectedTime ||
        !duration
      ) {
        Alert.alert("Error", "Please fill out all fields before proceeding.");
        return;
      }
    }

    const locationAddress =
      selectedLocation === "myLocation"
        ? currentLocationAddress
        : otherLocationAddress;

    const data = {
      activityAmount,
      budget,
      moodSelection,
      adjustToWeather,
      selectedTime,
      duration,
      preference,
      selectedLocation,
      locationCoords,
      locationAddress,
      partners: selectedPartner,
    };

    setIsGenerating(true);
    try {
      await generateDatePlan(data);
      setIsGenerating(false);
      router.push({
        pathname: "/navigation/date-plan",
        params: {
          showRegenerateButton: "true",
        },
      });
    } catch (error) {
      setIsGenerating(false);
      Alert.alert("Error", "Failed to generate date plan.");
    }
  };

  const handleMoodSelection = (mood: string) => {
    if (moodSelection.includes(mood)) {
      setMoodSelection(moodSelection.filter((m) => m !== mood));
    } else if (moodSelection.length < 2) {
      setMoodSelection([...moodSelection, mood]);
    }
  };

  const handleLocationSelect = async (location: string) => {
    if (location === "myLocation") {
      setSelectedLocation(location);
      setIsFetchingLocation(true);
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Permission to access location was denied");
        }

        let userLocation = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        };
        setLocationCoords(coords);

        const address = await Location.reverseGeocodeAsync(coords);
        setCurrentLocationAddress(
          `${address[0].street}, ${address[0].city}, ${address[0].country}`
        );
      } catch (error: any) {
        Alert.alert("Error", error.message);
        setSelectedLocation(null);
      } finally {
        setIsFetchingLocation(false);
      }
    } else if (location === "otherLocation") {
      setSearchLocationModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={isGenerating}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Generating date plan...</Text>
        </View>
      </Modal>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.partnerContainer}>
          {selectedPartner ? (
            <View style={styles.profileContainer}>
              <View style={styles.profileInfo}>
                <Avatar
                  gradient={["#ff0262", "#ffffff"]}
                  style={styles.avatar}
                />
                <Text style={styles.partnerText}>{selectedPartner}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons
                  name="sync-sharp"
                  size={24}
                  color={colors.background}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addButtonText}>Click to choose partner</Text>
            </TouchableOpacity>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.safeAreaViewTop}>
            <View style={styles.header}>
              <Text style={styles.appName}>Choose Partner</Text>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <View style={styles.modalContent}>
            <PartnersList
              profiles={partners}
              showActions={false}
              onSelect={(partner) => {
                setSelectedPartner(`${partner.name}, ${partner.age}`);
                setModalVisible(false);
              }}
            />
          </View>
        </Modal>

        <TouchableWithoutFeedback onPress={handleScreenPress}>
          <View>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Number of activities</Text>
                <TouchableOpacity onPress={() => handleInfoPress("activities")}>
                  <Ionicons
                    name="information-circle-outline"
                    size={18}
                    style={styles.infoIcon}
                  />
                </TouchableOpacity>
              </View>
              {showInfo === "activities" && (
                <View style={[styles.infoContainer, { top: -49, left: 90 }]}>
                  <Text style={styles.infoText}>
                    Select how many activities you want in your date.
                  </Text>
                </View>
              )}
              <View style={styles.sliderContainer}>
                <CustomSlider
                  value={activityAmount}
                  onValueChange={(value) => setActivityAmount(value)}
                  minimumValue={1}
                  maximumValue={5}
                  step={1}
                />
              </View>
              <Text style={styles.sliderValue}>{activityAmount}</Text>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Choose location</Text>
                <TouchableOpacity onPress={() => handleInfoPress("location")}>
                  <Ionicons
                    name="information-circle-outline"
                    size={18}
                    style={styles.infoIcon}
                  />
                </TouchableOpacity>
              </View>
              {showInfo === "location" && (
                <View
                  style={[
                    styles.infoContainer,
                    { top: -49, left: 70, width: 140 },
                  ]}
                >
                  <Text style={styles.infoText}>
                    Select the location for your date.
                  </Text>
                </View>
              )}
              <View style={styles.locationContainer}>
                <View style={styles.locationButtonsContainer}>
                  {/* My Location Button */}
                  <TouchableOpacity
                    style={[
                      styles.locationButton,
                      selectedLocation === "myLocation" &&
                        styles.selectedButton,
                    ]}
                    onPress={() => handleLocationSelect("myLocation")}
                  >
                    <Ionicons
                      name="location"
                      size={24}
                      color={colors.primary}
                    />
                    <Text
                      style={[
                        styles.locationText,
                        selectedLocation === "myLocation" &&
                          styles.selectedText,
                      ]}
                    >
                      My location (15 km radius)
                    </Text>
                  </TouchableOpacity>

                  {/* Other Location Button */}
                  <TouchableOpacity
                    style={[
                      styles.locationButton,
                      selectedLocation === "otherLocation" &&
                        styles.selectedButton,
                    ]}
                    onPress={() => handleLocationSelect("otherLocation")}
                  >
                    <Ionicons name="earth" size={24} color={colors.primary} />
                    <Text
                      style={[
                        styles.locationText,
                        selectedLocation === "otherLocation" &&
                          styles.selectedText,
                      ]}
                    >
                      Other
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.addressContainer}>
                  {/* Show "Getting your location..." while fetching */}
                  {isFetchingLocation && selectedLocation === "myLocation" && (
                    <Text style={styles.addressText}>
                      Getting your location...
                    </Text>
                  )}

                  {/* Address under My Location */}
                  {!isFetchingLocation &&
                    currentLocationAddress &&
                    selectedLocation === "myLocation" && (
                      <Text style={styles.addressText}>
                        {currentLocationAddress}
                      </Text>
                    )}

                  {/* Address under Other Location */}
                  {otherLocationAddress &&
                    selectedLocation === "otherLocation" && (
                      <Text style={styles.addressText}>
                        {otherLocationAddress}
                      </Text>
                    )}
                </View>
              </View>
            </View>

            <Modal
              animationType="slide"
              transparent={false}
              visible={searchLocationModalVisible}
              onRequestClose={() => setSearchLocationModalVisible(false)}
            >
              <SafeAreaView style={styles.safeAreaViewTop}>
                <View style={styles.header}>
                  <Text style={styles.appName}>Search Location</Text>
                  <TouchableOpacity
                    style={styles.closeModalButton}
                    onPress={() => setSearchLocationModalVisible(false)}
                  >
                    <Ionicons name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
              <View style={styles.modalContent}>
                <GooglePlacesAutocomplete
                  placeholder="Search for a location"
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    const selectedAddress = details?.formatted_address ?? null;
                    const coords = details?.geometry?.location;

                    if (coords && selectedAddress) {
                      setLocationCoords({
                        latitude: coords.lat,
                        longitude: coords.lng,
                      });
                      setOtherLocationAddress(selectedAddress);
                      setSelectedLocation("otherLocation");
                      setSearchLocationModalVisible(false);
                    } else {
                      Alert.alert("Error", "Please select a valid location.");
                    }
                  }}
                  query={{
                    key: "AIzaSyBbDqckE5OVpDbYXloJOoF8saCf6DqnxRk",
                    language: "en",
                  }}
                  styles={{
                    textInputContainer: {
                      width: "100%",
                    },
                    textInput: {
                      height: 45,
                      borderRadius: 5,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      fontSize: 16,
                      borderWidth: 1,
                      borderColor: "#ccc",
                    },
                    listView: {
                      backgroundColor: "#fff",
                    },
                  }}
                  enablePoweredByContainer={false}
                  textInputProps={{
                    placeholderTextColor: "#D4D4D4",
                  }}
                />
              </View>
            </Modal>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  What environment do you prefer?
                </Text>
                <TouchableOpacity onPress={() => handleInfoPress("preference")}>
                  <Ionicons
                    name="information-circle-outline"
                    size={18}
                    style={styles.infoIcon}
                  />
                </TouchableOpacity>
              </View>
              {showInfo === "preference" && (
                <View style={[styles.infoContainer, { top: -65, left: 170 }]}>
                  <Text style={styles.infoText}>
                    Select whether you prefer your date to be indoors, outdoors,
                    or a mix of both.
                  </Text>
                </View>
              )}
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    preference === "indoors" && styles.selectedButton,
                  ]}
                  onPress={() => setPreference("indoors")}
                >
                  <Text style={styles.toggleButtonText}>Indoors</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    preference === "outdoors" && styles.selectedButton,
                  ]}
                  onPress={() => setPreference("outdoors")}
                >
                  <Text style={styles.toggleButtonText}>Outdoors</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    preference === "mix" && styles.selectedButton,
                  ]}
                  onPress={() => setPreference("mix")}
                >
                  <Text style={styles.toggleButtonText}>Mix</Text>
                </TouchableOpacity>
              </View>
            </View>

            <SubscriptionGuard
              isPremium={isSubscribed}
              lockedTextPaddingVertical={5}
              lockedText="Determine budget"
            >
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Determine budget</Text>
                  <TouchableOpacity onPress={() => handleInfoPress("budget")}>
                    <Ionicons
                      name="information-circle-outline"
                      size={18}
                      style={styles.infoIcon}
                    />
                  </TouchableOpacity>
                </View>
                {showInfo === "budget" && (
                  <View
                    style={[
                      styles.infoContainer,
                      { top: -49, left: 95, width: 125 },
                    ]}
                  >
                    <Text style={styles.infoText}>
                      Set your budget for the date.
                    </Text>
                  </View>
                )}
                <View style={styles.sliderContainer}>
                  <CustomSlider
                    value={budget}
                    onValueChange={(value) => setBudget(value)}
                    minimumValue={0}
                    maximumValue={200}
                    step={25}
                  />
                </View>
                <Text style={styles.sliderValue}>{`${budget}$`}</Text>
              </View>
            </SubscriptionGuard>

            <SubscriptionGuard
              isPremium={isSubscribed}
              lockedTextPaddingVertical={5}
              lockedText="Choose date mood"
            >
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Pick 1 or 2 moods</Text>
                  <TouchableOpacity onPress={() => handleInfoPress("moods")}>
                    <Ionicons
                      name="information-circle-outline"
                      size={18}
                      style={styles.infoIcon}
                    />
                  </TouchableOpacity>
                </View>
                {showInfo === "moods" && (
                  <View
                    style={[
                      styles.infoContainer,
                      { top: -49, left: 85, width: 135 },
                    ]}
                  >
                    <Text style={styles.infoText}>
                      Select your moods for the date.
                    </Text>
                  </View>
                )}
                <View style={styles.moodContainer}>
                  {[
                    "Romantic",
                    "Chill",
                    "Silly",
                    "Cozy",
                    "Active",
                    "Intimate",
                    "Serious",
                    "Elegant",
                    "Intelligent",
                  ].map((mood) => (
                    <TouchableOpacity
                      key={mood}
                      style={[
                        styles.moodButton,
                        moodSelection.includes(mood) && styles.selectedButton,
                      ]}
                      onPress={() => handleMoodSelection(mood)}
                    >
                      <Text style={styles.toggleButtonText}>{mood}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </SubscriptionGuard>

            <SubscriptionGuard
              isPremium={isSubscribed}
              lockedTextPaddingVertical={5}
              lockedText="Adjust to weather"
            >
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    Adjust to the weather?
                  </Text>
                  <TouchableOpacity onPress={() => handleInfoPress("weather")}>
                    <Ionicons
                      name="information-circle-outline"
                      size={18}
                      style={styles.infoIcon}
                    />
                  </TouchableOpacity>
                </View>
                {showInfo === "weather" && (
                  <View style={[styles.infoContainer, { top: -63, left: 110 }]}>
                    <Text style={styles.infoText}>
                      Choose whether to adjust your date activities based on the
                      weather.
                    </Text>
                  </View>
                )}
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      adjustToWeather === true && styles.selectedButton,
                    ]}
                    onPress={() => setAdjustToWeather(true)}
                  >
                    <Text style={styles.toggleButtonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      adjustToWeather === false && styles.selectedButton,
                    ]}
                    onPress={() => setAdjustToWeather(false)}
                  >
                    <Text style={styles.toggleButtonText}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SubscriptionGuard>

            <SubscriptionGuard
              isPremium={isSubscribed}
              lockedTextPaddingVertical={5}
              lockedText="Set date daytime"
            >
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    When do you want your date?
                  </Text>
                  <TouchableOpacity onPress={() => handleInfoPress("time")}>
                    <Ionicons
                      name="information-circle-outline"
                      size={18}
                      style={styles.infoIcon}
                    />
                  </TouchableOpacity>
                </View>
                {showInfo === "time" && (
                  <View
                    style={[
                      styles.infoContainer,
                      { top: -63, left: 169, width: 170 },
                    ]}
                  >
                    <Text style={styles.infoText}>
                      Select a time of day for your date: morning, afternoon, or
                      evening.
                    </Text>
                  </View>
                )}
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      selectedTime === "morning" && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedTime("morning")}
                  >
                    <Text style={styles.toggleButtonText}>Morning</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      selectedTime === "afternoon" && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedTime("afternoon")}
                  >
                    <Text style={styles.toggleButtonText}>Afternoon</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      selectedTime === "evening" && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedTime("evening")}
                  >
                    <Text style={styles.toggleButtonText}>Evening</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SubscriptionGuard>

            <SubscriptionGuard
              isPremium={isSubscribed}
              lockedTextPaddingVertical={5}
              lockedText="Duration of the date"
            >
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    Choose duration of the date
                  </Text>
                  <TouchableOpacity onPress={() => handleInfoPress("duration")}>
                    <Ionicons
                      name="information-circle-outline"
                      size={18}
                      style={styles.infoIcon}
                    />
                  </TouchableOpacity>
                </View>
                {showInfo === "duration" && (
                  <View style={[styles.infoContainer, { top: -62, left: 155 }]}>
                    <Text style={styles.infoText}>
                      Select the duration of your date, from 30 minutes to 8
                      hours.
                    </Text>
                  </View>
                )}
                <CustomSlider
                  value={duration}
                  onValueChange={(value) => setDuration(value)}
                  minimumValue={30}
                  maximumValue={300}
                  step={30}
                />
                <Text style={styles.sliderValue}>
                  {duration >= 60
                    ? `${Math.floor(duration / 60)}h ${
                        duration % 60 > 0 ? `${duration % 60}min` : ""
                      }`
                    : `${duration}min`}
                </Text>
              </View>
            </SubscriptionGuard>

            <TouchableOpacity
              style={[
                styles.generateButton,
                (isGenerating || isFetchingLocation) &&
                  styles.generateButtonDisabled,
              ]}
              onPress={handleGenerate}
              disabled={isGenerating || isFetchingLocation}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                start={{ x: 2, y: 0 }}
                end={{ x: 1, y: 3 }}
                style={styles.generateButtonGradient}
              >
                {isGenerating ? (
                  <ActivityIndicator size="small" color={colors.background} />
                ) : (
                  <Text style={styles.generateButtonText}>GENERATE</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default GenerateDateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 70,
    padding: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingText: {
    marginTop: 20,
    color: colors.primary,
    fontSize: fontSize.md,
    fontFamily: "Nunito-Bold",
  },
  partnerContainer: {
    marginBottom: 20,
  },
  profileContainer: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 5,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  partnerText: {
    fontSize: fontSize.md,
    color: colors.background,
    marginLeft: 10,
    fontFamily: "Nunito-Black",
  },
  addButton: {
    backgroundColor: "#333",
    borderRadius: 25,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#555",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#aaa",
    fontSize: 16,
    fontFamily: "Nunito-Regular",
  },
  safeAreaViewTop: {
    backgroundColor: colors.secondaryBackground,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16.5,
    paddingHorizontal: 25,
  },
  closeModalButton: {
    position: "absolute",
    right: 25,
  },
  appName: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Black",
  },
  modalContent: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: fontSize.md,
    color: colors.primary,
    marginBottom: 12,
    fontFamily: "Nunito-Bold",
  },
  infoContainer: {
    position: "absolute",
    zIndex: 10,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 8,
    width: 180,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    elevation: 8,
  },
  infoText: {
    color: colors.background,
    fontSize: 12,
  },
  infoIcon: {
    marginLeft: 3,
    marginBottom: 10,
    color: colors.primary,
  },
  sliderContainer: {
    width: "100%",
    position: "relative",
  },
  sliderValue: {
    fontSize: fontSize.md,
    color: colors.primary,
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "column",
    gap: 10,
  },
  locationButtonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  addressContainer: {
    flexDirection: "row",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    padding: 10,
    borderRadius: 10,
    gap: 5,
  },
  locationText: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: "Nunito-Regular",
  },
  searchText: {
    color: colors.background,
  },
  addressText: {
    color: colors.primary,
  },
  selectedButton: {
    backgroundColor: colors.selected,
  },
  selectedText: {
    color: colors.primary,
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 10,
    width: "32%",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: "Nunito-Regular",
  },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  moodButton: {
    backgroundColor: colors.secondaryBackground,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "32%",
    justifyContent: "center",
    alignItems: "center",
  },
  generateButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  generateButtonGradient: {
    paddingVertical: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },
  generateButtonText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontFamily: "Nunito-Black",
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
});
