import "react-native-get-random-values";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import AuthScreen from "@/auth/AuthScreen";
import { useAuthStore } from "@/store/auth.store";
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

  const { isAuthenticated, validateSession } = useAuthStore();

  useEffect(() => {
    validateSession();
  }, []);

  if (!fontsLoaded || isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  // Login screen for production build
  return isAuthenticated ? (
    <SafeAreaProvider>
      <RootNavigation />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  ) : (
    <AuthScreen />
  );

  // Uncomment this block for development build and comment the above block
  // return  (
  //   <SafeAreaProvider>
  //     <RootNavigation />
  //     <StatusBar style="auto" />
  //   </SafeAreaProvider>
  // );
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
