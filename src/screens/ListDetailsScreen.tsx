/**
 * ListDetailsScreen - View and manage tasks in a specific list
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, ShoppingList } from '../types';
import { useShoppingLists } from '../hooks/useShoppingLists';
import { TaskItem, FAB, EmptyState, Button, Card } from '../components';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../styles/theme';
import { calculateTotal, countCompletedTasks, formatPrice } from '../utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'ListDetails'>;

export const ListDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { listId } = route.params;
  const {
    lists,
    deleteTask,
    updateTask,
    toggleTaskComplete,
  } = useShoppingLists();

  const list = useMemo(() => lists.find((l) => l.id === listId), [lists, listId]);

  const completedCount = useMemo(() => countCompletedTasks(list?.tasks || []), [list]);
  const totalPrice = useMemo(() => {
    const purchaseTasks = (list?.tasks || []).filter((t) => t.type === 'purchase' && !t.completed);
    return calculateTotal(purchaseTasks.map((t) => t.price || 0));
  }, [list]);

  if (!list) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>List not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleAddTask = () => {
    navigation.navigate('CreateTask', { listId });
  };

  const handleEditTask = (taskId: string) => {
    navigation.navigate('EditTask', { listId, taskId });
  };

  const renderTaskItem = ({ item }: { item: any }) => (
    <TaskItem
      task={item}
      onToggleComplete={() => toggleTaskComplete(listId, item.id)}
      onEdit={() => handleEditTask(item.id)}
      onDelete={() => deleteTask(listId, item.id)}
    />
  );

  const renderEmptyState = () => (
    <EmptyState
      icon="✓"
      title="No Tasks Yet"
      description="Add your first task by tapping the + button below"
    />
  );

  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleNavigateBack}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.listTitle,
              list.completed && styles.completedTitle,
            ]}
            numberOfLines={2}
          >
            {list.title}
          </Text>
          <Text style={styles.taskProgress}>
            {completedCount} of {list.tasks.length} completed
          </Text>
        </View>
      </View>

      {/* Summary card */}
      {list.tasks.length > 0 && (
        <Card style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Items</Text>
              <Text style={styles.summaryValue}>{list.tasks.length}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Completed</Text>
              <Text style={styles.summaryValue}>{completedCount}</Text>
            </View>
            {totalPrice > 0 && (
              <>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Total Price</Text>
                  <Text style={[styles.summaryValue, styles.priceValue]}>
                    {formatPrice(totalPrice)}
                  </Text>
                </View>
              </>
            )}
          </View>
        </Card>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {list.tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          {renderHeader()}
          <View style={styles.emptyStateContainer}>
            {renderEmptyState()}
          </View>
        </View>
      ) : (
        <FlatList
          data={list.tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}

      <FAB onPress={handleAddTask} icon="+" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
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
  emptyContainer: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkLight,
    gap: SPACING.md,
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
  titleContainer: {
    flex: 1,
  },
  listTitle: {
    color: COLORS.white,
    ...TYPOGRAPHY.h3,
    fontWeight: '600',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: COLORS.gray,
  },
  taskProgress: {
    color: COLORS.gray,
    ...TYPOGRAPHY.bodySmall,
    marginTop: SPACING.xs,
  },
  summaryCard: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    color: COLORS.gray,
    ...TYPOGRAPHY.bodySmall,
    marginBottom: SPACING.xs,
  },
  summaryValue: {
    color: COLORS.white,
    ...TYPOGRAPHY.h4,
    fontWeight: '600',
  },
  priceValue: {
    color: COLORS.primary,
  },
  summaryDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.darkLight,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
});
