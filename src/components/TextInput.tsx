import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  ReturnKeyTypeOptions,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../styles/theme';

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad' | 'email-address';
  multiline?: boolean;
  maxLength?: number;
  autoCorrect?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  keyboardType = 'default',
  multiline = false,
  maxLength,
  autoCorrect = false,
  autoCapitalize = 'sentences',
  returnKeyType = 'done',
  onSubmitEditing,
  style,
}) => (
  <View style={[styles.container, style]}>
    {label && <Text style={styles.label}>{label}</Text>}
    <RNTextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.gray}
      keyboardType={keyboardType}
      multiline={multiline}
      maxLength={maxLength}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
      returnKeyType={multiline ? 'default' : returnKeyType}
      onSubmitEditing={onSubmitEditing}
      cursorColor={COLORS.primary}
      selectionColor={COLORS.primaryLight}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: COLORS.grayLight,
    ...TYPOGRAPHY.bodySmall,
    marginBottom: SPACING.sm,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.surfaceBg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    color: COLORS.white,
    ...TYPOGRAPHY.body,
  },
});
