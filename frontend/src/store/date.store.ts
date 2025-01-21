import { create } from "zustand";
import axios from "axios";
import { Alert } from "react-native";
import { Partner } from "./types/partner";
import { Activity, DatePlan, DateHistory } from "./types/date";
import { verifyAuth, handleAuthError } from "../utils/auth";

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
  createDatePlan: (data: any) => Promise<void>;
  fetchFavoriteDatePlans: () => Promise<void>;
}

export const useDateStore = create<DateState>((set, get) => ({
  datePlans: [],
  activities: [],
  partners: [],
  dateHistories: [],

  fetchDatePlansByPartnerId: async (partnerId: string) => {
    try {
      const { token } = await verifyAuth();
      const response = await axios.get(
        `http://localhost:3000/date-plans/partners/${partnerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the response has data but no date plans
      if (response.data && !response.data.datePlans?.length) {
        set({ dateHistories: [] }); // Set empty array for no plans
        return;
      }

      set({ dateHistories: response.data.datePlans || [] });
    } catch (error) {
      handleAuthError(error);
    }
  },

  // Fetch a specific date plan by ID
  fetchDatePlanById: async (datePlanId: string) => {
    try {
      const { token } = await verifyAuth();
      const response = await axios.get(
        `http://localhost:3000/date-plans/${datePlanId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      handleAuthError(error);
    }
  },

  fetchAllDatePlans: async () => {
    try {
      const { token } = await verifyAuth();
      const response = await axios.get("http://localhost:3000/date-plans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      set({ dateHistories: response.data || [] });
    } catch (error) {
      handleAuthError(error);
    }
  },

  setFavorite: async (datePlanId: string, isFavorite: boolean) => {
    try {
      const { token } = await verifyAuth();
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
      handleAuthError(error);
    }
  },

  // Fetch all partners
  fetchPartners: async () => {
    try {
      const { userId, token } = await verifyAuth();
      const response = await axios.get(
        `http://localhost:3000/partners?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ partners: response.data });
    } catch (error) {
      handleAuthError(error);
    }
  },

  // Create a new date plan
  createDatePlan: async (data: any) => {
    try {
      const { token } = await verifyAuth();
      const response = await axios.post(
        "http://localhost:3000/date-plans",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({
        datePlans: [response.data.datePlan],
        activities: response.data.activities,
      });
      console.log("Generated Date Plan:", response.data);
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  },

  fetchFavoriteDatePlans: async () => {
    try {
      const { token } = await verifyAuth();
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
}));
