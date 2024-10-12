import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import AuthScreen from "@/auth/AuthScreen";
import { useAuthStore } from "@/store/authStore";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";import 'react-native-get-random-values';


SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Black": require("assets/fonts/Nunito-Black.ttf"),
    "Nunito-Italic": require("assets/fonts/Nunito-Italic.ttf"),
  });

  const { isAuthenticated, setAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        setAuth({ token });
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (!loading && fontsLoaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [loading, fontsLoaded]);

  if (loading || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // return isAuthenticated ? (
  //   <SafeAreaProvider>
  //     <RootNavigation />
  //     <StatusBar style="auto" />
  //   </SafeAreaProvider>
  // ) : (
  //   <AuthScreen />
  // );

  return (
    <SafeAreaProvider>
      <RootNavigation />
      <StatusBar style="auto" />
    </SafeAreaProvider>
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
