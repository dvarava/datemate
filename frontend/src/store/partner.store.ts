import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

type Partner = {
  id?: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  personalityType: 'Introvert' | 'Extrovert';
  interests: string[];
  dietaryPreferences?: string | null;
  avatarGradient?: string[];
};

type PartnerState = {
  partners: Partner[];
  fetchPartners: () => Promise<void>;
  editPartner: (partnerId: string, partnerData: Partial<Partner>) => Promise<void>;
  deletePartner: (partnerId: string) => Promise<void>;
};


export const usePartnerStore = create<PartnerState>((set) => ({
  partners: [],

  addPartner: async (partner: any) => {
    try {
      const userId = await SecureStore.getItemAsync('userId');
      if (!userId) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      const response = await fetch('http://localhost:3000/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...partner }),
      });

      if (!response.ok) {
        throw new Error('Failed to add partner');
      }

      const newPartner = await response.json();
      set((state) => ({
        partners: [...state.partners, newPartner],
      }));
    } catch (error) {
      Alert.alert('Error', 'Failed to add partner');
      console.error('Add partner error:', error);
    }
  },

  fetchPartners: async () => {
    try {
      const userId = await SecureStore.getItemAsync('userId');
      if (!userId) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      const response = await fetch(`http://localhost:3000/partners?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch partners');
      }

      const partners = await response.json();
      set({ partners });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch partners');
      console.error('Fetch partners error:', error);
    }
  },

  editPartner: async (partnerId: string, partnerData: Partial<Partner>) => {
    try {
      const response = await fetch(`http://localhost:3000/partners/${partnerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerData),
      });

      if (!response.ok) {
        throw new Error('Failed to edit partner');
      }

      const updatedPartner = await response.json();
      set((state) => ({
        partners: state.partners.map((p) =>
          p.id === partnerId ? updatedPartner : p
        ),
      }));

      Alert.alert('Success', 'Partner updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to edit partner');
      console.error('Edit partner error:', error);
    }
  },

  deletePartner: async (partnerId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/partners/${partnerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete partner');
      }

      set((state) => ({
        partners: state.partners.filter((p) => p.id !== partnerId),
      }));

      Alert.alert('Success', 'Partner deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete partner');
      console.error('Delete partner error:', error);
    }
  },
}));