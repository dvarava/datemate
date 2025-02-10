import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "@/lib/supabase";
import { colors } from "@/constants/tokens";

export function LoginWithApple() {
  if (Platform.OS === "ios")
    return (
      <TouchableOpacity
        style={styles.customButton}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            
            if (credential.identityToken) {
              // Add debug logging
              console.log('Apple ID Token:', credential.identityToken);
              
              const response = await supabase.auth.signInWithIdToken({
                provider: "apple",
                token: credential.identityToken,
              });
              console.log("Supabase response:", response);
            }
          } catch (e) {
            console.error('Authentication error:', e);
          }
        }}
      >
        <Image
          source={require("assets/apple-logo.png")}
          style={styles.appleLogo}
        />
        <Text style={styles.customButtonText}>Sign in with Apple</Text>
      </TouchableOpacity>
    );
  
  return null; // Return null for non-iOS platforms
}

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