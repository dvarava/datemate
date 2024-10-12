import HeaderWithBack from "@/components/HeaderWithBack";
import { colors } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const PartnerDetailsScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Partner Details",
            header: () => <HeaderWithBack title="Partner Details" />,
          }}
        />
      </Stack>
    </View>
  );
};

export default PartnerDetailsScreenLayout;
