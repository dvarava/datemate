import { create } from 'zustand';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { Partner } from './types/partner';

interface DateState {
  datePlan: any;
  partners: Partner[],
  generateDatePlan: (data: any) => Promise<void>;
  fetchPartners: () => Promise<void>;
}

export const useDateStore = create<DateState>((set) => ({
  datePlan: null,
  partners: [],
  
  generateDatePlan: async (data: any) => {
    try {
      const response = await axios.post('http://localhost:3000/generate-date', data);
      set({ datePlan: response.data });

      // Log the OpenAI response to the console
      console.log('Generated Date Plan:', response.data);
    } catch (error) {
      console.error(error);
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

