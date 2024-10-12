import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import PartnersList from "@/components/PartnersList";
import { colors } from "@/constants/tokens";
import { Profile } from "@/types/profile";

const PartnersScreen: React.FC = () => {
  // hardcoded data
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: "1", name: "Anna", age: 21, avatarGradient: ["#ff0262", "#fff"] },
    { id: "2", name: "Diana", age: 23, avatarGradient: ["#4469d2", "#fff"] },
    {
      id: "3",
      name: "Tamara",
      age: 48,
      avatarGradient: ["#d244ac", "#fff"],
    },
  ]);

  const handleEditProfile = (id: string) => {
    console.log(`Edit profile with id: ${id}`);
  };

  // delete from DB here
  const handleDeleteProfile = (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this profile?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setProfiles(profiles.filter((profile) => profile.id !== id));
          },
        },
      ]
    );
  };

  const handleAddProfile = () => {
    router.push("/navigation/add-partner");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your partner's profiles</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleAddProfile}>
        <Text style={styles.addButtonText}>Click to add partner</Text>
      </TouchableOpacity>

      <PartnersList
        profiles={profiles}
        showActions={true}
        onEdit={handleEditProfile}
        onDelete={handleDeleteProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Nunito-Black",
  },
  addButton: {
    backgroundColor: "#333",
    borderRadius: 25,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#555",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#aaa",
    fontSize: 16,
    fontFamily: "Nunito-Regular",
  },
});

export default PartnersScreen;
