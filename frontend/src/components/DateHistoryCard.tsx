import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize } from "@/constants/tokens";
import { DateHistory } from "../store/types/date";
import Avatar from "@/components/Avatar";
import SubscriptionGuard from "@/guards/SubscriptionGuard";
import { useRouter } from "expo-router";

interface DateHistoryCardProps {
  history: DateHistory;
  onActionPress: (id: string) => void;
  onCardPress?: (id: string) => void; // Add onCardPress prop
  isPremium: boolean;
  showAvatar?: boolean;
  showFavorite?: boolean;
}

const DateHistoryCard: React.FC<DateHistoryCardProps> = ({
  history,
  onActionPress,
  onCardPress,
  isPremium,
  showAvatar = true,
  showFavorite = true,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onCardPress) {
      onCardPress(history.id); // Trigger onCardPress if provided
    } else {
      // Fallback navigation logic (optional)
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
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.historyCard}>
        {showAvatar && (
          <Avatar gradient={history.avatarGradient} style={styles.avatar} />
        )}
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
              onPress={() => onActionPress(history.id)}
              style={!showFavorite ? styles.iconButton : undefined}
            >
              <Ionicons
                name={
                  showFavorite
                    ? history.isFavorite
                      ? "heart"
                      : "heart-outline"
                    : "trash"
                }
                size={showFavorite ? 28 : 20}
                color={
                  showFavorite
                    ? history.isFavorite
                      ? colors.secondary
                      : "#666"
                    : colors.primary
                }
              />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.costContainer}>
              <SubscriptionGuard
                isPremium={isPremium}
                lockedText="Cost: "
                textStyle={{ fontSize: fontSize.xs }}
                iconSize={14}
                lockedTextMarginRight={0}
              >
                <Text style={styles.costText}>Cost: $50</Text>
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
    paddingHorizontal: 18,
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
  costContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  costText: {
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
  iconButton: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 20,
  },
});

export default DateHistoryCard;
