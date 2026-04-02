import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TaskType } from '../types';
import { useShoppingListsContext } from '../context/ShoppingListsContext';
import { Button, TextInput, Card } from '../components';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../styles/theme';
import { formatPrice, parsePriceInput } from '../utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateTask'>;

export const CreateTaskScreen: React.FC<Props> = ({ route, navigation }) => {
  const { listId } = route.params;
  const { addTask } = useShoppingListsContext();

  const [taskType, setTaskType] = useState<TaskType>('simple');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const handleCreateTask = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a task title');
      return;
    }

    let priceNumber: number | undefined;
    if (taskType === 'purchase') {
      if (!price.trim()) {
        Alert.alert('Validation', 'Please enter a price');
        return;
      }
      const parsed = parsePriceInput(price);
      if (parsed === null) {
        Alert.alert('Validation', 'Please enter a valid price');
        return;
      }
      priceNumber = parsed;
    }

    addTask(listId, { title: title.trim(), type: taskType, price: priceNumber, completed: false });
    navigation.goBack();
  };

  const previewPrice = parsePriceInput(price);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView style={styles.flex} contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Add Task</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Task Type</Text>
            <View style={styles.typeContainer}>
              {(['simple', 'purchase'] as TaskType[]).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeButton, taskType === type && styles.typeButtonActive]}
                  onPress={() => setTaskType(type)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: taskType === type }}
                >
                  <Text style={styles.typeButtonIcon}>{type === 'simple' ? '📝' : '🛒'}</Text>
                  <Text style={styles.typeButtonLabel}>
                    {type === 'simple' ? 'Simple Task' : 'Purchase'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <TextInput
              label="Task Title"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task name..."
              maxLength={50}
              autoCapitalize="sentences"
            />

            {taskType === 'purchase' && (
              <View style={styles.priceInputContainer}>
                <TextInput
                  label="Price"
                  value={price}
                  onChangeText={setPrice}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  maxLength={10}
                  autoCapitalize="none"
                />
              </View>
            )}
          </View>

          {title.trim().length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preview</Text>
              <Card>
                <View style={styles.previewContainer}>
                  <View style={styles.checkbox}>
                    <Text style={styles.checkboxPlus}>+</Text>
                  </View>
                  <View style={styles.previewContent}>
                    <Text style={styles.previewTitle}>{title}</Text>
                    {taskType === 'purchase' && previewPrice !== null && (
                      <Text style={styles.previewPrice}>{formatPrice(previewPrice)}</Text>
                    )}
                  </View>
                </View>
              </Card>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Cancel"
            variant="secondary"
            onPress={() => navigation.goBack()}
            style={styles.footerButton}
          />
          <Button
            title="Create Task"
            onPress={handleCreateTask}
            style={styles.footerButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  title: {
    color: COLORS.white,
    ...TYPOGRAPHY.h3,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    color: COLORS.grayLight,
    ...TYPOGRAPHY.bodySmall,
    marginBottom: SPACING.md,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  typeContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  typeButton: {
    flex: 1,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surfaceBg,
    borderWidth: 2,
    borderColor: COLORS.darkLight,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  typeButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.cardBg,
  },
  typeButtonIcon: {
    fontSize: 28,
  },
  typeButtonLabel: {
    color: COLORS.white,
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '500',
  },
  priceInputContainer: {
    marginTop: SPACING.lg,
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxPlus: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  previewContent: {
    flex: 1,
  },
  previewTitle: {
    color: COLORS.white,
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
  previewPrice: {
    color: COLORS.primary,
    ...TYPOGRAPHY.bodySmall,
    marginTop: SPACING.xs,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  footerButton: {
    flex: 1,
  },
});
