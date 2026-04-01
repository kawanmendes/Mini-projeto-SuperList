import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { COLORS } from './src/styles/theme';

/**
 * SuperList - Main App Component
 *
 * This is the root component of the application. It sets up:
 * - SafeAreaProvider for handling notches and safe areas
 * - StatusBar styling
 * - Navigation stack
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.dark} />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
