import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Alert,
  Share,
} from "react-native";
import { colors, fontSize } from "@/constants/tokens";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

const InviteScreen = () => {
  const inviteLink = "https://datemate.ai/invite";
  const [linkCopied, setLinkCopied] = useState(false);

  const handleShareInvite = async () => {
    try {
      const result = await Share.share({
        message: `Check out DateMate AI! Here's the invite link: ${inviteLink}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while sharing the invite.");
    }
  };

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(inviteLink);
    setLinkCopied(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>
        Share DateMate AI{"\n"}with your friends!
      </Text>
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        start={{ x: 0.6, y: 0 }}
        end={{ x: 1.4, y: 1 }}
        style={styles.shareButtonContainer}
      >
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShareInvite}
        >
          <Text style={styles.shareButtonText}>SHARE INVITE</Text>
        </TouchableOpacity>
      </LinearGradient>
      <TouchableOpacity
        style={styles.subTextContainer}
        onPress={handleCopyLink}
      >
        <Ionicons
          name={linkCopied ? "checkmark-outline" : "copy-outline"}
          size={18}
          color={linkCopied ? colors.primary : "#aaa"}
        />
        <Text style={styles.subText}>
          {linkCopied ? "Link copied!" : "Copy the link"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingBottom: 50,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
  } as ImageStyle,
  headerText: {
    color: colors.primary,
    fontSize: fontSize.lg,
    textAlign: "center",
    fontFamily: "Nunito-Black",
    marginBottom: 20,
  } as TextStyle,
  shareButtonContainer: {
    width: "70%",
    borderRadius: 25,
    overflow: "hidden",
  } as ViewStyle,
  shareButton: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  shareButtonText: {
    color: colors.primary,
    fontSize: fontSize.base,
    fontFamily: "Nunito-Black",
  } as TextStyle,
  subTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 5,
  } as ViewStyle,
  subText: {
    color: "#aaa",
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Regular",
  } as TextStyle,
});

export default InviteScreen;
