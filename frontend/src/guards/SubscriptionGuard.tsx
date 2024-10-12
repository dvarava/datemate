import React from "react";
import { View, StyleSheet, StyleProp, TextStyle, DimensionValue } from "react-native";
import GradientText from "@/components/GradientText";
import GradientIcon from "@/components/GradientIcon";

interface SubscriptionGuardProps {
  isPremium: boolean;
  children?: React.ReactNode;
  lockedText?: string;
  textStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  lockedTextMarginRight?: number;
  premiumCard?: React.ReactNode;
  regularCard?: React.ReactNode;
  lockedTextPaddingVertical?: DimensionValue;
}

const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({
  isPremium,
  children,
  lockedText = "Premium",
  textStyle,
  iconSize = 24,
  lockedTextMarginRight = 10,
  premiumCard,
  regularCard,
  lockedTextPaddingVertical = 0,
}) => {
  if (premiumCard && regularCard) {
    return isPremium ? (
      <>{regularCard}</>
    ) : (
      <>{premiumCard}</>
    );
  }

  return isPremium ? (
    <>{children}</>
  ) : (
    <View style={styles.lockedContent}>
      <GradientText
        text={lockedText}
        style={[
          styles.lockedText, 
          textStyle, 
          { 
            marginRight: lockedTextMarginRight, 
            paddingVertical: lockedTextPaddingVertical 
          }
        ]}
      />
      <GradientIcon name="lock-closed" size={iconSize} />
    </View>
  );
};

const styles = StyleSheet.create({
  lockedContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  lockedText: {
    fontSize: 16,
    color: "#FFD700",
    fontFamily: "Nunito-Regular",
  },
});

export default SubscriptionGuard;
