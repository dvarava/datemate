import HeaderWithBack from "@/components/HeaderWithBack";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const SettingsScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Unsubscribe",
            header: () => <HeaderWithBack title="Unsubscribe" />,
          }}
        />
      </Stack>
    </View>
  );
};

export default SettingsScreenLayout;
