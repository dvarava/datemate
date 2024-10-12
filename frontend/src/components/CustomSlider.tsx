import React from "react";
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants/tokens";
import * as Haptics from 'expo-haptics';

interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step,
}) => {

  const handleValueChange = (value: number) => {
    Haptics.selectionAsync();
    onValueChange(value);
  };

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.trackContainer}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 1.5, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientTrack}
        />
      </View>
      <Slider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={handleValueChange}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor={colors.primary}
      />
    </View>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    position: "relative",
    height: 40,
    justifyContent: "center",
  },
  trackContainer: {
    position: "absolute",
    width: "100%",
    height: 6,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
  },
  gradientTrack: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  slider: {
    width: "100%",
    height: 40,
    position: "absolute",
  },
});
