import HeaderWithBack from "@/components/HeaderWithBack";
import { colors } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const InviteScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Invite",
            header: () => <HeaderWithBack title="Invite a Friend" />,
          }}
        />
      </Stack>
    </View>
  );
};

export default InviteScreenLayout;
