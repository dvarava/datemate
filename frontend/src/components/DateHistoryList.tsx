import React from "react";
import { View, StyleSheet } from "react-native";
import DateHistoryCard from "./DateHistoryCard";
import { DateHistory } from "@/types/dateHistory";

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
      {histories.map((history) => (
        <DateHistoryCard
          key={history.id}
          history={history}
          onActionPress={onActionPress}
          isPremium={isPremium}
          showAvatar={showAvatar}
          showFavorite={showFavorite}
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
