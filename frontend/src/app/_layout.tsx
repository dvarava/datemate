import React from "react";
import { Stack } from "expo-router";
import AuthScreen from "@/auth/AuthScreen";
import { useAuthStore } from "@/store/authStore";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Black": require("assets/fonts/Nunito-Black.ttf"),
    "Nunito-Italic": require("assets/fonts/Nunito-Italic.ttf"),
  });

  const { isAuthenticated } = useAuthStore();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return isAuthenticated ? (
    <SafeAreaProvider>
      <RootNavigation />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  ) : (
    <AuthScreen />
  );
};

const RootNavigation = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
};

export default App;