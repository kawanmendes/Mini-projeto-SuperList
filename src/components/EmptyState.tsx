/**
 * EmptyState component - displays empty state UI
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../styles/theme';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  icon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  title: {
    color: COLORS.white,
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  description: {
    color: COLORS.gray,
    ...TYPOGRAPHY.body,
    textAlign: 'center',
  },
});
