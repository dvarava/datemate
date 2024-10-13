import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors, fontSize } from "@/constants/tokens";

const { width } = Dimensions.get("window");

const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

interface HomeCalendarProps {
  style?: ViewStyle;
  specialDates?: Date[];
}

const HomeCalendar: React.FC<HomeCalendarProps> = ({
  style,
  specialDates = [],
}) => {
  const numWeeksBefore = 5;
  const numWeeksAfter = 5;
  const totalWeeks = numWeeksBefore + numWeeksAfter + 1;
  const currentWeekIndex = numWeeksBefore;

  const flatListRef = useRef<FlatList<any>>(null);

  const getWeekDates = (startDate: Date) => {
    const weekDates = [];
    const dayOfWeek = (startDate.getDay() + 6) % 7;
    const firstDayOfWeek = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - dayOfWeek
    );

    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      weekDates.push(new Date(day));
    }
    return weekDates;
  };

  const generateWeeks = (numWeeksBefore: number, numWeeksAfter: number) => {
    const weeks = [];
    const today = new Date();
    const dayOfWeek = (today.getDay() + 6) % 7;
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - dayOfWeek - numWeeksBefore * 7
    );

    const totalWeeks = numWeeksBefore + numWeeksAfter + 1;
    for (let i = 0; i < totalWeeks; i++) {
      const weekStart = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + i * 7
      );
      weeks.push(getWeekDates(weekStart));
    }
    return weeks;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const weeks = generateWeeks(numWeeksBefore, numWeeksAfter);

  const renderWeek = ({ item }: { item: Date[] }) => (
    <View style={styles.weekContainer}>
      <View style={styles.rowContainer}>
        {item.map((date, index) => {
          const isSpecial = specialDates.some(
            (specialDate) =>
              specialDate.getDate() === date.getDate() &&
              specialDate.getMonth() === date.getMonth() &&
              specialDate.getFullYear() === date.getFullYear()
          );
          return (
            <View key={index} style={styles.columnContainer}>
              <Text style={styles.dayText}>{daysOfWeek[index]}</Text>
              <TouchableOpacity
                style={[
                  styles.dateContainer,
                  isSpecial && styles.specialDateContainer,
                  isToday(date) && styles.todayDateContainer,
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dateText,
                    isSpecial && styles.specialDateText,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={[styles.calendarContainer, style]}>
      <FlatList
        ref={flatListRef}
        data={weeks}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderWeek}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        initialScrollIndex={currentWeekIndex}
        initialNumToRender={totalWeeks}
        maxToRenderPerBatch={totalWeeks}
        windowSize={totalWeeks}
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default HomeCalendar;

const styles = StyleSheet.create({
  calendarContainer: {
    width: width,
  },
  weekContainer: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    width: width - 40,
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  columnContainer: {
    alignItems: "center",
  },
  dateContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  specialDateContainer: {
    backgroundColor: colors.secondary,
  },
  todayDateContainer: {
    backgroundColor: colors.selected,
  },
  dateText: {
    fontSize: fontSize.sm,
    fontWeight: "bold",
    color: colors.primary,
    fontFamily: "Nunito-Bold",
  },
  specialDateText: {
    color: colors.primary,
    fontFamily: "Nunito-Bold",
  },
  dayText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontFamily: "Nunito-Regular",
  },
});
