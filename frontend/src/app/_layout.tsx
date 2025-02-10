import 'react-native-get-random-values';
import React from "react";
import { Stack } from "expo-router";
import AuthScreen from "@/auth/AuthScreen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import { enableScreens } from 'react-native-screens';
import AuthProvider, { useAuth } from '@/providers/AuthProvider';

enableScreens();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Black": require("assets/fonts/Nunito-Black.ttf"),
    "Nunito-Italic": require("assets/fonts/Nunito-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return session ? (
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
