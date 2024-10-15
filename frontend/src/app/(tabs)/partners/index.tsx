import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import PartnersList from "@/components/PartnersList";
import { colors } from "@/constants/tokens";
import { usePartnerStore } from "@/store/partner.store";

const PartnersScreen: React.FC = () => {
  const { partners, fetchPartners, deletePartner, editPartner } = usePartnerStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPartners = async () => {
      setLoading(true);
      await fetchPartners();
      setLoading(false);
    };
    loadPartners();
  }, []);

  const handleEditProfile = (id: string) => {
    const updatedName = "New Name"; // Example placeholder, you can replace with actual input logic
    editPartner(id, { name: updatedName });
  };

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
            deletePartner(id);
          },
        },
      ]
    );
  };

  const handleAddProfile = () => {
    router.push("/navigation/add-partner");
  };

  const partnerProfiles = partners.map(partner => ({
    id: partner.id || String(Math.random()),  // Unique fallback if id is missing (not recommended, but ensures no duplicate keys)
    name: partner.name,
    age: partner.age,
    gender: partner.gender,
    avatarGradient: partner.avatarGradient || ['#4469d2', '#fff'],  // Fallback for missing gradients
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your partner's profiles</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleAddProfile}>
        <Text style={styles.addButtonText}>Click to add partner</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <PartnersList
          profiles={partnerProfiles}
          showActions={true}
          onEdit={handleEditProfile}
          onDelete={handleDeleteProfile}
        />
      )}
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