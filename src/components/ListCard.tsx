/**
 * ListCard component - displays individual shopping list with actions
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { ShoppingList, AppContextType } from '../types';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../styles/theme';
import { countCompletedTasks } from '../utils/helpers';
import { Card } from './Card';

interface ListCardProps {
  list: ShoppingList;
  onPress: (listId: string) => void;
  onEdit: (listId: string) => void;
  onDelete: (listId: string) => void;
  onToggleComplete: (listId: string) => void;
}

export const ListCard: React.FC<ListCardProps> = ({
  list,
  onPress,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const completedTasks = countCompletedTasks(list.tasks);
  const totalTasks = list.tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleDelete = () => {
    const deleteAlert = () => onDelete(list.id);

    if (Platform.OS === 'ios') {
      Alert.alert('Delete List', 'Are you sure you want to delete this list?', [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Delete', onPress: deleteAlert, style: 'destructive' },
      ]);
    } else {
      Alert.alert('Delete List', 'Are you sure you want to delete this list?', [
        { text: 'Cancel', onPress: () => {} },
        { text: 'Delete', onPress: deleteAlert, style: 'destructive' },
      ]);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(list.id)}
      style={styles.touchable}
    >
      <Card variant="elevated">
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                list.completed && styles.completedTitle,
              ]}
              numberOfLines={2}
            >
              {list.title}
            </Text>
            <Text style={styles.taskCount}>
              {completedTasks}/{totalTasks} tasks
            </Text>
          </View>

          {list.completed && (
            <View style={styles.completeBadge}>
              <Text style={styles.completeBadgeText}>✓</Text>
            </View>
          )}
        </View>

        {/* Progress bar */}
        {totalTasks > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${progressPercentage}%`,
                    backgroundColor: list.completed ? COLORS.success : COLORS.primary,
                  },
                ]}
              />
            </View>
          </View>
        )}

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit(list.id)}
          >
            <Text style={styles.actionButtonText}>✏️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => onToggleComplete(list.id)}
          >
            <Text style={styles.actionButtonText}>
              {list.completed ? '↩️' : '✔'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={styles.actionButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  titleContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  title: {
    color: COLORS.white,
    ...TYPOGRAPHY.h4,
    fontWeight: '600',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: COLORS.gray,
  },
  taskCount: {
    color: COLORS.gray,
    ...TYPOGRAPHY.bodySmall,
    marginTop: SPACING.xs,
  },
  completeBadge: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeBadgeText: {
    fontSize: 16,
  },
  progressContainer: {
    marginBottom: SPACING.md,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: COLORS.darkLight,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: COLORS.primaryDark,
  },
  completeButton: {
    backgroundColor: COLORS.success,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
  },
  actionButtonText: {
    fontSize: 14,
  },
});
