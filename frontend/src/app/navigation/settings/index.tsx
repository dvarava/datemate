import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
  Linking,
  Image,
  ImageStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, fontSize } from "@/constants/tokens";
import GradientText from "@/components/GradientText";
import { LinearGradient } from "expo-linear-gradient";

const SettingsScreen = () => {
  const router = useRouter();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const handlePremiumPress = () => {
    router.push("/navigation/premium");
  };

  const handleInviteFriends = () => {
    router.push("/navigation/invite");
  };

  const handleUnsubscribe = () => {
    router.push("/navigation/unsubscribe");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Premium Section */}
      <View style={styles.section}>
        <View style={styles.premiumHeader}>
          <View style={styles.logoContainer}>
            <Image
              source={require("assets/gold-logo.png")}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.premiumTitleContainer}>
            <Text style={styles.premiumTitle}>DateMate</Text>
            <GradientText text="PREMIUM" style={styles.premiumText} />
          </View>
        </View>
        <LinearGradient
          colors={[
            colors.premium1,
            colors.premium2,
            colors.premium3,
            colors.premium4,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <TouchableOpacity
            style={styles.premiumOptionButton}
            activeOpacity={0.6}
            onPress={handlePremiumPress}
          >
            <Text
              style={[
                styles.optionText,
                { color: colors.background, fontFamily: "Nunito-Black" },
              ]}
            >
              Learn More Premium
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.background}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.optionButton} activeOpacity={0.6}>
          <Text style={styles.optionText}>Delete Account</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.6}
          onPress={handleUnsubscribe}
        >
          <Text style={styles.optionText}>Unsubscribe Account</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Invite Friend Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Invite a Friend</Text>
        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.6}
          onPress={handleInviteFriends}
        >
          <Text style={styles.optionText}>Invite your friends</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Legal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>

        <TouchableOpacity style={styles.optionButton} activeOpacity={0.6}>
          <Text style={styles.optionText}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} activeOpacity={0.6}>
          <Text style={styles.optionText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} activeOpacity={0.6}>
          <Text style={styles.optionText}>Cookie Policy</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* App Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>

        <TouchableOpacity style={styles.optionButton} activeOpacity={0.6}>
          <Text style={styles.optionText}>About the App</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} activeOpacity={0.6}>
          <Text style={styles.optionText}>Support & FAQ</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Social Media Links */}
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => openLink("https://tiktok.com")}>
          <Ionicons name="logo-tiktok" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("https://instagram.com")}>
          <Ionicons name="logo-instagram" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("https://twitter.com")}>
          <Ionicons name="logo-twitter" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>VERSION 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 15,
  } as ViewStyle,
  contentContainer: {
    padding: 20,
    paddingBottom: 55,
  } as ViewStyle,
  section: {
    marginBottom: 30,
    paddingBottom: 20,
    paddingHorizontal: 5,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  } as ViewStyle,
  sectionTitle: {
    color: colors.primary,
    fontSize: fontSize.base,
    fontFamily: "Nunito-Black",
    marginBottom: 15,
  } as TextStyle,
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.secondaryBackground,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
  } as ViewStyle,
  premiumOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    color: colors.background,
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  } as ViewStyle,
  optionText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Regular",
  } as TextStyle,
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -10,
    marginBottom: 20,
    paddingHorizontal: 110,
  } as ViewStyle,
  versionText: {
    color: colors.primary,
    fontSize: fontSize.xs,
    textAlign: "center",
    fontFamily: "Nunito-Regular",
    marginTop: 20,
  },
  premiumHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "flex-start",
  } as ViewStyle,
  logoContainer: {
    marginRight: 6,
  } as ViewStyle,
  premiumTitleContainer: {
    flexDirection: "column",
    padding: 0,
    marginBottom: 10,
    marginTop: 10,
  } as ViewStyle,
  logoImage: {
    width: 40,
    height: 40,
  } as ImageStyle,
  premiumTitle: {
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
  gradientBackground: {
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  } as ViewStyle,
});

export default SettingsScreen;
