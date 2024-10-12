import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  Text,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from "react-native-svg";
import { colors, fontSize } from "@/constants/tokens";
import { Href, Tabs, useRouter } from "expo-router";

const TabsNavigation: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const cardAnim = useState(new Animated.Value(0))[0];
  const router = useRouter();
  const navigateBlocked = useRef(false);

  const toggleModal = () => {
    if (!modalVisible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 130,
          useNativeDriver: true,
        }),
        Animated.timing(cardAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 130,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
  };

  const handleNavigate = (path: string) => {
    if (!navigateBlocked.current) {
      navigateBlocked.current = true;

      router.push(path as Href);

      setTimeout(() => {
        navigateBlocked.current = false;
      }, 1000);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.secondaryBackground }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.secondary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
          },
          tabBarStyle: {
            backgroundColor: colors.secondaryBackground,
            borderTopWidth: 0,
            width: "74%",
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="partners"
          options={{
            title: "Partners",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favourites"
          options={{
            title: "Favourites",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      <View style={styles.heartButtonContainer}>
        <TouchableOpacity onPress={toggleModal}>
          <Svg width={70} height={70} viewBox="0 0 32 29.6">
            <Defs>
              <SvgLinearGradient id="grad" x1="0.6" y1="0" x2="1.4" y2="1">
                <Stop offset="0" stopColor={colors.secondary} />
                <Stop offset="1" stopColor={colors.primary} />
              </SvgLinearGradient>
            </Defs>
            <Path
              d="
                    M16,28
                    C12,28,0,18,0,8
                    C0,3.6,3.6,0,8,0
                    C11,0,14,2,16,5
                    C18,2,21,0,24,0
                    C28.4,0,32,3.6,32,8
                    C32,18,20,28,16,28
                    Z
                "
              fill="url(#grad)"
            />
          </Svg>
          <Image
            source={require("assets/plus.png")}
            style={styles.addIcon}
          ></Image>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modalVisible} animationType="none">
        <TouchableOpacity
          style={styles.overlayTouchable}
          onPress={closeModal}
          activeOpacity={1}
        >
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
        </TouchableOpacity>
        <Animated.View style={[styles.modalContent, { opacity: cardAnim }]}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => {
              closeModal();
              handleNavigate("/navigation/add-partner");
            }}
          >
            <Ionicons
              name="person-add-outline"
              size={30}
              color={colors.secondary}
            />
            <View style={styles.cardText}>
              <Text style={[styles.tabCardTitle, styles.cardTitle]}>
                Add Partner
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => {
              closeModal();
              handleNavigate("/navigation/generate-date");
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={30}
              color={colors.secondary}
            />
            <View style={styles.cardText}>
              <Text style={[styles.tabCardTitle, styles.cardTitle]}>
                Generate Date
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  heartButtonContainer: {
    position: "absolute",
    bottom: 45,
    right: 35,
    width: 70,
    height: 70,
  },
  addIcon: {
    position: "absolute",
    top: "21%",
    left: "20%",
    width: 40,
    height: 40,
  },
  overlayTouchable: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "#000",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalContent: {
    position: "absolute",
    bottom: 140,
    left: 20,
    right: 20,
    gap: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.secondaryBackground,
  },
  tabCardTitle: {
    fontFamily: "Nunito-Bold",
  },
});

export default TabsNavigation;
