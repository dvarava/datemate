import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { colors } from "@/constants/tokens";
import { googleSignIn } from "../google-sign-in";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "488836930557-dsk3c9jcemvtnf7mi1j0hbt188dpn0qb.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  offlineAccess: true,
  forceCodeForRefreshToken: false,
  iosClientId: "488836930557-21ah4dbf3ctbf8n5fpa9n9v7a59plqgj.apps.googleusercontent.com",
});

const LoginWithGoogle = () => {
  
  return (
    <TouchableOpacity style={styles.wrapper} onPress={googleSignIn}>
      <Image source={require("assets/google-logo.png")} style={styles.brand} />
      <Text style={styles.txt}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
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
  brand: {
    width: 20,
    height: 20,
  },
  txt: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    padding: 5,
    fontFamily: "Nunito-Bold",
  },
});

export default LoginWithGoogle;