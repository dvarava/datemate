import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Profile } from "@/types/profile";
import PartnersCard from "./PartnersCard";
import { colors, fontSize } from "@/constants/tokens";

interface PartnersListProps {
  profiles: Profile[];
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (partner: Profile) => void;
}

const PartnersList: React.FC<PartnersListProps> = ({
  profiles,
  showActions = true,
  onEdit,
  onDelete,
  onSelect,
}) => {
  return profiles.length > 0 ? (
    <FlatList
      data={profiles}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PartnersCard
          profile={item}
          showActions={showActions}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      )}
      contentContainerStyle={styles.profileList}
    />
  ) : (
      <Text style={styles.noPartnersText}>
        No partners yet.{"\n"}Add one to start planning dates!
      </Text>
  );
};

const styles = StyleSheet.create({
  profileList: {
    paddingTop: 20,
  },
  noPartnersText: {
    paddingTop: 20,
    color: colors.primary,
    fontSize: fontSize.md,
    fontFamily: "Nunito-Regular",
    textAlign: "center",
  },
});

export default PartnersList;
