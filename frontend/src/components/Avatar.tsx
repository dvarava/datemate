import React from "react";
import { ViewStyle, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AvatarProps {
  style?: ViewStyle;
  gradient: string[];
}

const Avatar: React.FC<AvatarProps> = ({ style, gradient }) => {
  const [startColor, endColor] = Array.isArray(gradient) && gradient.length === 2 
    ? gradient 
    : ["#ff0262", "#ffffff"];

  return (
    <LinearGradient
      colors={[startColor, endColor]}
      start={{ x: 0.2, y: 0.1 }}
      end={{ x: 1, y: 0.7 }}
      style={[styles.avatar, style]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 4,
  },
});

export default Avatar;
