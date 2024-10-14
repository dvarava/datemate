import * as AppleAuthentication from 'expo-apple-authentication';
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

type AuthState = {
  user: {
    id: string | null;
  } | null;
  isAuthenticated: boolean;
  setAuth: (user: { id: string }) => Promise<void>;
  logout: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  setAuthFromGoogle: (token: string) => Promise<void>;
  validateSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setAuth: async (user) => {
    set({ user, isAuthenticated: !!user });
    await SecureStore.setItemAsync('userId', user.id);
  },

  logout: async () => {
    set({ user: null, isAuthenticated: false });
    await SecureStore.deleteItemAsync('userId');
  },

  loginWithApple: async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
      });

      const response = await fetch('http://localhost:3000/auth/apple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: credential.identityToken,
          authorizationCode: credential.authorizationCode,
          email: credential.email,
        }),
      });

      const data = await response.json();
      if (data && data.user) {
        await SecureStore.setItemAsync('userId', data.user._id);
        set({ user: { id: data.user._id }, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Apple login error:', error);
    }
  },

  setAuthFromGoogle: async (token: string) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userProfile = await res.json();

      const backendResponse = await fetch('http://localhost:3000/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userProfile.email,
        }),
      });

      const backendData = await backendResponse.json();
      if (backendData && backendData.user) {
        await SecureStore.setItemAsync('userId', backendData.user._id);
        set({
          user: { id: backendData.user._id },
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  },

  validateSession: async () => {
    const userId = await SecureStore.getItemAsync('userId');
    if (userId) {
      set({
        user: { id: userId },
        isAuthenticated: true,
      });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },
}));