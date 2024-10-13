import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useAuthStore } from "@/store/authStore";
import { colors } from "@/constants/tokens";

const LoginWithApple = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const signIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log({
        id: credential.identityToken,
        authorization_code: credential.authorizationCode,
      });

      setAuth({
        id: credential.identityToken,
        authorization_code: credential.authorizationCode,
        name: credential.fullName,
        email: credential.email,
      });
    } catch (e: any) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        console.log("User canceled the sign-in request");
      } else {
        console.log("An error occurred: ", e);
      }
    }
  };

  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <TouchableOpacity style={styles.customButton} onPress={signIn}>
      <Image
        source={require("assets/apple-logo.png")}
        style={styles.appleLogo}
      />
      <Text style={styles.customButtonText}>Sign in with Apple</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 250,
    justifyContent: "center",
    marginVertical: 10,
  },
  customButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    padding: 5,
    fontFamily: "Nunito-Bold",
  },
  appleLogo: {
    width: 16,
    height: 16,
  },
});

export default LoginWithApple;
