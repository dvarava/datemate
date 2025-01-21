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
  fetchAllDatePlans: () => Promise<void>;
  fetchDatePlansByPartnerId: (partnerId: string) => Promise<void>;
  fetchDatePlanById: (datePlanId: string) => Promise<void>;
  fetchPartners: () => Promise<void>;
  setFavorite: (datePlanId: string, isFavorite: boolean) => Promise<void>;
  fetchFavoriteDatePlans: () => Promise<void>;
  createDatePlan: (data: any) => Promise<void>;
}

export const useDateStore = create<DateState>((set, get) => ({
  datePlans: [],
  activities: [],
  partners: [],
  dateHistories: [],

  fetchDatePlansByPartnerId: async (partnerId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/date-plans/partners/${partnerId}`
      );

      // Check if the response has data but no date plans
      if (response.data && !response.data.datePlans?.length) {
        set({ dateHistories: [] }); // Set empty array for no plans
        return;
      }

      set({ dateHistories: response.data.datePlans || [] });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Handle 404 (Not Found) as empty date plans
        set({ dateHistories: [] });
      } else {
        // Handle other errors
        console.error("Error fetching date plans:", error);
        Alert.alert("Error", "Failed to fetch date plans. Please try again.");
      }
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

  fetchAllDatePlans: async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      console.log("Stored token:", token);

      // Decode and log the token content (for debugging only)
      if (token) {
        const tokenParts = token.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        console.log("Decoded token payload:", payload);
      }

      const response = await axios.get("http://localhost:3000/date-plans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", response.data);
      set({ dateHistories: response.data || [] });
    } catch (error) {
      console.error("Error fetching all date plans:", error);
      if (axios.isAxiosError(error)) {
        console.log("Response data:", error.response?.data);
        console.log("Response status:", error.response?.status);
      }
      Alert.alert("Error", "Failed to fetch date plans. Please try again.");
    }
  },

  setFavorite: async (datePlanId: string, isFavorite: boolean) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      await axios.post(
        `http://localhost:3000/date-plans/${datePlanId}/toggle-favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      const { dateHistories } = get();
      set({
        dateHistories: dateHistories.map((history) =>
          history.id === datePlanId
            ? { ...history, isFavorite: !history.isFavorite }
            : history
        ),
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      Alert.alert("Error", "Failed to update favorite status.");
    }
  },

  fetchFavoriteDatePlans: async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get("http://localhost:3000/date-plans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter only favorite date plans
      const favoritePlans = response.data.filter(
        (plan: DatePlan) => plan.isFavourite === true
      );
      set({ dateHistories: favoritePlans });
    } catch (error) {
      console.error("Error fetching favorite date plans:", error);
      if (axios.isAxiosError(error)) {
        console.log("Response data:", error.response?.data);
        console.log("Response status:", error.response?.status);
      }
      Alert.alert(
        "Error",
        "Failed to fetch favorite date plans. Please try again."
      );
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
