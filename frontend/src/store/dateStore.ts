import { create } from 'zustand';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { Partner } from './types/partner';
import { Activity, DatePlan, DateHistory } from './types/date';

interface DateState {
  datePlan: DatePlan | null;
  activities: Activity[];
  partners: Partner[];
  dateHistory: DateHistory | null;
  generateDatePlan: (data: any) => Promise<void>;
  fetchPartners: () => Promise<void>;
  getDatePlanByPartner: (partnerId: string) => Promise<void>;
  setFavorite: (isFavorite: boolean) => Promise<void>;
}

export const useDateStore = create<DateState>((set, get) => ({
  datePlan: null,
  activities: [],
  partners: [],
  dateHistory: null,

  generateDatePlan: async (data: any) => {
    try {
      const response = await axios.post('http://localhost:3000/generate-date', data);
      set({ 
        datePlan: response.data.datePlan,
        activities: response.data.activities 
      });
      console.log('Generated Date Plan:', response.data);
    } catch (error) {
      console.error('Error generating date plan:', error);
      throw error;
    }
  },

  getDatePlanByPartner: async (partnerId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/generate-date/${partnerId}`);
      if (!response.data.datePlan) {
        set({
          datePlan: null,
          activities: [],
          dateHistory: null
        });
        return;
      }
      set({ 
        datePlan: response.data.datePlan,
        activities: response.data.activities,
        dateHistory: response.data.dateHistory
      });
      console.log('Fetched Date Plan:', response.data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Suppress the error and set datePlan to null
        set({
          datePlan: null,
          activities: [],
          dateHistory: null,
        });
      } else {
        console.error('Error fetching date plan:', error);
        throw error;
      }
    }
  },

  setFavorite: async (isFavorite: boolean) => {
    try {
      const { datePlan } = get();
      if (!datePlan?._id) return;

      const response = await axios.patch(`http://localhost:3000/generate-date/${datePlan._id}`, {
        isFavourite: isFavorite
      });
      
      set({ datePlan: { ...datePlan, isFavourite: isFavorite } });
    } catch (error) {
      console.error('Error updating favorite status:', error);
      throw error;
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

