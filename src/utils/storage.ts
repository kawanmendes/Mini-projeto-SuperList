import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList } from '../types';

const STORAGE_KEY = '@superlist_lists';

export const StorageService = {
  saveLists: async (lists: ShoppingList[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    } catch (error) {
      console.error('Error saving lists:', error);
      throw error;
    }
  },

  loadLists: async (): Promise<ShoppingList[]> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as ShoppingList[]) : [];
    } catch (error) {
      console.error('Error loading lists:', error);
      throw error;
    }
  },

  clearAllData: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  },
};
