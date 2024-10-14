import * as AppleAuthentication from 'expo-apple-authentication';
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

type AuthState = {
  user: {
    id: string | null;
    email: string | null;
  } | null;
  isAuthenticated: boolean;
  setAuth: (user: { id: string; email: string | null }) => void;
  logout: () => void;
  loginWithApple: () => Promise<void>;
  setAuthFromGoogle: (token: string) => Promise<void>;}
  ;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setAuth: (user) => set({ user, isAuthenticated: !!user }),

  logout: () => set({ user: null, isAuthenticated: false }),

  loginWithApple: async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
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
      console.log('Response from backend:', data);

      if (data && data.user) {
        set({ user: { id: data.user._id, email: data.user.email }, isAuthenticated: true });
      }

    } catch (error: any) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        console.log('User canceled the sign-in request');
      } else {
        console.error('Apple login error:', error);
      }
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
        set({
          user: {
            id: backendData.user._id,
            email: backendData.user.email,
          },
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  },
}));