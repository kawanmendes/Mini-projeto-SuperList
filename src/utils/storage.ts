/**
 * AsyncStorage utility for persisting app data
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList } from '../types';

const STORAGE_KEY = '@superlist_lists';

export const StorageService = {
  /**
   * Save all shopping lists to AsyncStorage
   */
  saveLists: async (lists: ShoppingList[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    } catch (error) {
      console.error('Error saving lists:', error);
      throw error;
    }
  },

  /**
   * Load all shopping lists from AsyncStorage
   */
  loadLists: async (): Promise<ShoppingList[]> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error('Error loading lists:', error);
      return [];
    }
  },

  /**
   * Clear all data (for debugging/testing)
   */
  clearAllData: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  },
};
