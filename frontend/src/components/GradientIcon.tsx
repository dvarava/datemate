import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { ViewStyle } from "react-native";
import { colors } from "@/constants/tokens";

const GradientIcon: React.FC<{
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  style?: ViewStyle;
}> = ({ name, size, style }) => {
  return (
    <MaskedView
      maskElement={<Ionicons name={name} size={size} color="white" style={style} />}
    >
      <LinearGradient
        colors={[
          colors.premium1,
          colors.premium2,
          colors.premium3,
          colors.premium4,
        ]}
        start={{ x: 0.7, y: 0 }}
        end={{ x: 1.4, y: 1 }}
        style={[{ width: size, height: size }, style]}
      />
    </MaskedView>
  );
};

export default GradientIcon;
