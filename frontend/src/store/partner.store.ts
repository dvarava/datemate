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
    dietaryPreferences?: string[] | null;
  };

type PartnerState = {
  partners: Partner[];
  addPartner: (partner: Omit<Partner, 'id'>) => Promise<void>;
  fetchPartners: () => Promise<void>;
};

export const usePartnerStore = create<PartnerState>((set) => ({
  partners: [],

  // Add a new partner
  addPartner: async (partner) => {
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
}));