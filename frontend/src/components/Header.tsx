import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fontSize } from "@/constants/tokens";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require("@/assets/logo.png")} style={styles.logo} />
          <Text style={styles.appName}>DateMate AI</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/navigation/settings")}>
          <Ionicons name="settings-sharp" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.secondaryBackground,
  } as ViewStyle,
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
  } as ViewStyle,
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  logo: {
    width: 35,
    height: 35,
    marginRight: 7,
    resizeMode: "contain",
  } as ImageStyle,
  appName: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Black",
  } as TextStyle,
});
