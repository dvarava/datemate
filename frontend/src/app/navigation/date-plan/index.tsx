import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
  ActivityIndicator,
} from "react-native";
import { colors, fontSize } from "@/constants/tokens";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import SubscriptionGuard from "@/guards/SubscriptionGuard";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import Heart from "@/svg/heart";
import { useDateStore } from "@/store/dateStore";
import { Activity } from "@/store/types/date";

const DatePlanScreen: React.FC = () => {
  const router = useRouter();
  const { partnerId, showRegenerateButton } = useLocalSearchParams();
  const {
    datePlan,
    activities,
    dateHistory,
    getDatePlanByPartner,
    setFavorite,
  } = useDateStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  // Fetch date plan data when component mounts
  useEffect(() => {
    if (partnerId) {
      getDatePlanByPartner(partnerId as string)
        .then(() => {
          console.log("Fetched activities:", activities); // Debug log
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [partnerId]);

  const handleAddToFavourites = async () => {
    if (datePlan) {
      await setFavorite(!datePlan.isFavourite);
    }
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
  };

  const handleInfoPress = (index: number) => {
    setSelectedActivity(activities[index]);
    setModalVisible(true);
  };

  const renderPlanCards = () => {
    return activities
      .slice(0, datePlan?.numberOfActivities)
      .map((activity, index) => {
        const isLeft = index % 2 === 0;
        return (
          <React.Fragment key={activity._id}>
            <View
              style={[
                styles.planCard,
                isLeft ? styles.leftCard : styles.rightCard,
                (index === 2 || index === 4) && styles.alignedLeftCard,
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  top: -20,
                  left: "50%",
                  transform: [{ translateX: -5 }],
                  zIndex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Heart size={40} />
                <Text style={styles.heartText}>{index + 1}</Text>
              </View>

              <Text style={styles.cardTitle}>{activity.name}</Text>
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
              <SubscriptionGuard isPremium={false}>
                <Text style={styles.cardDetail}>Cost: ${activity.cost}</Text>
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
          </React.Fragment>
        );
      });
  };

  // Add loading state
  if (!datePlan || !activities.length) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.title}>
            Perfect Date Plan {"\n"}
            <Text style={{ fontFamily: "Nunito-Regular" }}>
              You & {datePlan.partnerName}
            </Text>
          </Text>
          <View style={styles.datePlan}>{renderPlanCards()}</View>

          <View style={styles.detailsContainer}>
            {/* Replace hardcoded values with actual data */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date mood:</Text>
              <Text style={styles.detailValue}>{datePlan.mood.join(", ")}</Text>
            </View>
            {/* ... other details ... */}
          </View>

          <View
            style={[
              styles.buttonContainer,
              showRegenerateButton === "false" && {
                justifyContent: "center",
                gap: 20,
              },
            ]}
          >
            <TouchableOpacity
              onPress={handleAddToFavourites}
              style={styles.bottomButton}
            >
              <View style={styles.basicBottomButton}>
                <Ionicons
                  name={datePlan.isFavourite ? "heart" : "heart-outline"}
                  size={28}
                  color={colors.secondary}
                />
              </View>
            </TouchableOpacity>

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

            {showRegenerateButton === "true" && (
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
            )}
          </View>
        </View>
      </ScrollView>

      {/* Modals for Date Scheduling and Activity Information */}
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

              <Text style={styles.modalTitle}>Schedule Your Date</Text>

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
                  <Text style={styles.modalTitle}>{selectedActivity.name}</Text>
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
                      {selectedActivity.description}
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
    marginBottom: 40,
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
    paddingTop: 20,
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
    marginTop: -68,
  },
  alignedLeftCard: {
    marginTop: -70,
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
    width: "28%",
    textAlign: "center",
  },
  basicBottomButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  regenerateButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
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
  heartText: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    fontFamily: "Nunito-Black",
  },
});

export default DatePlanScreen;
