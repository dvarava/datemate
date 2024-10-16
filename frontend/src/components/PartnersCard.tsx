import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/tokens";
import { useRouter } from "expo-router";
import { Profile } from "@/types/profile";
import Avatar from "./Avatar";

interface PartnersCardProps {
  profile: Profile;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (partner: Profile) => void;
}

const PartnersCard: React.FC<PartnersCardProps> = ({
  profile,
  showActions = true,
  onEdit,
  onDelete,
  onSelect,
}) => {
  const router = useRouter();

  const handleSelect = () => {
    if (onSelect) {
      onSelect(profile);
    } else {
      router.push({
        pathname: `/navigation/partner-details`,
        params: { id: profile.id, name: profile.name },
      });
    }
  };

  const gradient = profile.avatarGradient || ["#ff0262", "#ffffff"];

  return (
    <TouchableOpacity onPress={handleSelect} style={styles.partnersCard}>
      <Avatar gradient={gradient} style={styles.avatar} />
      <Text style={styles.profileText}>{`${profile.name}, ${profile.age}`}</Text>

      {showActions && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleSelect} style={styles.iconButton}>
            <Ionicons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete?.(profile.id)} style={styles.iconButton}>
            <Ionicons name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  partnersCard: {
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
});

export default PartnersCard;
