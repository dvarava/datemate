import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Profile } from "@/types/profile";
import PartnersCard from "./PartnersCard";

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
  return (
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
  );
};

const styles = StyleSheet.create({
  profileList: {
    paddingTop: 20,
  },
});

export default PartnersList;
