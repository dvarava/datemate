import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/constants/tokens';

const webClientId = '488836930557-abivotpv3q8t8iqkm07ai976jm5ahaph.apps.googleusercontent.com';
const iosClientId = '488836930557-d61hts76ruifk9722k8updijfkam2l7f.apps.googleusercontent.com';
const androidClientId = '488836930557-plah1vg3k9a525b8hs97tjlii783m2t0.apps.googleusercontent.com';

const LoginWithGoogle = () => {
  const { setAuth } = useAuthStore();
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId,
    iosClientId,
    androidClientId,
  });

  const getUserProfile = async (token: string) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      setAuth(user);
      await SecureStore.setItemAsync('authToken', token);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.idToken) {
      fetch('http://localhost:3000/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.authentication.idToken }),
      })
      .then(res => res.json())
      .then(async data => {
        if (data && data.user && response.authentication?.idToken) {
          setAuth(data.user);
          await SecureStore.setItemAsync('authToken', response.authentication.idToken);
        }
      })
      .catch(error => {
        console.error('Error during Google login:', error);
      });
    }
  }, [response]);

  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => promptAsync()}>
      <Image source={require('assets/google-logo.png')} style={styles.brand} />
      <Text style={styles.txt}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 10,
  },
  brand: {
    width: 20,
    height: 20,
  },
  txt: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});

export default LoginWithGoogle;