import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors as themeColors } from '@/constants/tokens';

interface GradientBorderProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  borderRadius?: number;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  style,
  borderRadius = 10,
  colors = [themeColors.secondary, themeColors.primary],
  start = { x: 0.6, y: 0 },
  end = { x: 1.4, y: 1 },
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[styles.gradientBorder, { borderRadius }]}
    >
      <View style={[styles.innerContent, { borderRadius }, style]}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 1.5,
  },
  innerContent: {
    backgroundColor: themeColors.secondaryBackground,
  },
});

export default GradientBorder;
