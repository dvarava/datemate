import React, { useState, useRef } from "react";
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

const HomeCalendar: React.FC<HomeCalendarProps> = ({ style, specialDates = [] }) => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(
    52
  );

  const flatListRef = useRef<FlatList<any>>(null);

  const getWeekDates = (startDate: Date) => {
    const weekDates = [];
    const firstDayOfWeek = new Date(
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1)
    );

    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      weekDates.push(new Date(day));
    }
    return weekDates;
  };

  const generateWeeks = (numWeeks: number) => {
    const weeks = [];
    const today = new Date();
    const startDate = new Date(
      today.setDate(today.getDate() - today.getDay() + 1 - numWeeks * 7)
    );

    for (let i = 0; i < numWeeks * 2 + 1; i++) {
      const weekStart = new Date(
        startDate.setDate(startDate.getDate() + (i === 0 ? 0 : 7))
      );
      weeks.push(getWeekDates(new Date(weekStart)));
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

  const weeks = generateWeeks(52);

  const renderWeek = ({ item }: { item: Date[] }) => {
    return (
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
  };

  return (
    <View style={StyleSheet.flatten([styles.calendarContainer, style])}>
      <FlatList
        ref={flatListRef}
        data={weeks}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderWeek}
        keyExtractor={(_, index) => index.toString()}
        initialScrollIndex={currentWeekIndex}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollToIndexFailed={() => {}}
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
    width: width - 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    width: width - 40,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  columnContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  dateContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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
  },
  dayText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontFamily: "Nunito-Regular",
  },
});
