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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fontSize } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SubscriptionGuard from "@/guards/SubscriptionGuard";
import HomeCalendar from "@/components/HomeCalendar";
import * as Notifications from "expo-notifications";

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

const getNthDayInMonth = (
  year: number,
  month: number,
  dayOfWeek: number,
  n: number
): Date => {
  let date = new Date(year, month, 1);
  const firstDayOfWeek = date.getDay();
  let dayOffset = (dayOfWeek - firstDayOfWeek + 7) % 7;
  date.setDate(1 + dayOffset + (n - 1) * 7);
  return date;
};

const holidays = [
  { name: "Valentine’s Day", date: new Date(new Date().getFullYear(), 1, 14) },
  {
    name: "Marriage Day",
    getDate: (year: number) => getNthDayInMonth(year, 1, 0, 2),
  },
  { name: "Day of Happiness", date: new Date(new Date().getFullYear(), 2, 20) },
  {
    name: "Kiss & Make Up Day",
    date: new Date(new Date().getFullYear(), 7, 25),
  },
  {
    name: "Sweetest Day",
    getDate: (year: number) => getNthDayInMonth(year, 9, 6, 3),
  },
  { name: "Love Day", date: new Date(new Date().getFullYear(), 4, 1) },
  { name: "Hug Day", date: new Date(new Date().getFullYear(), 0, 21) },
  { name: "Proposal Day", date: new Date(new Date().getFullYear(), 2, 20) },
  { name: "Girlfriend Day", date: new Date(new Date().getFullYear(), 7, 1) },
  { name: "Boyfriend Day", date: new Date(new Date().getFullYear(), 9, 3) },
];

const specialDates = holidays
  .map((holiday) => {
    if (holiday.date) {
      return holiday.date;
    } else if (holiday.getDate) {
      return holiday.getDate(new Date().getFullYear());
    }
    return null;
  })
  .filter((date) => date !== null) as Date[];

const getNearestHoliday = (): HolidayInfo => {
  const today = new Date();
  let nearestHoliday: HolidayInfo = { name: "", daysLeft: Infinity };
  holidays.forEach((holiday) => {
    const targetDate = holiday.date || holiday.getDate(today.getFullYear());
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
  const router = useRouter();
  const navigateBlocked = useRef(false);
  const [isNotified, setIsNotified] = useState(false);
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
    if (isNotified) {
      Alert.alert("Notification", "Reminder is already set!");
      return;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Notifications permission is required!");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${nearestHoliday.name} is coming!`,
        body: `Only ${nearestHoliday.daysLeft} days left until ${nearestHoliday.name}!`,
        sound: true,
      },
      trigger: {
        seconds: nearestHoliday.daysLeft * 24 * 60 * 60, // Convert days to seconds
      },
    });

    setIsNotified(true);
    Alert.alert(
      "Reminder Set",
      `We will remind you about ${nearestHoliday.name}!`
    );
  };

  const nearestHoliday = getNearestHoliday();

  return (
    <ScrollView style={styles.container}>
      {/* Calendar Component */}
      <HomeCalendar
        style={styles.calendar}
        specialDates={specialDates}
        // TODO: Add logic to parse user's scheduled dates from the database and include them here along with holidays.
      />

      {/* Overview Section */}
      <RegularCard style={styles.overviewCard}>
        <View style={styles.overviewTextContainer}>
          <Text style={styles.cardTitle}>OVERVIEW</Text>
          <Text style={styles.cardText}>Dates generated: 5</Text>
          <Text style={styles.cardText}>Favourite dates: 1</Text>
          <Text style={styles.cardText}>Partners: 2</Text>
        </View>
        <View style={styles.robotIcon}>
          <Image
            source={require("@/assets/robot.png")}
            style={{
              flex: 1,
              resizeMode: "contain",
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
                <Text style={[styles.darkText, styles.oldPrice]}>$9.99</Text>
                <Text style={[styles.darkText, styles.newPrice]}>$4.99</Text>
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
              <Text style={styles.cardTitle}>UPCOMING</Text>
              <Text style={styles.upcomingText}>
                {nearestHoliday.daysLeft} Days
              </Text>
              <Text style={styles.untilText}>until {nearestHoliday.name}!</Text>
              <TouchableOpacity
                style={styles.notifyButton}
                onPress={handleNotifyMe}
              >
                <Text style={styles.notifyButtonText}>
                  {isNotified ? "Reminder On" : "Notify Me"}
                </Text>
                <Ionicons
                  name={isNotified ? "notifications" : "notifications-outline"}
                  size={16}
                  color={colors.secondaryBackground}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 25,
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
    height: 160,
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
    fontSize: 30,
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
