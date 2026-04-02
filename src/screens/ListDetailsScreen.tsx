import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Task } from '../types';
import { useShoppingListsContext } from '../context/ShoppingListsContext';
import { TaskItem, FAB, EmptyState, Card } from '../components';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../styles/theme';
import { countCompletedTasks, formatPrice, calculateRemainingTotal } from '../utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'ListDetails'>;

export const ListDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { listId } = route.params;
  const { lists, deleteTask, toggleTaskComplete } = useShoppingListsContext();

  const list = useMemo(() => lists.find((l) => l.id === listId), [lists, listId]);
  const completedCount = useMemo(() => countCompletedTasks(list?.tasks ?? []), [list]);
  const remainingTotal = useMemo(() => calculateRemainingTotal(list?.tasks ?? []), [list]);

  if (!list) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>List not found</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backFallback}>
            <Text style={styles.backFallbackText}>← Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderTaskItem = ({ item }: ListRenderItemInfo<Task>) => (
    <TaskItem
      task={item}
      onToggleComplete={() => toggleTaskComplete(listId, item.id)}
      onEdit={() => navigation.navigate('EditTask', { listId, taskId: item.id })}
      onDelete={() => deleteTask(listId, item.id)}
    />
  );

  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text
            style={[styles.listTitle, list.completed && styles.completedTitle]}
            numberOfLines={2}
          >
            {list.title}
          </Text>
          <Text style={styles.taskProgress}>
            {completedCount} of {list.tasks.length} completed
          </Text>
        </View>
      </View>

      {list.tasks.length > 0 && (
        <Card style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>{list.tasks.length}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Done</Text>
              <Text style={styles.summaryValue}>{completedCount}</Text>
            </View>
            {remainingTotal > 0 && (
              <>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Remaining</Text>
                  <Text style={[styles.summaryValue, styles.priceValue]}>
                    {formatPrice(remainingTotal)}
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
        <View style={styles.flex}>
          {renderHeader()}
          <EmptyState
            icon="✓"
            title="No Tasks Yet"
            description="Add your first task by tapping the + button below"
          />
        </View>
      ) : (
        <FlatList<Task>
          data={list.tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
        />
      )}

      <FAB
        onPress={() => navigation.navigate('CreateTask', { listId })}
        icon="+"
        accessibilityLabel="Add task"
      />
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
  },
  errorText: {
    color: COLORS.error,
    ...TYPOGRAPHY.body,
  },
  backFallback: {
    padding: SPACING.md,
  },
  backFallbackText: {
    color: COLORS.primary,
    ...TYPOGRAPHY.body,
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
