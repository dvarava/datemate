import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DateHistoryCard from "./DateHistoryCard";
import { DateHistory } from "@/types/dateHistory";

interface DateHistoryListProps {
  histories: DateHistory[];
  onFavoriteToggle: (id: string) => void;
  showAvatar?: boolean;
}

const DateHistoryList: React.FC<DateHistoryListProps> = ({
  histories,
  onFavoriteToggle,
  showAvatar
}) => {
  // Placeholder for now (replace with DB value when connected)
  const isPremium = false;

  return (
    <View style={styles.historyList}>
      {histories.map((history) => (
        <DateHistoryCard
          key={history.id}
          history={history}
          onFavoriteToggle={onFavoriteToggle}
          isPremium={isPremium}
          showAvatar={showAvatar}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  historyList: {
    paddingBottom: 20,
  },
});

export default DateHistoryList;
