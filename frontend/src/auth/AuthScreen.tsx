import React from "react";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import LoginWithGoogle from "./auth_buttons/LoginWithGoogle";
import LoginWithApple from "./auth_buttons/LoginWithApple";
import { colors, fontSize } from "@/constants/tokens";

export default function AuthScreen() {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Black": require("assets/fonts/Nunito-Black.ttf"),
  });

  const handleTermsOfServicePress = () => {
    console.log("Terms of Service pressed");
  };

  const handlePrivacyPolicyPress = () => {
    console.log("Privacy Policy pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>DateMate AI</Text>
      </View>
      <View style={styles.buttonContainer}>
        <LoginWithApple />
        <LoginWithGoogle />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>By signing in I agree and accept</Text>
        <TouchableOpacity>
          <Text style={styles.text}>
            <Text
              style={styles.linkText}
              onPress={() => handleTermsOfServicePress()}
            >
              Terms Of Service
            </Text>
            {" and "}
            <Text
              style={styles.linkText}
              onPress={() => handlePrivacyPolicyPress()}
            >
              Privacy Policy
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 70,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    fontFamily: "Nunito-Black",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 5,
  },
  footer: {
    alignItems: "center",
    marginTop: 30,
  },
  footerText: {
    color: colors.primary,
    fontSize: fontSize.xs,
    fontFamily: "Nunito-Regular",
  },
  text: {
    color: colors.primary,
    fontSize: fontSize.xs,
    marginTop: 5,
    fontFamily: "Nunito-Regular",
  },
  linkText: {
    textDecorationLine: "underline",
    color: colors.secondary,
    fontSize: fontSize.xs,
    marginTop: 5,
    fontFamily: "Nunito-Regular",
  },
});
