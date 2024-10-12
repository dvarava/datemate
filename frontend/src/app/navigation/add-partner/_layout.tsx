import HeaderWithClose from "@/components/HeaderWithClose";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const AddPartnerScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Add Partner",
            header: () => <HeaderWithClose title="Add Partner" />,
          }}
        />
      </Stack>
    </View>
  );
};

export default AddPartnerScreenLayout;
