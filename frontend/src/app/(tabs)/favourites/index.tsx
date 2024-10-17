import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { colors, fontSize } from "@/constants/tokens";
import { useRouter } from "expo-router";
import { DateHistory } from "@/types/dateHistory";
import DateHistoryList from "@/components/DateHistoryList";

const FavouritesScreen: React.FC = () => {
  const router = useRouter();
  // Fetch from DB here
  const isPremium = false;

  // Hardcoded data
  const [favourites, setFavourites] = useState<DateHistory[]>([
    {
      id: "1",
      name: "Anna",
      age: "21",
      dateDescription: "Chill date under the sun",
      date: "14.09.2024",
      avatarGradient: ["#ff0262", "#fff"],
      isFavorite: true,
    },
  ]);

  // Remove from DB here
  const handleRemoveFavorite = (id: string) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((history) => history.id !== id)
    );
  };

  const handleSeeHistory = () => {
    router.push("/navigation/history");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourite Dates</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleSeeHistory}>
        <Text style={styles.addButtonText}>See full dates history</Text>
      </TouchableOpacity>

      <ScrollView>
        <DateHistoryList
          histories={favourites}
          onActionPress={handleRemoveFavorite}
          showFavorite={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
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
  historyList: {
    paddingTop: 20,
  },
  historyCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  historyDetailsContainer: {
    flex: 1,
    flexDirection: "column",
  },
  nameDescriptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameDescriptionContainer: {
    flexDirection: "column",
    flex: 1,
  },
  historyName: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: colors.background,
    fontFamily: "Nunito-Black",
  },
  historyDescription: {
    fontSize: fontSize.xs,
    color: "#666",
    marginBottom: 10,
    fontFamily: "Nunito-Bold",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  budgetContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  budgetText: {
    fontSize: fontSize.xs,
    marginRight: 5,
    fontFamily: "Nunito-Regular",
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
    fontFamily: "Nunito-Regular",
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
  iconButton: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default FavouritesScreen;
