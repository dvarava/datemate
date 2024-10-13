import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize } from "@/constants/tokens";
import { DateHistory } from "@/types/dateHistory";
import Avatar from "@/components/Avatar";
import SubscriptionGuard from "@/guards/SubscriptionGuard";
import { useRouter } from "expo-router";

const DateHistoryCard: React.FC<{
  history: DateHistory;
  onFavoriteToggle: (id: string) => void;
  isPremium: boolean;
  showAvatar?: boolean;
}> = ({ history, onFavoriteToggle, isPremium, showAvatar = true }) => {
  const router = useRouter();

  const handlePress = () => {
    // Hardcoded values for now, replace with DB interaction later
    router.push({
      pathname: "/navigation/date-plan",
      params: {
        name: history.name,
        age: history.age,
        description: history.dateDescription,
        date: history.date,
        showRegenerateButton: "false",
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.historyCard}>
        {showAvatar && <Avatar gradient={history.avatarGradient} style={styles.avatar} />}
        <View style={styles.historyDetailsContainer}>
          <View style={styles.nameDescriptionRow}>
            <View style={styles.nameDescriptionContainer}>
              <Text style={styles.historyName}>
                {`${history.name}, ${history.age}`}
              </Text>
              <Text style={styles.historyDescription}>{history.dateDescription}</Text>
            </View>

            <TouchableOpacity onPress={() => onFavoriteToggle(history.id)}>
              <Ionicons
                name={history.isFavorite ? "heart" : "heart-outline"}
                size={30}
                color={history.isFavorite ? colors.secondary : "#666"}
                style={{ paddingBottom: 5 }}
              />
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

const styles = StyleSheet.create({
  historyCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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
    color: colors.background,
  },
  dateText: {
    fontSize: fontSize.xs,
    color: "#666",
    marginLeft: 10,
    fontFamily: "Nunito-Regular",
  },
  avatar: {
    marginRight: 15,
  },
});

export default DateHistoryCard;
