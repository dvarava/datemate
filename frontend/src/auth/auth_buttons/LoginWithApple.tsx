import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/constants/tokens';

const LoginWithApple = () => {
  const { setAuth } = useAuthStore();

  const signIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log('Credential:', credential);

      if (credential.identityToken) {
        const response = await fetch('http://localhost:3000/auth/apple', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: credential.identityToken }),
        });

        const data = await response.json();
        console.log('Response from backend:', data);

        if (data && data.user) {
          setAuth(data.user);
          await SecureStore.setItemAsync('authToken', credential.identityToken); 
        }
      } else {
        console.log('Error: identityToken is null');
      }
    } catch (error) {
      console.error('Error during Apple login:', error);
    }
  };

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <TouchableOpacity style={styles.customButton} onPress={signIn}>
      <Image source={require('assets/apple-logo.png')} style={styles.appleLogo} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 10,
  },
  appleLogo: {
    width: 20,
    height: 20,
  },
});

export default LoginWithApple;