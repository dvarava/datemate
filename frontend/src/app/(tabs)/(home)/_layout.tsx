import React from "react";
import { Stack } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors, fontSize } from "@/constants/tokens";
import Header from "@/components/Header";

const HomeScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <Header />,
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default HomeScreenLayout;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.secondaryBackground,
  } as ViewStyle,
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
  } as ViewStyle,
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  logo: {
    width: 35,
    height: 35,
    marginRight: 7,
    resizeMode: "contain",
  } as ImageStyle,
  appName: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Black",
  } as TextStyle,
});
