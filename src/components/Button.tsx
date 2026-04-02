import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../styles/theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const VARIANT_STYLES: Record<NonNullable<ButtonProps['variant']>, object> = {
  primary:   { backgroundColor: COLORS.primary },
  secondary: { backgroundColor: COLORS.surfaceBg, borderWidth: 1, borderColor: COLORS.primary },
  danger:    { backgroundColor: COLORS.error },
  success:   { backgroundColor: COLORS.success },
};

const SIZE_STYLES: Record<NonNullable<ButtonProps['size']>, object> = {
  small:  { paddingVertical: SPACING.sm,  paddingHorizontal: SPACING.md, minHeight: 36 },
  medium: { paddingVertical: SPACING.md,  paddingHorizontal: SPACING.lg, minHeight: 44 },
  large:  { paddingVertical: SPACING.lg,  paddingHorizontal: SPACING.xl, minHeight: 48 },
};

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}) => (
  <TouchableOpacity
    onPress={disabled ? undefined : onPress}
    disabled={disabled}
    activeOpacity={0.8}
    accessibilityRole="button"
    accessibilityLabel={title}
    accessibilityState={{ disabled }}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    style={[styles.button, VARIANT_STYLES[variant], SIZE_STYLES[size], disabled && styles.disabled, style]}
  >
    <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  text: {
    color: COLORS.white,
    ...TYPOGRAPHY.h4,
  },
  secondaryText: {
    color: COLORS.primary,
  },
  disabled: {
    opacity: 0.5,
  },
});
