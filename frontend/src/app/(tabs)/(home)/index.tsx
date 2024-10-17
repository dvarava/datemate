import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ViewStyle,
  Alert,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fontSize } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SubscriptionGuard from "@/guards/SubscriptionGuard";
import HomeCalendar from "@/components/HomeCalendar";
import * as Notifications from "expo-notifications";
import RobotSvg from "@/svg/robot";
import { useAuthStore } from "@/store/authStore";

interface HolidayInfo {
  name: string;
  daysLeft: number;
}

const calculateDaysUntilDate = (targetDate: Date): number => {
  const today = new Date();
  if (targetDate < today) {
    targetDate.setFullYear(today.getFullYear() + 1);
  }
  const timeDiff = targetDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

const holidays = [
  { name: "Commitment Day", date: new Date(new Date().getFullYear(), 0, 1) },
  {
    name: "National Cuddling Day",
    date: new Date(new Date().getFullYear(), 0, 6),
  },
  {
    name: "National Hugging Day",
    date: new Date(new Date().getFullYear(), 0, 21),
  },
  { name: "Hug Day", date: new Date(new Date().getFullYear(), 1, 12) },
  { name: "Kiss Day", date: new Date(new Date().getFullYear(), 1, 13) },
  { name: "Valentine’s Day", date: new Date(new Date().getFullYear(), 1, 14) },
  {
    name: "World Compliment Day",
    date: new Date(new Date().getFullYear(), 2, 1),
  },
  {
    name: "National Lover’s Day",
    date: new Date(new Date().getFullYear(), 3, 23),
  },
  {
    name: "Couple Appreciation Day",
    date: new Date(new Date().getFullYear(), 4, 1),
  },
  {
    name: "National Loving Day",
    date: new Date(new Date().getFullYear(), 5, 12),
  },
  {
    name: "National Kissing Day",
    date: new Date(new Date().getFullYear(), 5, 22),
  },
  { name: "Hug Holiday", date: new Date(new Date().getFullYear(), 5, 29) },
  {
    name: "International Kissing Day",
    date: new Date(new Date().getFullYear(), 6, 6),
  },
  {
    name: "National Girlfriend Day",
    date: new Date(new Date().getFullYear(), 7, 1),
  },
  {
    name: "National Hand Holding Day",
    date: new Date(new Date().getFullYear(), 7, 9),
  },
  {
    name: "Kiss and Make Up Day",
    date: new Date(new Date().getFullYear(), 7, 25),
  },
  {
    name: "National Feel The Love Day",
    date: new Date(new Date().getFullYear(), 8, 7),
  },
  {
    name: "National Boyfriend Day",
    date: new Date(new Date().getFullYear(), 9, 3),
  },
  {
    name: "National I Love You Day",
    date: new Date(new Date().getFullYear(), 9, 14),
  },
  {
    name: "National Make a Gift Day",
    date: new Date(new Date().getFullYear(), 11, 3),
  },
];

const specialDates = holidays
  .map((holiday) => holiday.date)
  .filter((date) => date !== null) as Date[];

const getNearestHoliday = (): HolidayInfo => {
  const today = new Date();
  let nearestHoliday: HolidayInfo = { name: "", daysLeft: Infinity };
  holidays.forEach((holiday) => {
    const targetDate = holiday.date;
    const daysLeft = calculateDaysUntilDate(targetDate);

    // check days to date
    // console.log(
    //   `${holiday.name}:`,
    //   targetDate.toDateString(),
    //   `- Days left: ${daysLeft}`
    // );

    if (daysLeft < nearestHoliday.daysLeft) {
      nearestHoliday = { name: holiday.name, daysLeft };
    }
  });
  return nearestHoliday;
};

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const PremiumCard: React.FC<CardProps> = ({ children, style }) => (
  <LinearGradient
    colors={[
      colors.premium1,
      colors.premium2,
      colors.premium3,
      colors.premium4,
    ]}
    start={{ x: 0.25, y: 0.3 }}
    end={{ x: 1, y: 1 }}
    style={[styles.card, style]}
  >
    {children}
  </LinearGradient>
);

const RegularCard: React.FC<CardProps> = ({ children, style }) => (
  <LinearGradient
    colors={[colors.secondary, colors.primary]}
    start={{ x: 0.6, y: 0 }}
    end={{ x: 1.4, y: 1 }}
    style={[styles.card, style]}
  >
    {children}
  </LinearGradient>
);

const HomeScreen = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const navigateBlocked = useRef(false);
  const [isNotified, setIsNotified] = useState(false);
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const isPremium = true;

  const handleBuyNow = () => {
    if (!navigateBlocked.current) {
      navigateBlocked.current = true;
      router.push("/navigation/premium");
      setTimeout(() => {
        navigateBlocked.current = false;
      }, 1000);
    }
  };

  const handleNotifyMe = async () => {
    if (isNotified && notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      setIsNotified(false);
      setNotificationId(null);
      Alert.alert("Reminder", "The reminder has been turned off.");
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Notifications permission is required!"
        );
        return;
      }

      const notification = await Notifications.scheduleNotificationAsync({
        content: {
          title: `${nearestHoliday.name} is coming!`,
          body: `Only ${nearestHoliday.daysLeft} days left until ${nearestHoliday.name}!`,
          sound: true,
        },
        trigger: {
          seconds: nearestHoliday.daysLeft * 24 * 60 * 60,
        },
      });

      setIsNotified(true);
      setNotificationId(notification);
      Alert.alert(
        "Reminder Set",
        `We will remind you about ${nearestHoliday.name}!`
      );
    }
  };

  const nearestHoliday = getNearestHoliday();

  return (
    <View style={styles.container}>
      {/* Calendar Component */}
      <View style={styles.calendarWrapper}>
        <HomeCalendar specialDates={specialDates} />
        {/* // TODO: Add logic to parse user's scheduled dates from the database and include them here along with holidays. */}
      </View>

      {/* Overview Section */}
      <RegularCard style={styles.overviewCard}>
        <View style={styles.overviewTextContainer}>
          <Text style={styles.cardTitle}>OVERVIEW</Text>
          <Text style={styles.cardText}>Dates generated: 5</Text>
          <Text style={styles.cardText}>Favourite dates: 1</Text>
          <Text style={styles.cardText}>Partners: 2</Text>
        </View>
        <View style={styles.robotIcon}>
          <RobotSvg
            style={{
              flex: 1,
              width: "100%",
              height: undefined,
              aspectRatio: 2,
            }}
          />
        </View>
      </RegularCard>

      {/* Weather and Premium Section */}
      <View style={styles.row}>
        <RegularCard style={styles.weatherCard}>
          <Text style={styles.cardTitle}>WEATHER</Text>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureText}>24°C</Text>
            <Ionicons
              name="sunny"
              size={26}
              color={colors.primary}
              style={styles.weatherIcon}
            />
          </View>
          <Text style={[styles.cardText, styles.weatherText]}>
            Sunny day, great
          </Text>
          <Text style={[styles.cardText, styles.weatherText]}>
            for an outdoors date!
          </Text>
        </RegularCard>

        <SubscriptionGuard
          isPremium={isPremium}
          premiumCard={
            <PremiumCard style={styles.premiumCard}>
              <Text style={[styles.cardTitle, styles.darkText]}>PREMIUM</Text>
              <Text style={[styles.offerText, styles.darkText]}>50% OFF</Text>
              <View style={styles.priceContainer}>
                <Text style={[styles.darkText, styles.oldPrice]}>$7.99</Text>
                <Text style={[styles.darkText, styles.newPrice]}>$3.75</Text>
              </View>
              <TouchableOpacity
                style={styles.buyNowButton}
                onPress={handleBuyNow}
                accessibilityLabel="Buy Premium Now"
                accessibilityRole="button"
                activeOpacity={0.7}
              >
                <Text style={styles.buyNowText}>BUY NOW</Text>
                <View style={styles.arrowCircle}>
                  <Ionicons
                    name="arrow-forward"
                    size={12}
                    color={colors.secondaryBackground}
                  />
                </View>
              </TouchableOpacity>
            </PremiumCard>
          }
          regularCard={
            <RegularCard style={styles.premiumCard}>
              {/* <Text style={styles.cardTitle}>UPCOMING</Text> */}
              <Text style={styles.upcomingText}>
                {nearestHoliday.daysLeft} Days
              </Text>
              <Text style={styles.untilText}>until {nearestHoliday.name}!</Text>
              <TouchableOpacity
                style={[
                  styles.notifyButton,
                  isNotified && styles.notifyButtonActive,
                ]}
                onPress={handleNotifyMe}
              >
                <Text
                  style={[
                    styles.notifyButtonText,
                    isNotified && styles.notifyButtonTextActive,
                  ]}
                >
                  {isNotified ? "Reminder On" : "Notify Me"}
                </Text>
                <Ionicons
                  name={isNotified ? "notifications" : "notifications-outline"}
                  size={16}
                  style={[
                    styles.notifyIcon,
                    isNotified && styles.notifyIconActive,
                  ]}
                />
              </TouchableOpacity>
            </RegularCard>
          }
        />
      </View>

      {/* Conversation Starter Section */}
      <View style={styles.conversationStarter}>
        <Text style={styles.conversationStarterTitle}>
          DAILY CONVERSATION STARTER:
        </Text>
        <Text style={styles.conversationStarterText}>
          Let's settle this - pineapple on pizza: bold move or total disaster?
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          title="Logout"
          onPress={() => {
            logout();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 25,
    paddingTop: 20,
  },
  calendarWrapper: {
    marginHorizontal: -28,
    marginBottom: 15,
  },
  calendar: {
    marginBottom: 15,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    minHeight: 150,
  },
  overviewCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
  },
  overviewTextContainer: {
    padding: 16,
  },
  cardTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Nunito-Black",
  },
  cardText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Regular",
  },
  robotIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 100,
    paddingTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weatherCard: {
    flex: 1,
    marginRight: 8,
  },
  temperatureContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  weatherText: {
    fontSize: 14,
  },
  temperatureText: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Nunito-Black",
    marginRight: 8,
  },
  upcomingText: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Nunito-Black",
    marginRight: 8,
  },
  untilText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: "Nunito-Regular",
    marginBottom: 15,
  },
  weatherIcon: {},
  premiumCard: {
    flex: 1,
    marginLeft: 8,
    padding: 16,
  },
  buyNowButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.secondaryBackground,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
  },
  buyNowText: {
    color: colors.primary,
    fontSize: fontSize.xs,
    fontWeight: "bold",
    marginRight: 4,
    fontFamily: "Nunito-Bold",
  },
  arrowCircle: {
    backgroundColor: colors.primary,
    borderRadius: 7,
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  notifyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
  },
  notifyButtonText: {
    color: colors.background,
    fontSize: fontSize.xs,
    fontWeight: "bold",
    marginRight: 4,
    fontFamily: "Nunito-Bold",
  },
  notifyIcon: {
    color: colors.secondaryBackground,
  },
  notifyIconActive: {
    color: "#666",
  },
  notifyButtonActive: {
    backgroundColor: colors.primary,
  },
  notifyButtonTextActive: {
    color: "#666",
  },
  darkText: {
    color: "black",
    fontFamily: "Nunito-Black",
  },
  offerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  oldPrice: {
    fontSize: fontSize.sm,
    textDecorationLine: "line-through",
    color: "#4f4f4f",
    marginRight: 8,
  },
  newPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  conversationStarter: {
    marginTop: 16,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  conversationStarterTitle: {
    color: colors.primary,
    fontSize: fontSize.sm,
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Nunito-Black",
  },
  conversationStarterText: {
    color: colors.primary,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Nunito-Regular",
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
