import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export class AuthError extends Error {
  constructor(message: string = "User not authenticated") {
    super(message);
    this.name = "AuthError";
  }
}

export async function verifyAuth() {
  const userId = await SecureStore.getItemAsync("userId");
  const token = await SecureStore.getItemAsync("token");

  if (!userId || !token) {
    throw new AuthError();
  }

  return { userId, token };
}

export function handleAuthError(error: unknown) {
  if (error instanceof AuthError) {
    Alert.alert("Error", error.message);
  } else {
    console.error(error);
    Alert.alert("Error", "An unexpected error occurred");
  }
}
