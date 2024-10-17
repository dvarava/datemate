import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fontSize } from "@/constants/tokens";
import GradientText from "@/components/GradientText";
import GradientIcon from "@/components/GradientIcon";
import GradientBorder from "@/components/GradientBorder";
import { Ionicons } from "@expo/vector-icons";

const PremiumScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const router = useRouter();

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleProceedToPurchase = () => {
    if (selectedPlan) {
      console.log(`Proceeding to purchase: ${selectedPlan}`);
    } else {
      console.log("No plan selected");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("assets/gold-logo.png")}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>DateMate</Text>
            <GradientText text="PREMIUM" style={styles.premiumText} />
          </View>
        </View>

        <View style={styles.plansContainer}>
          {/* Yearly Plan */}
          <TouchableOpacity onPress={() => handleSelectPlan("yearly")}>
            <View style={styles.planCardWrapper}>
              {selectedPlan === "yearly" ? (
                <GradientBorder
                  borderRadius={15}
                  colors={[
                    colors.premium1,
                    colors.premium2,
                    colors.premium3,
                    colors.premium4,
                  ]}
                  start={{ x: 0.25, y: 0.3 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.planCard}>
                    <View style={styles.planDetailsContainer}>
                      <Text style={styles.planTitle}>12 Months</Text>
                      <View style={styles.oldPriceContainer}>
                        <Text style={styles.oldPrice}>$60</Text>
                        <Text style={styles.discountedPrice}>$45</Text>
                      </View>
                    </View>

                    <View style={styles.monthlyPriceContainer}>
                      <Text style={styles.monthlyPrice}>$3.75 / month</Text>
                    </View>
                  </View>
                </GradientBorder>
              ) : (
                <View style={styles.planCard}>
                  <View style={styles.planDetailsContainer}>
                    <Text style={styles.planTitle}>12 Months</Text>
                    <View style={styles.oldPriceContainer}>
                      <Text style={styles.oldPrice}>$60</Text>
                      <Text style={styles.discountedPrice}>$45</Text>
                    </View>
                  </View>

                  <View style={styles.monthlyPriceContainer}>
                    <Text style={styles.monthlyPrice}>$3.75 / month</Text>
                  </View>
                </View>
              )}

              <LinearGradient
                colors={["#000000", "#202020", "#252525"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mostPopularBadge}
              >
                <Text style={styles.mostPopularText}>Most popular</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>

          {/* Quarterly Plan */}
          <TouchableOpacity onPress={() => handleSelectPlan("quarterly")}>
            {selectedPlan === "quarterly" ? (
              <GradientBorder
                borderRadius={15}
                colors={[
                  colors.premium1,
                  colors.premium2,
                  colors.premium3,
                  colors.premium4,
                ]}
                start={{ x: 0.25, y: 0.3 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.planCard}>
                  <View style={styles.planDetailsContainer}>
                    <Text style={styles.planTitle}>3 Months</Text>
                    <View style={styles.oldPriceContainer}>
                      <Text style={styles.discountedPrice}>$24.99</Text>
                    </View>
                  </View>

                  <View style={styles.monthlyPriceContainer}>
                    <Text style={styles.monthlyPrice}>$7.99 / month</Text>
                  </View>
                </View>
              </GradientBorder>
            ) : (
              <View style={styles.planCard}>
                <View style={styles.planDetailsContainer}>
                  <Text style={styles.planTitle}>3 Months</Text>
                  <View style={styles.oldPriceContainer}>
                    <Text style={styles.discountedPrice}>$24.99</Text>
                  </View>
                </View>

                <View style={styles.monthlyPriceContainer}>
                  <Text style={styles.monthlyPrice}>$7.99 / month</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <GradientText
          text="WITH YEARLY PLAN YOU SAVE 30%"
          style={styles.savingsText}
        />

        {/* Features Section */}
        <View style={styles.featureCard}>
          <GradientBorder
            borderRadius={20}
            colors={[
              colors.premium1,
              colors.premium2,
              colors.premium3,
              colors.premium4,
            ]}
            start={{ x: 0.25, y: 0.3 }}
            end={{ x: 1, y: 1 }}
          >
            <LinearGradient
              colors={["#000000", "#252525", "#000000", "#252525"]}
              locations={[0, 0.25, 0.5, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 0 }}
              style={styles.featureCardContentWrapper}
            >
              <View style={styles.featureCardContent}>
                <FeatureItem
                  icon="cash-outline"
                  text="Set budget for the date."
                />
                <FeatureItem
                  icon="happy-outline"
                  text="Set the mood for the date."
                />
                <FeatureItem icon="cloud-outline" text="Adjust to the weather." />
                <FeatureItem
                  icon="speedometer-outline"
                  text="Increased date generations."
                />
                <FeatureItem
                  icon="gift-outline"
                  text="Tailored gift recommendation."
                />
                <FeatureItem
                  icon="time-outline"
                  text="Select preferred date time."
                />
                <FeatureItem icon="timer-outline" text="Set date duration." />
              </View>
            </LinearGradient>
          </GradientBorder>
        </View>
      </ScrollView>

      {/* Continue Button Section */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={handleProceedToPurchase}
          style={styles.fullButton}
        >
          <LinearGradient
            colors={[
              colors.premium1,
              colors.premium2,
              colors.premium3,
              colors.premium4,
            ]}
            start={{ x: 0.25, y: 0.3 }}
            end={{ x: 1, y: 1 }}
            style={styles.continueButton}
          >
            <Text style={styles.continueButtonText}>CONTINUE</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FeatureItem = ({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) => (
  <View style={styles.feature}>
    <GradientIcon name={icon} size={24} />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "space-between",
  } as ViewStyle,
  scrollContainer: {
    flex: 1,
  } as ViewStyle,
  scrollContent: {
    paddingHorizontal: 20,
  } as ViewStyle,
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
  } as ViewStyle,
  logoContainer: {
    marginRight: 6,
  } as ViewStyle,
  logoImage: {
    width: 40,
    height: 40,
  } as ImageStyle,
  titleContainer: {
    flexDirection: "column",
    padding: 0,
    marginBottom: 10,
    marginTop: 10,
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    fontFamily: "Nunito-Bold",
  } as TextStyle,
  premiumText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "gold",
    fontFamily: "Nunito-Black",
    marginTop: -6,
  } as TextStyle,
  plansContainer: {
    marginBottom: 8,
    gap: 10,
  } as ViewStyle,
  planCardWrapper: {
    position: "relative",
    overflow: "visible",
  } as ViewStyle,
  planCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 13,
    borderRadius: 15,
    backgroundColor: "#333",
  } as ViewStyle,
  mostPopularBadge: {
    position: "absolute",
    right: 12,
    top: -12,
    zIndex: 1,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#000000",
  } as ViewStyle,
  mostPopularText: {
    fontSize: 12,
    color: "white",
  } as TextStyle,
  planDetailsContainer: {
    flexDirection: "column",
  } as ViewStyle,
  monthlyPriceContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  } as ViewStyle,
  planTitle: {
    fontSize: fontSize.md,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Nunito-Black",
  } as TextStyle,
  oldPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  oldPrice: {
    fontSize: fontSize.xs,
    textDecorationLine: "line-through",
    color: "#aaa",
    marginRight: 5,
    fontFamily: "Nunito-Bold",
  } as TextStyle,
  discountedPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Nunito-Bold",
  } as TextStyle,
  monthlyPrice: {
    fontSize: 17,
    color: "white",
  } as TextStyle,
  savingsText: {
    textAlign: "center",
    color: colors.premium2,
    marginBottom: 30,
    fontFamily: "Nunito-Bold",
    fontSize: 11,
  } as TextStyle,
  featureCard: {
    marginHorizontal: 30,
  } as ViewStyle,
  featureCardContentWrapper: {
    borderRadius: 20,
    paddingVertical: 10,
    borderColor: "transparent",
  } as ViewStyle,
  featureCardContent: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    gap: 10,
  } as ViewStyle,
  feature: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  gradientIcon: {
    color: "white",
  } as TextStyle,
  featureText: {
    fontSize: 16,
    marginLeft: 10,
    color: "white",
    fontFamily: "Nunito-Regular",
  } as TextStyle,
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  } as ViewStyle,
  fullButton: {
    borderRadius: 25,
    overflow: "hidden",
  } as ViewStyle,
  continueButton: {
    borderRadius: 25,
    alignItems: "center",
    paddingVertical: 15,
  } as ViewStyle,
  continueButtonText: {
    fontSize: 16,
    color: colors.background,
    fontWeight: "bold",
    fontFamily: "Nunito-Black",
  } as TextStyle,
});

export default PremiumScreen;
