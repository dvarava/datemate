import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DateHistoryList from "@/components/DateHistoryList";
import { colors, fontSize } from "@/constants/tokens";
import { DateHistory } from "@/types/dateHistory";

const HistoryScreen: React.FC = () => {
  // harcoded data
  const [histories, setHistories] = useState<DateHistory[]>([
    {
      id: "1",
      name: "Anna",
      age: "21",
      dateDescription: "Chill date under the sun",
      date: "14.09.2024",
      avatarGradient: ["#ff0262", "#fff"],
      isFavorite: true,
    },
    {
      id: "2",
      name: "Diana",
      age: "23",
      dateDescription: "Romantic evening sunset date",
      date: "01.06.2024",
      avatarGradient: ["#d244ac", "#ffffff"],
      isFavorite: false,
    },
    {
      id: "3",
      name: "Tamara",
      age: "48",
      dateDescription: "Exciting outdoors hike date",
      date: "12.08.2024",
      avatarGradient: ["#4469d2", "#fff"],
      isFavorite: false,
    },
  ]);

  // add to favorites in DB here
  const handleFavoriteToggle = (id: string) => {
    setHistories((prevHistories) =>
      prevHistories.map((history) =>
        history.id === id
          ? { ...history, isFavorite: !history.isFavorite }
          : history
      )
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Generated Dates History</Text>
        <DateHistoryList
          histories={histories}
          onFavoriteToggle={handleFavoriteToggle}
        />
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
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
  header: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Nunito-Black",
  },
});

export default HistoryScreen;
