import HeaderWithBack from "@/components/HeaderWithBack";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const PremiumScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Unlock Premium",
            header: () => <HeaderWithBack title="Unlock Premium" />,
          }}
        />
      </Stack>
    </View>
  );
};

export default PremiumScreenLayout;
