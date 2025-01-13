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
  dateHistories: DateHistory[]; // Changed from dateHistory to dateHistories
  generateDatePlan: (data: any) => Promise<void>;
  fetchPartners: () => Promise<void>;
  getDatePlanByPartner: (partnerId: string) => Promise<void>;
  setFavorite: (dateId: string, isFavorite: boolean) => Promise<void>;
}

export const useDateStore = create<DateState>((set, get) => ({
  datePlan: null,
  activities: [],
  partners: [],
  dateHistories: [], // Initialize as empty array

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
      console.log('API Response:', response.data); // Debug log

      if (!response.data) {
        set({
          datePlan: null,
          activities: [],
          dateHistories: []
        });
        return;
      }

      // Extract the dateHistory array from the response
      const dateHistories = Array.isArray(response.data.dateHistory) 
        ? response.data.dateHistory 
        : [response.data.dateHistory].filter(Boolean);

      set({ 
        datePlan: response.data.datePlan,
        activities: response.data.activities,
        dateHistories: dateHistories
      });

      console.log('Set date histories:', dateHistories); // Debug log
    } catch (error: any) {
      if (error.response?.status === 404) {
        set({
          datePlan: null,
          activities: [],
          dateHistories: [],
        });
      } else {
        console.error('Error fetching date plan:', error);
        throw error;
      }
    }
  },

  setFavorite: async (dateId: string, isFavorite: boolean) => {
    try {
      await axios.patch(`http://localhost:3000/generate-date/${dateId}`, {
        isFavourite: isFavorite
      });
      
      // Update the favorite status in both datePlan and dateHistories
      const { datePlan, dateHistories } = get();
      
      set({
        datePlan: datePlan?._id === dateId 
          ? { ...datePlan, isFavourite: isFavorite }
          : datePlan,
        dateHistories: dateHistories.map(history =>
          history.id === dateId
            ? { ...history, isFavorite: isFavorite }
            : history
        )
      });
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