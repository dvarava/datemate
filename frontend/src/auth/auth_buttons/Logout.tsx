import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import * as SecureStore from 'expo-secure-store';
import { colors } from '@/constants/tokens';

const LogoutButton = () => {
  const { clearAuth } = useAuthStore();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('authToken');
    
    clearAuth();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default LogoutButton;