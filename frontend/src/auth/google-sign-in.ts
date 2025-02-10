import {
    GoogleSignin,
    statusCodes,
  } from "@react-native-google-signin/google-signin";
import { supabase } from "../lib/supabase";
  
export const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
  
      // Sign in and get user info
      await GoogleSignin.signIn();
  
      // Get the ID token
      const { idToken } = await GoogleSignin.getTokens();
  
      if (!idToken) {
        throw new Error("No ID token present in sign-in response");
      }
  
      // Debug logging
      console.log("ID Token present:", !!idToken);
  
      // Sign in to Supabase with the Google ID token
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
      });
  
      if (error) {
        console.error("Supabase auth error:", error);
        throw error;
      }
  
      console.log("Sign in successful:", data);
      return data;
    } catch (error) {
      console.error("Auth error:", error);
  
      if (error instanceof Error && "code" in error) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log("User cancelled the sign-in flow");
            break;
          case statusCodes.IN_PROGRESS:
            console.log("Sign-in already in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("Play services not available or outdated");
            break;
          default:
            console.log("Unknown error:", error);
        }
      }
      throw error;
    }
};  