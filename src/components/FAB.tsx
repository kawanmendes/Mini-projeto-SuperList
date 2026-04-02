import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, BORDER_RADIUS, SHADOWS } from '../styles/theme';

interface FABProps {
  onPress: () => void;
  icon?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export const FAB: React.FC<FABProps> = ({
  onPress,
  icon = '+',
  accessibilityLabel = 'Add',
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={[styles.fab, { bottom: Math.max(24, insets.bottom + 16) }, style]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Text style={styles.icon}>{icon}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  icon: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
