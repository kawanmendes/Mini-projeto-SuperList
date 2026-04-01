/**
 * FloatingActionButton (FAB) component
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS } from '../styles/theme';

interface FABProps {
  onPress: () => void;
  icon?: string;
  style?: ViewStyle;
}

export const FAB: React.FC<FABProps> = ({
  onPress,
  icon = '+',
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.fab, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{icon}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
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
