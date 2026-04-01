/**
 * EditTaskScreen - Edit an existing task
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useShoppingLists } from '../hooks/useShoppingLists';
import { Button, TextInput, Card } from '../components';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'EditTask'>;

export const EditTaskScreen: React.FC<Props> = ({ route, navigation }) => {
  const { listId, taskId } = route.params;
  const { lists, updateTask, deleteTask } = useShoppingLists();

  const task = useMemo(() => {
    const list = lists.find((l) => l.id === listId);
    return list?.tasks.find((t) => t.id === taskId);
  }, [lists, listId, taskId]);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      if (task.type === 'purchase' && task.price) {
        setPrice(task.price.toString());
      }
    }
  }, [task]);

  const handleSaveTask = () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    if (task?.type === 'purchase' && !price.trim()) {
      alert('Please enter a price');
      return;
    }

    let priceNumber: number | undefined;
    if (task?.type === 'purchase') {
      const parsed = parseFloat(price.replace(/[^0-9.-]/g, ''));
      if (isNaN(parsed) || parsed < 0) {
        alert('Please enter a valid price');
        return;
      }
      priceNumber = parsed;
    }

    updateTask(listId, taskId, {
      title: title.trim(),
      price: priceNumber,
    });

    navigation.goBack();
  };

  const handleDeleteTask = () => {
    const deleteAlert = () => {
      deleteTask(listId, taskId);
      navigation.goBack();
    };

    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: deleteAlert,
          style: 'destructive',
        },
      ]
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Task not found</Text>
        </View>
      </SafeAreaView>
    );
  }

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
            <Text style={styles.title}>Edit Task</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Task type info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Task Type</Text>
            <Card>
              <View style={styles.typeInfo}>
                <Text style={styles.typeIcon}>
                  {task.type === 'purchase' ? '🛒' : '📝'}
                </Text>
                <Text style={styles.typeLabel}>
                  {task.type === 'purchase' ? 'Purchase Task' : 'Simple Task'}
                </Text>
              </View>
            </Card>
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

            {task.type === 'purchase' && (
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
                  <View
                    style={[
                      styles.checkbox,
                      task.completed && styles.checkboxCompleted,
                    ]}
                  >
                    {task.completed && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <View style={styles.previewContent}>
                    <Text
                      style={[
                        styles.previewTitle,
                        task.completed && styles.completedText,
                      ]}
                    >
                      {title}
                    </Text>
                    {task.type === 'purchase' && price && (
                      <Text
                        style={[
                          styles.previewPrice,
                          task.completed && styles.completedText,
                        ]}
                      >
                        ${parseFloat(price).toFixed(2)}
                      </Text>
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
            title="Delete"
            variant="danger"
            onPress={handleDeleteTask}
            style={styles.deleteButton}
          />
          <View style={styles.actionButtons}>
            <Button
              title="Cancel"
              variant="secondary"
              onPress={handleGoBack}
              style={styles.cancelButton}
            />
            <Button
              title="Save"
              onPress={handleSaveTask}
              style={styles.saveButton}
            />
          </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    ...TYPOGRAPHY.body,
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
  typeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  typeIcon: {
    fontSize: 28,
  },
  typeLabel: {
    color: COLORS.white,
    ...TYPOGRAPHY.body,
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
  checkboxCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkmark: {
    color: COLORS.white,
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
  completedText: {
    textDecorationLine: 'line-through',
    color: COLORS.gray,
  },
  previewPrice: {
    color: COLORS.primary,
    ...TYPOGRAPHY.bodySmall,
    marginTop: SPACING.xs,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    paddingBottom: SPACING.lg,
    gap: SPACING.md,
  },
  deleteButton: {
    width: '100%',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
});
