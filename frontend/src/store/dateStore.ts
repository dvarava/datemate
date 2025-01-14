import { create } from 'zustand';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { Partner } from './types/partner';
import { Activity, DatePlan, DateHistory } from './types/date';

interface DateState {
  datePlans: DatePlan[];
  activities: Activity[];
  partners: Partner[];
  dateHistories: DateHistory[];
  getDatePlanByPartner: (partnerId: string) => Promise<void>;
  fetchPartners: () => Promise<void>;
  setFavorite: (dateId: string, isFavorite: boolean) => Promise<void>;
}

export const useDateStore = create<DateState>((set, get) => ({
  datePlans: [],
  activities: [],
  partners: [],
  dateHistories: [],

  getDatePlanByPartner: async (partnerId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/generate-date/${partnerId}`);
      console.log('Fetched dateHistories:', response.data.dateHistory); // Log the fetched date histories
      set({
        datePlans: response.data.datePlans,
        activities: response.data.activities,
        dateHistories: response.data.dateHistory // Ensure this matches the backend response
      });
    } catch (error) {
      console.error('Error fetching date plans:', error);
    }
  },

  setFavorite: async (dateId: string, isFavorite: boolean) => {
    try {
      await axios.patch(`http://localhost:3000/generate-date/${dateId}`, {
        isFavourite: isFavorite
      });
      
      const { datePlans, dateHistories } = get();
      
      set({
        datePlans: datePlans.map(plan =>
          plan._id === dateId 
            ? { ...plan, isFavourite: isFavorite }
            : plan
        ),
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