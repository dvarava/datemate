import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/tokens";
import { useRouter } from "expo-router";
import { Profile } from "@/types/profile";
import Avatar from "./Avatar";

interface PartnersListProps {
  profiles: Profile[];
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (partner: Profile) => void;
}

interface ProfileCardProps {
  profile: Profile;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (partner: Profile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, showActions = true, onEdit, onDelete, onSelect }) => {
  const router = useRouter();

  const handleSelect = () => {
    if (onSelect) {
      onSelect(profile);
    } else {
      router.push({
        pathname: `/navigation/partner-details`,
        params: { partnerId: profile.id, name: profile.name },
      });
    }
  };

  const gradient = profile.avatarGradient || ["#ff0262", "#ffffff"];

  return (
    <TouchableOpacity onPress={handleSelect} style={styles.profileCard}>
      <Avatar gradient={gradient} style={styles.avatar} />
      <Text style={styles.profileText}>{`${profile.name}, ${profile.age}`}</Text>

      {showActions && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => onDelete?.(profile.id)} style={styles.iconButton}>
            <Ionicons name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const PartnersList: React.FC<PartnersListProps> = ({ profiles, showActions = true, onEdit, onDelete, onSelect }) => {
  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProfileCard
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
  profileCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  profileText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: colors.background,
    fontFamily: "Nunito-Black",
  },
  actionsContainer: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 20,
    marginLeft: 10,
  },
  profileList: {
    paddingTop: 20,
  },
});

export default PartnersList;
