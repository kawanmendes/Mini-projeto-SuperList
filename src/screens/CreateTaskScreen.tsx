/**
 * CreateTaskScreen - Add a new task to a list
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useShoppingLists } from '../hooks/useShoppingLists';
import { Button, TextInput, Card } from '../components';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateTask'>;

type TaskType = 'simple' | 'purchase';

export const CreateTaskScreen: React.FC<Props> = ({ route, navigation }) => {
  const { listId } = route.params;
  const { addTask } = useShoppingLists();

  const [taskType, setTaskType] = useState<TaskType>('simple');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const handleCreateTask = () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    if (taskType === 'purchase' && !price.trim()) {
      alert('Please enter a price');
      return;
    }

    let priceNumber: number | undefined;
    if (taskType === 'purchase') {
      const parsed = parseFloat(price.replace(/[^0-9.-]/g, ''));
      if (isNaN(parsed) || parsed < 0) {
        alert('Please enter a valid price');
        return;
      }
      priceNumber = parsed;
    }

    addTask(listId, {
      title: title.trim(),
      type: taskType,
      price: priceNumber,
      completed: false,
    });

    navigation.goBack();
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView style={styles.flex} contentContainerStyle={styles.scroll}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleGoBack}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Add Task</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Task type selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Task Type</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  taskType === 'simple' && styles.typeButtonActive,
                ]}
                onPress={() => setTaskType('simple')}
              >
                <Text style={styles.typeButtonIcon}>📝</Text>
                <Text style={styles.typeButtonLabel}>Simple Task</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  taskType === 'purchase' && styles.typeButtonActive,
                ]}
                onPress={() => setTaskType('purchase')}
              >
                <Text style={styles.typeButtonIcon}>🛒</Text>
                <Text style={styles.typeButtonLabel}>Purchase</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Task details */}
          <View style={styles.section}>
            <TextInput
              label="Task Title"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task name..."
              maxLength={50}
            />

            {taskType === 'purchase' && (
              <View style={styles.priceInputContainer}>
                <TextInput
                  label="Price"
                  value={price}
                  onChangeText={setPrice}
                  placeholder="0.00"
                  keyboardType="numeric"
                  maxLength={10}
                />
                <Text style={styles.pricePrefix}>$</Text>
              </View>
            )}
          </View>

          {/* Preview */}
          {title && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preview</Text>
              <Card>
                <View style={styles.previewContainer}>
                  <View style={styles.checkbox}>
                    <Text style={styles.checkboxPlus}>+</Text>
                  </View>
                  <View style={styles.previewContent}>
                    <Text style={styles.previewTitle}>{title}</Text>
                    {taskType === 'purchase' && price && (
                      <Text style={styles.previewPrice}>${parseFloat(price).toFixed(2)}</Text>
                    )}
                  </View>
                </View>
              </Card>
            </View>
          )}
        </ScrollView>

        {/* Action buttons */}
        <View style={styles.footer}>
          <Button
            title="Cancel"
            variant="secondary"
            onPress={handleGoBack}
            style={styles.cancelButton}
          />
          <Button
            title="Create Task"
            onPress={handleCreateTask}
            style={styles.createButton}
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
    fontWeight: '600',
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
    position: 'relative',
  },
  pricePrefix: {
    position: 'absolute',
    right: SPACING.md,
    top: 40,
    color: COLORS.gray,
    ...TYPOGRAPHY.body,
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
  cancelButton: {
    flex: 1,
  },
  createButton: {
    flex: 1,
  },
});
