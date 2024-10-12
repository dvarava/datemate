import HeaderWithBack from "@/components/HeaderWithBack";
import HeaderWithHome from "@/components/HeaderWithHome";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const DatePlanScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Date Plan",
            header: () => <HeaderWithHome title="Date Plan" />,
          }}
        />
      </Stack>
    </View>
  );
};

export default DatePlanScreenLayout;
