import Header from "@/components/Header";
import { colors } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const FavouritesScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Favourites",
            header: () => <Header />,
          }}
        />
      </Stack>
    </View>
  );
};

export default FavouritesScreenLayout;
