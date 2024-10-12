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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, fontSize } from "@/constants/tokens";

const SettingsScreen = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.6}
        >
          <Text style={styles.optionText}>Delete Account</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.6}
        >
          <Text style={styles.optionText}>Unsubscribe Account</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.6}
        >
          <Text style={styles.optionText}>Notification Settings</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Legal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>

        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.6}
        >
          <Text style={styles.optionText}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.6}
        >
          <Text style={styles.optionText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.6}
        >
          <Text style={styles.optionText}>Cookie Policy</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* App Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>

        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.6}
        >
          <Text style={styles.optionText}>About the App</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.6}
        >
          <Text style={styles.optionText}>Support & FAQ</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Social Media Links */}
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => openLink("https://facebook.com")}>
          <Ionicons name="logo-facebook" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("https://twitter.com")}>
          <Ionicons name="logo-twitter" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("https://instagram.com")}>
          <Ionicons name="logo-instagram" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("https://linkedin.com")}>
          <Ionicons name="logo-linkedin" size={24} color={colors.primary} />
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
    paddingHorizontal: 80,
  } as ViewStyle,
  versionText: {
    color: colors.primary,
    fontSize: fontSize.xs,
    textAlign: "center",
    fontFamily: "Nunito-Regular",
    marginTop: 20,
  },
});

export default SettingsScreen;