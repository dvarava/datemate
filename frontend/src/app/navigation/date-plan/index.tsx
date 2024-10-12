import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
} from "react-native";
import { colors, fontSize } from "@/constants/tokens";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import SubscriptionGuard from "@/guards/SubscriptionGuard";
import DateTimePicker from "@react-native-community/datetimepicker";

const heartsBranchFirst = require("@/assets/branches/hearts_branch_1.png");
const heartsBranchSecond = require("@/assets/branches/hearts_branch_2.png");
const heartsBranchThird = require("@/assets/branches/hearts_branch_3.png");
const heartsBranchFourth = require("@/assets/branches/hearts_branch_4.png");

type Activity = {
  title: string;
  location: string;
  address: string;
  cost: string;
  briefDescription: string;
};

const DatePlanScreen: React.FC = () => {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const handleRegenerate = () => {
    router.back();
  };

  const handleAddToFavourites = () => {
    setIsFavourite(!isFavourite);
    // TODO: Pass favourite data to the database
  };

  const handleAddToCalendar = () => {
    setShowDatePicker(true);
    setCalendarModalVisible(true);
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setSelectedDate(currentDate);
  };

  const handleScheduleDate = () => {
    console.log("Scheduled Date: ", selectedDate.toLocaleDateString());
    setCalendarModalVisible(false);
    // TODO: Pass selectedDate to the database for calendar event
  };

  const handleInfoPress = (index: number) => {
    setSelectedActivity(activityDetails[index]);
    setModalVisible(true);
  };

  // TODO: Replace hardcoded activities with data from the database
  const activityDetails: Activity[] = [
    {
      title: "Pizza & Sunset",
      location: "Chilli Pizza",
      address: "Dzimavu Street 23",
      cost: "$30",
      briefDescription: "Enjoy a delicious pizza while watching the sunset.",
    },
    {
      title: "Movie Night",
      location: "Central Cinema",
      address: "Main Street 45",
      cost: "$20",
      briefDescription: "Catch the latest blockbuster at the cinema.",
    },
    {
      title: "Horse Riding",
      location: "Sunset Ranch",
      address: "Greenway 12",
      cost: "$50",
      briefDescription: "Experience horse riding at the beautiful ranch.",
    },
    {
      title: "Art Museum Visit",
      location: "National Gallery",
      address: "Liberty Avenue 5",
      cost: "$15",
      briefDescription: "Explore art masterpieces at the gallery.",
    },
    {
      title: "Concert",
      location: "City Arena",
      address: "Stadium Road 3",
      cost: "$40",
      briefDescription: "Enjoy live music at the arena.",
    },
  ];

  const renderPlanCards = () => {
    const branches = [
      { src: heartsBranchFirst, style: styles.branchFirst },
      { src: heartsBranchSecond, style: styles.branchSecond },
      { src: heartsBranchThird, style: styles.branchThird },
      { src: heartsBranchFourth, style: styles.branchFourth },
    ];

    return activityDetails.map((activity, index) => {
      const isLeft = index % 2 === 0;
      return (
        <React.Fragment key={index}>
          <View
            style={[
              styles.planCard,
              isLeft ? styles.leftCard : styles.rightCard,
              (index === 2 || index === 4) && styles.alignedLeftCard,
            ]}
          >
            <Text style={styles.cardTitle}>{activity.title}</Text>
            <View style={styles.cardDetailContainer}>
              <Ionicons
                name="storefront-outline"
                size={10}
                color={colors.background}
                style={styles.locationIcon}
              />
              <Text style={styles.cardDetail}>{activity.location}</Text>
            </View>
            <View style={styles.cardDetailContainer}>
              <Ionicons
                name="location-outline"
                size={10}
                color={colors.background}
                style={styles.locationIcon}
              />
              <Text style={styles.cardDetail}>{activity.address}</Text>
            </View>
            <SubscriptionGuard
              isPremium={false}
              lockedText="Cost: "
              textStyle={{ fontSize: fontSize.xs }}
              iconSize={14}
              lockedTextMarginRight={0}
            >
              <Text style={styles.cardDetail}>Cost: {activity.cost}</Text>
            </SubscriptionGuard>
            <TouchableOpacity
              onPress={() => handleInfoPress(index)}
              style={styles.infoIcon}
            >
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={colors.background}
              />
            </TouchableOpacity>
          </View>
          {index < activityDetails.length - 1 && (
            <Image
              source={branches[index % 4].src}
              style={[styles.branch, branches[index % 4].style]}
            />
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.title}>
            Perfect date plan for {"\n"}You & Anna
          </Text>
          <View style={styles.datePlan}>{renderPlanCards()}</View>

          <View style={styles.detailsContainer}>
            {[
              "Date mood",
              "Adjust to weather",
              "Time of the day",
              "Date duration",
              "Area preference",
              "Level of risk",
              "Initial budget",
              "Total cost",
            ].map((detail) => (
              <View key={detail} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{detail}:</Text>
                <SubscriptionGuard isPremium={false}>
                  <Text style={styles.detailValue}>Value here</Text>
                </SubscriptionGuard>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleAddToCalendar}
              style={styles.bottomButton}
            >
              <View style={styles.basicBottomButton}>
                <Ionicons
                  name="calendar-outline"
                  size={28}
                  color={colors.background}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAddToFavourites}
              style={styles.bottomButton}
            >
              <View style={styles.basicBottomButton}>
                <Ionicons
                  name={isFavourite ? "heart" : "heart-outline"}
                  size={28}
                  color={colors.secondary}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleRegenerate}
              style={styles.bottomButton}
            >
              <LinearGradient
                colors={[colors.secondary, colors.primary]}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 1.5 }}
                style={styles.regenerateButton}
              >
                <Ionicons
                  name="refresh-outline"
                  size={28}
                  color={colors.primary}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={calendarModalVisible}
        onRequestClose={() => setCalendarModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.calendarModalGradient}
          >
            <View style={styles.calendarModalContent}>
              <TouchableOpacity
                style={styles.modalCloseIcon}
                onPress={() => setCalendarModalVisible(false)}
              >
                <Ionicons
                  name="close-circle"
                  size={28}
                  color={colors.primary}
                />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Add to Calendar</Text>

              <View style={styles.datePickerWrapper}>
                {showDatePicker && (
                  <View style={styles.datePickerContainer}>
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="spinner"
                      onChange={onDateChange}
                      textColor={colors.primary}
                      style={{ width: 300 }}
                    />
                  </View>
                )}
              </View>

              <View style={styles.modalButtons}>
                <LinearGradient
                  colors={[colors.secondary, colors.primary]}
                  start={{ x: 0.3, y: 0 }}
                  end={{ x: 1, y: 1.5 }}
                  style={styles.scheduleButton}
                >
                  <TouchableOpacity onPress={handleScheduleDate}>
                    <Text style={styles.scheduleButtonText}>Schedule</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalGradient}
          >
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.modalCloseIcon}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons
                  name="close-circle"
                  size={28}
                  color={colors.primary}
                />
              </TouchableOpacity>
              {selectedActivity && (
                <>
                  <Text style={styles.modalTitle}>
                    {selectedActivity.title}
                  </Text>
                  <View style={styles.modalDetailRow}>
                    <Text style={styles.modalDetailTitle}>Location: </Text>
                    <Text style={styles.modalDetailText}>
                      {selectedActivity.location}
                    </Text>
                  </View>
                  <View style={styles.modalDetailRow}>
                    <Text style={styles.modalDetailTitle}>Address: </Text>
                    <Text style={styles.modalDetailText}>
                      {selectedActivity.address}
                    </Text>
                  </View>
                  <View style={styles.modalDetailRow}>
                    <SubscriptionGuard
                      isPremium={false}
                      lockedText="Cost: "
                      textStyle={{ fontSize: fontSize.md, fontWeight: "bold" }}
                      iconSize={18}
                      lockedTextMarginRight={0}
                    >
                      <Text style={styles.modalDetailTitle}>Cost: </Text>
                      <Text style={styles.modalDetailText}>
                        {selectedActivity.cost}
                      </Text>
                    </SubscriptionGuard>
                  </View>
                  <View style={styles.modalDetailRow}>
                    <Text style={styles.modalDetailTitle}>Description: </Text>
                    <Text style={styles.modalDetailText}>
                      {selectedActivity.briefDescription}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </LinearGradient>
        </View>
      </Modal>
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
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Nunito-Black",
  },
  datePlan: {
    position: "relative",
  },
  planCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    paddingBottom: 30,
    width: "43%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    position: "relative",
  },
  leftCard: {
    alignSelf: "flex-start",
    marginBottom: 40,
  },
  rightCard: {
    alignSelf: "flex-end",
    marginBottom: 40,
    marginTop: -50,
  },
  alignedLeftCard: {
    marginTop: -70,
  },
  branch: {
    position: "absolute",
    width: 140,
    height: 140,
    zIndex: -1,
  },
  branchFirst: {
    top: 20,
    left: 115,
  },
  branchSecond: {
    top: 110,
    left: 80,
  },
  branchThird: {
    top: 220,
    left: 125,
  },
  branchFourth: {
    top: 320,
    left: 70,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.background,
    marginBottom: 5,
    fontFamily: "Nunito-Black",
  },
  cardDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  cardDetail: {
    fontSize: 11,
    color: colors.selected,
    fontFamily: "Nunito-Regular",
  },
  locationIcon: {
    paddingRight: 5,
  },
  infoIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  detailsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontFamily: "Nunito-Bold",
  },
  detailValue: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontFamily: "Nunito-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
  },
  bottomButton: {
    borderRadius: 25,
    elevation: 5,
  },
  basicBottomButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  regenerateButton: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  calendarModalContent: {
    backgroundColor: colors.background,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  calendarModalGradient: {
    borderRadius: 10,
    padding: 2,
    width: "88%",
    maxWidth: 400,
    alignSelf: "center",
  },
  modalGradient: {
    borderRadius: 10,
    padding: 2,
  },
  modalView: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: "flex-start",
    position: "relative",
  },
  modalCloseIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    marginBottom: 15,
    color: colors.primary,
    fontFamily: "Nunito-Black",
    textAlign: "left",
  },
  modalDetailRow: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  modalDetailTitle: {
    fontSize: fontSize.md,
    fontWeight: "bold",
    color: colors.primary,
    fontFamily: "Nunito-Bold",
  },
  modalDetailText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontFamily: "Nunito-Regular",
    flexShrink: 1,
  },
  datePickerWrapper: {
    backgroundColor: colors.background,
    borderRadius: 10,
    textAlign: "center",
    marginVertical: 10,
    overflow: "hidden",
  },
  datePickerContainer: {
    backgroundColor: colors.background,
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },
  scheduleButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  scheduleButtonText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontFamily: "Nunito-Bold",
  },
});

export default DatePlanScreen;
