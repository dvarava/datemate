// import 'react-native-url-polyfill/auto';
// import * as SecureStore from 'expo-secure-store';
// import { createClient } from '@supabase/supabase-js';

// const ExpoSecureStoreAdapter = {
//   getItem: (key: string) => {
//     return SecureStore.getItemAsync(key);
//   },
//   setItem: (key: string, value: string) => {
//     SecureStore.setItemAsync(key, value);
//   },
//   removeItem: (key: string) => {
//     SecureStore.deleteItemAsync(key);
//   },
// };

// const supabaseUrl = 'https://xitxnvdqkylfnppfgjti.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpdHhudmRxa3lsZm5wcGZnanRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTQ1NTUsImV4cCI6MjA1NDA5MDU1NX0.u0tPB5nc2uKNv2TWF8QhaN2qRAdj4esxLYiknLSllWo';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: ExpoSecureStoreAdapter as any,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });

import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const CHUNK_SIZE = 2000; // Slightly below 2048 to be safe
const supabaseUrl = 'https://xitxnvdqkylfnppfgjti.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpdHhudmRxa3lsZm5wcGZnanRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTQ1NTUsImV4cCI6MjA1NDA5MDU1NX0.u0tPB5nc2uKNv2TWF8QhaN2qRAdj4esxLYiknLSllWo';

const CustomSecureStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const numChunksStr = await SecureStore.getItemAsync(`${key}_chunks`);
      if (!numChunksStr) {
        return SecureStore.getItemAsync(key);
      }
      
      const numChunks = parseInt(numChunksStr);
      let value = '';
      
      for (let i = 0; i < numChunks; i++) {
        const chunk = await SecureStore.getItemAsync(`${key}_${i}`);
        value += chunk;
      }
      
      return value;
    } catch (error) {
      console.error('Error reading from SecureStore:', error);
      return null;
    }
  },
  
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (value.length < CHUNK_SIZE) {
        await SecureStore.setItemAsync(key, value);
        return;
      }

      const chunks = [];
      for (let i = 0; i < value.length; i += CHUNK_SIZE) {
        chunks.push(value.slice(i, i + CHUNK_SIZE));
      }
      
      await SecureStore.setItemAsync(`${key}_chunks`, chunks.length.toString());
      
      for (let i = 0; i < chunks.length; i++) {
        await SecureStore.setItemAsync(`${key}_${i}`, chunks[i]);
      }
    } catch (error) {
      console.error('Error writing to SecureStore:', error);
    }
  },
  
  removeItem: async (key: string): Promise<void> => {
    try {
      const numChunksStr = await SecureStore.getItemAsync(`${key}_chunks`);
      if (!numChunksStr) {
        await SecureStore.deleteItemAsync(key);
        return;
      }
      
      const numChunks = parseInt(numChunksStr);
      await SecureStore.deleteItemAsync(`${key}_chunks`);
      
      for (let i = 0; i < numChunks; i++) {
        await SecureStore.deleteItemAsync(`${key}_${i}`);
      }
    } catch (error) {
      console.error('Error removing from SecureStore:', error);
    }
  },
};

// Update your Supabase client initialization
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: CustomSecureStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});