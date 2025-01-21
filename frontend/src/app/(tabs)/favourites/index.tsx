import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { colors, fontSize } from "@/constants/tokens";
import { useRouter } from "expo-router";
import DateHistoryList from "@/components/DateHistoryList";
import { useDateStore } from "@/store/date.store";

const FavouritesScreen: React.FC = () => {
  const router = useRouter();
  const { dateHistories, fetchFavoriteDatePlans, setFavorite } = useDateStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      await fetchFavoriteDatePlans();
      setLoading(false);
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = async (id: string) => {
    try {
      await setFavorite(id, false);
    } catch (error) {
      console.error("Error removing favorite:", error);
      Alert.alert("Error", "Failed to remove from favorites");
    }
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

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView>
          {dateHistories.length === 0 ? (
            <Text style={styles.noDataText}>No favorite dates yet</Text>
          ) : (
            <DateHistoryList
              histories={dateHistories}
              onActionPress={handleRemoveFavorite}
              showFavorite={false}
            />
          )}
        </ScrollView>
      )}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    textAlign: "center",
    color: colors.primary,
    fontSize: fontSize.md,
    marginTop: 20,
    fontFamily: "Nunito-Regular",
  },
});

export default FavouritesScreen;
