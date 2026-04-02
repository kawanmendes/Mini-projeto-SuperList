import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ShoppingListsProvider } from './src/context/ShoppingListsContext';
import { COLORS } from './src/styles/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <ShoppingListsProvider>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.dark} />
        <RootNavigator />
      </ShoppingListsProvider>
    </SafeAreaProvider>
  );
}
