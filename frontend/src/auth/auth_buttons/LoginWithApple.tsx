import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useAuthStore } from "@/store/auth.store";
import { colors } from "@/constants/tokens";

const LoginWithApple = () => {
  const loginWithApple = useAuthStore((state) => state.loginWithApple);

  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <TouchableOpacity style={styles.customButton} onPress={loginWithApple}>
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
