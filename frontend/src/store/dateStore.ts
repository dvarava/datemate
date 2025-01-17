import { create } from "zustand";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { Partner } from "./types/partner";
import { Activity, DatePlan, DateHistory } from "./types/date";

interface DateState {
  datePlans: DatePlan[];
  activities: Activity[];
  partners: Partner[];
  dateHistories: DateHistory[];
  fetchDatePlansByPartnerId: (partnerId: string) => Promise<void>;
  fetchDatePlanById: (datePlanId: string) => Promise<void>;
  fetchPartners: () => Promise<void>;
  setFavorite: (datePlanId: string, isFavorite: boolean) => Promise<void>;
  createDatePlan: (data: any) => Promise<void>;
}

export const useDateStore = create<DateState>((set, get) => ({
  datePlans: [],
  activities: [],
  partners: [],
  dateHistories: [],

  // Fetch date plans by partner ID
  fetchDatePlansByPartnerId: async (partnerId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/date-plans/partners/${partnerId}`
      );
      set({ dateHistories: response.data.datePlans || [] });
    } catch (error) {
      console.error("Error fetching date plans:", error);
      Alert.alert("Error", "Failed to fetch date plans. Please try again.");
    }
  },

  // Fetch a specific date plan by ID
  fetchDatePlanById: async (datePlanId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/date-plans/${datePlanId}`
      );
      console.log("API Response:", response.data); // Log the API response

      const { datePlan, activities, dateHistory } = response.data;

      // Update the state with the fetched data
      set({
        datePlans: [datePlan], // Store the single date plan in an array
        activities: activities || [], // Ensure activities is an array
        dateHistories: [dateHistory], // Store the single date history in an array
      });
    } catch (error) {
      console.error("Error fetching date plan:", error);
      Alert.alert("Error", "Failed to fetch date plan. Please try again.");
    }
  },

  // Set a date plan as favorite
  setFavorite: async (datePlanId: string, isFavorite: boolean) => {
    try {
      await axios.patch(`http://localhost:3000/date-plans/${datePlanId}`, {
        isFavourite: isFavorite,
      });

      const { datePlans, dateHistories } = get();

      // Update the favorite status in the state
      set({
        datePlans: datePlans.map((plan) =>
          plan._id === datePlanId ? { ...plan, isFavourite: isFavorite } : plan
        ),
        dateHistories: dateHistories.map((history) =>
          history.id === datePlanId
            ? { ...history, isFavorite: isFavorite }
            : history
        ),
      });
    } catch (error) {
      console.error("Error updating favorite status:", error);
      throw error;
    }
  },

  // Fetch all partners
  fetchPartners: async () => {
    try {
      const userId = await SecureStore.getItemAsync("userId");
      if (!userId) {
        Alert.alert("Error", "User not authenticated");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/partners?userId=${userId}`
      );
      set({ partners: response.data });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch partners");
      console.error("Fetch partners error:", error);
    }
  },

  // Create a new date plan
  createDatePlan: async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/date-plans",
        data
      );
      set({
        datePlans: [response.data.datePlan],
        activities: response.data.activities,
      });
      console.log("Generated Date Plan:", response.data);
    } catch (error) {
      console.error("Error generating date plan:", error);
      throw error;
    }
  },
}));
