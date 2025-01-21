import { create } from "zustand";
import { Alert } from "react-native";
import { Partner, PartnerInput } from "./types/partner";
import { verifyAuth, handleAuthError } from "../utils/auth";

type PartnerState = {
  partners: Partner[];
  addPartner: (partner: PartnerInput) => Promise<void>;
  fetchPartners: () => Promise<void>;
  fetchPartnerById: (partnerId: string) => Partner | undefined;
  editPartner: (
    partnerId: string,
    partnerData: Partial<Partner>
  ) => Promise<void>;
  deletePartner: (partnerId: string) => Promise<void>;
};

export const usePartnerStore = create<PartnerState>((set, get) => ({
  partners: [],

  addPartner: async (partner: PartnerInput) => {
    try {
      const { userId, token } = await verifyAuth();
      const response = await fetch("http://localhost:3000/partners", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, ...partner }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch partners");
      }

      const newPartner: Partner = await response.json();
      set((state) => ({
        partners: [...state.partners, newPartner],
      }));
    } catch (error) {
      handleAuthError(error);
    }
  },

  fetchPartners: async () => {
    try {
      const { userId, token } = await verifyAuth();
      const response = await fetch(
        `http://localhost:3000/partners?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch partners");
      }

      const partners = await response.json();
      set({ partners });
    } catch (error) {
      handleAuthError(error);
    }
  },

  fetchPartnerById: (partnerId: string) => {
    const state = get();
    return state.partners.find((partner) => partner._id === partnerId);
  },

  editPartner: async (partnerId: string, partnerData: Partial<Partner>) => {
    try {
      const { token } = await verifyAuth();
      const response = await fetch(
        `http://localhost:3000/partners/${partnerId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(partnerData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit partner");
      }

      const updatedPartner = await response.json();
      set((state) => ({
        partners: state.partners.map((p) =>
          p._id === partnerId ? updatedPartner : p
        ),
      }));
    } catch (error) {
      handleAuthError(error);
    }
  },

  deletePartner: async (partnerId: string) => {
    try {
      const { token } = await verifyAuth();
      const response = await fetch(
        `http://localhost:3000/partners/${partnerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete partner");
      }

      set((state) => ({
        partners: state.partners.filter((p) => p._id !== partnerId),
      }));
    } catch (error) {
      handleAuthError(error);
    }
  },
}));
