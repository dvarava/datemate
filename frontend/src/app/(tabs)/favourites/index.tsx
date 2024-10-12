import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize } from "@/constants/tokens";
import { useRouter } from "expo-router";
import { DateHistory } from "@/types/dateHistory";
import Avatar from "@/components/Avatar";
import SubscriptionGuard from "@/guards/SubscriptionGuard";

const FavouriteDateHistoryCard: React.FC<{
  history: DateHistory;
  onRemoveFavorite: (id: string) => void;
  isPremium: boolean;
}> = ({ history, onRemoveFavorite, isPremium }) => {
  const router = useRouter();

  const gradient = history?.avatarGradient || ["#ff0262", "#ffffff"];

  const handlePress = () => {
    router.push({
      pathname: "/navigation/date-plan",
      params: {
        name: history.name,
        age: history.age,
        description: history.dateDescription,
        date: history.date,
        isFavorite: history.isFavorite ? "true" : "false",
      },
    });
  };

  // set isFavourite to false in DB
  const handleDeletePress = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this date from favourites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onRemoveFavorite(history.id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.historyCard}>
        <Avatar gradient={gradient} style={styles.avatar} />

        <View style={styles.historyDetailsContainer}>
          <View style={styles.nameDescriptionRow}>
            <View style={styles.nameDescriptionContainer}>
              <Text style={styles.historyName}>
                {`${history.name}, ${history.age}`}
              </Text>
              <Text style={styles.historyDescription}>
                {history.dateDescription}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleDeletePress}
              style={styles.iconButton}
            >
              <Ionicons name="trash" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.budgetContainer}>
              <SubscriptionGuard
                isPremium={isPremium}
                lockedText="Budget: "
                textStyle={{ fontSize: fontSize.xs }}
                iconSize={14}
                lockedTextMarginRight={0}
              >
                <Text style={styles.budgetText}>Budget: $50</Text>
              </SubscriptionGuard>
            </View>
            <Text style={styles.dateText}>{history.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FavouriteDateHistoryCard
            history={item}
            onRemoveFavorite={handleRemoveFavorite}
            isPremium={isPremium}
          />
        )}
        contentContainerStyle={styles.historyList}
      />
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