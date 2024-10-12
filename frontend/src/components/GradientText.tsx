import React from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { colors } from "@/constants/tokens";

interface GradientTextProps {
  text: string;
  style: StyleProp<TextStyle>;
}

const GradientText: React.FC<GradientTextProps> = ({ text, style }) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: "transparent" }]}>{text}</Text>
      }
    >
      <LinearGradient
        colors={[
          colors.premium1,
          colors.premium2,
          colors.premium3,
          colors.premium4,
        ]}
        start={{ x: 0.9, y: 3.9 }}
        end={{ x: 1.4, y: 0.9 }}
      >
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;