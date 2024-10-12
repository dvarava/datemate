import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fontSize } from "@/constants/tokens";

interface HeaderWithCloseProps {
  title: string;
}

const HeaderWithClose: React.FC<HeaderWithCloseProps> = ({ title }) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.appName}>{title}</Text>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HeaderWithClose;

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
  closeButton: {
    position: "absolute",
    right: 25,
  } as ViewStyle,
  appName: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Black",
  } as TextStyle,
});