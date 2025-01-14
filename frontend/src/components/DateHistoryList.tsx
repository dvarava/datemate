import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DateHistoryCard from "./DateHistoryCard";
import { DateHistory } from "../store/types/date";
import { colors, fontSize } from "@/constants/tokens";

interface DateHistoryListProps {
  histories: DateHistory[];
  onActionPress: (id: string) => void;
  showAvatar?: boolean;
  showFavorite?: boolean;
}

const DateHistoryList: React.FC<DateHistoryListProps> = ({
  histories,
  onActionPress,
  showAvatar = true,
  showFavorite = true,
}) => {
  // Placeholder for now (replace with DB value when connected)
  const isPremium = false;

  return (
    <View style={styles.historyList}>
      {histories.length === 0 ? (
        <Text style={styles.noHistoryText}>
          No dates yet.{"\n"}Tap the heart to add one!
        </Text>
      ) : (
        histories.map((history) => (
          <DateHistoryCard
            key={history.id}
            history={history}
            onActionPress={onActionPress}
            isPremium={isPremium}
            showAvatar={showAvatar}
            showFavorite={showFavorite}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  historyList: {
    paddingTop: 20,
  },
  noHistoryText: {
    paddingTop: 0,
    color: colors.primary,
    fontSize: fontSize.md,
    fontFamily: "Nunito-Regular",
    textAlign: "center",
  },
});

export default DateHistoryList;
