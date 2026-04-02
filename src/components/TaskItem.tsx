import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Task } from '../types';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../styles/theme';
import { formatPrice } from '../utils/helpers';
import { Card } from './Card';

interface TaskItemProps {
  task: Task;
  onToggleComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: onDelete, style: 'destructive' },
    ]);
  };

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={onToggleComplete}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: task.completed }}
          accessibilityLabel={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        >
          <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
            {task.completed && <Text style={styles.checkMark}>✓</Text>}
          </View>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text
            style={[styles.title, task.completed && styles.completedTitle]}
            numberOfLines={2}
          >
            {task.title}
          </Text>

          {task.type === 'purchase' && task.price !== undefined && (
            <Text style={[styles.price, task.completed && styles.completedPrice]}>
              {formatPrice(task.price)}
            </Text>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={onEdit}
            accessibilityRole="button"
            accessibilityLabel="Edit task"
          >
            <Text style={styles.actionButtonText}>✏️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
            accessibilityRole="button"
            accessibilityLabel="Delete task"
          >
            <Text style={styles.actionButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  checkboxContainer: {
    padding: SPACING.sm,
    marginLeft: -SPACING.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceBg,
  },
  checkboxCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkMark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    color: COLORS.white,
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: COLORS.gray,
  },
  price: {
    color: COLORS.primary,
    ...TYPOGRAPHY.bodySmall,
    marginTop: SPACING.xs,
    fontWeight: '600',
  },
  completedPrice: {
    color: COLORS.gray,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: COLORS.primaryDark,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
  },
  actionButtonText: {
    fontSize: 12,
  },
});
