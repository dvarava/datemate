import HeaderWithBack from "@/components/HeaderWithBack";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const GenerateDateScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Generate Date",
            header: () => <HeaderWithBack title="Generate Date" />,
          }}
        />
      </Stack>
    </View>
  );
};

export default GenerateDateScreenLayout;
