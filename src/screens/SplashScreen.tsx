/**
 * SplashScreen - Initial screen with logo and intro
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const handleContinue = () => {
    navigation.replace('Home');
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handleContinue}
    >
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={[COLORS.dark, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <View
        style={[
          styles.inner,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.logo}>📋</Text>
            <Text style={styles.appName}>SuperList</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.subtitleContainer,
              { opacity: fadeAnim },
            ]}
          >
            <Text style={styles.subtitle}>
              Your smart shopping companion
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={[styles.tapContainer, { opacity: fadeAnim }]}>
          <Text style={styles.tapText}>Tap anywhere to continue</Text>
          <Text style={styles.arrow}>↓</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logo: {
    fontSize: 80,
    marginBottom: SPACING.md,
  },
  appName: {
    color: COLORS.white,
    ...TYPOGRAPHY.h1,
    fontWeight: '700',
    letterSpacing: 1,
  },
  subtitleContainer: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  subtitle: {
    color: COLORS.gray,
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    opacity: 0.8,
  },
  tapContainer: {
    alignItems: 'center',
    paddingBottom: SPACING.xxl,
  },
  tapText: {
    color: COLORS.white,
    ...TYPOGRAPHY.bodySmall,
    opacity: 0.45,
    marginBottom: SPACING.sm,
  },
  arrow: {
    color: COLORS.primary,
    fontSize: 16,
  },
});