import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useAuthStore } from "@/store/authStore";
import { colors } from "@/constants/tokens";

const webClientId =
  "488836930557-abivotpv3q8t8iqkm07ai976jm5ahaph.apps.googleusercontent.com";
const iosClientId =
  "488836930557-d61hts76ruifk9722k8updijfkam2l7f.apps.googleusercontent.com";
const androidClientId =
  "488836930557-plah1vg3k9a525b8hs97tjlii783m2t0.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

const LoginWithGoogle = () => {
  const { setAuthFromGoogle } = useAuthStore();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId,
    iosClientId,
    androidClientId,
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      setAuthFromGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => promptAsync()}>
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