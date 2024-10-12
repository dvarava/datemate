import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fontSize } from "@/constants/tokens";

interface HeaderWithBackProps {
  title: string;
}

const HeaderWithBack: React.FC<HeaderWithBackProps> = ({ title }) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.appName}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HeaderWithBack;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.secondaryBackground,
  } as ViewStyle,
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16.5,
    paddingHorizontal: 25,
  } as ViewStyle,
  backButton: {
    position: "absolute",
    left: 25,
  } as ViewStyle,
  settingsButton: {
    position: "absolute",
    right: 25,
  } as ViewStyle,
  appName: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Black",
  } as TextStyle,
});
