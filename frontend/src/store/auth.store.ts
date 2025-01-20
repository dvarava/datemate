import * as AppleAuthentication from "expo-apple-authentication";
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

type AuthState = {
  user: {
    id: string | null;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: { id: string }, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  setAuthFromGoogle: (token: string) => Promise<void>;
  validateSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: async (user, token) => {
    set({ user, token, isAuthenticated: !!user });
    await SecureStore.setItemAsync("userId", user.id);
    await SecureStore.setItemAsync("token", token);
  },

  logout: async () => {
    set({ user: null, token: null, isAuthenticated: false });
    await SecureStore.deleteItemAsync("userId");
    await SecureStore.deleteItemAsync("token");
  },
  loginWithApple: async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
      });
      const response = await fetch("http://localhost:3000/auth/apple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: credential.identityToken,
        }),
      });
      const data = await response.json();
      if (data && data.user) {
        await SecureStore.setItemAsync("userId", data.user._id);
        await SecureStore.setItemAsync("token", data.accessToken);
        set({
          user: { id: data.user._id },
          token: data.accessToken,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("Apple login error:", error);
    }
  },

  setAuthFromGoogle: async (token: string) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userProfile = await res.json();

      const backendResponse = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userProfile.email,
        }),
      });

      const backendData = await backendResponse.json();
      if (backendData && backendData.user && backendData.accessToken) {
        await SecureStore.setItemAsync("userId", backendData.user._id);
        await SecureStore.setItemAsync("token", backendData.accessToken);

        set({
          user: { id: backendData.user._id },
          token: backendData.accessToken,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  },

  validateSession: async () => {
    try {
      const [userId, token] = await Promise.all([
        SecureStore.getItemAsync("userId"),
        SecureStore.getItemAsync("token"),
      ]);

      if (userId && token) {
        set({
          user: { id: userId },
          token,
          isAuthenticated: true,
        });
      } else {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("Session validation error:", error);
      // Clear everything if validation fails
      await SecureStore.deleteItemAsync("userId");
      await SecureStore.deleteItemAsync("token");
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },
}));
