import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import DateHistoryList from "@/components/DateHistoryList";
import { colors, fontSize } from "@/constants/tokens";
import { useDateStore } from "@/store/date.store";
import { useFocusEffect } from "@react-navigation/native";

const HistoryScreen: React.FC = () => {
  const { dateHistories, fetchAllDatePlans, setFavorite } = useDateStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const loadDatePlans = async () => {
        try {
          setIsLoading(true);
          setError(null);
          await fetchAllDatePlans();
        } catch (err) {
          setError("Failed to load date plans");
        } finally {
          setIsLoading(false);
        }
      };

      loadDatePlans();
    }, [fetchAllDatePlans])
  );

  const handleFavoriteToggle = async (id: string) => {
    try {
      const dateHistory = dateHistories.find((history) => history.id === id);
      if (dateHistory) {
        await setFavorite(id, !dateHistory.isFavorite);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      Alert.alert("Error", "Failed to update favorite status");
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Generated Dates History</Text>
        {dateHistories.length === 0 ? (
          <Text style={styles.noDataText}>No date plans yet</Text>
        ) : (
          <DateHistoryList
            histories={dateHistories}
            onActionPress={handleFavoriteToggle}
            showFavorite={true}
          />
        )}
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
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: fontSize.md,
    textAlign: "center",
  },
  noDataText: {
    textAlign: "center",
    color: colors.primary,
    fontSize: fontSize.md,
    marginTop: 20,
    fontFamily: "Nunito-Regular",
  },
});

export default HistoryScreen;
