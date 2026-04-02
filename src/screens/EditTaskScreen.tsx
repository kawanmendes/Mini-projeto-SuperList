import React, { useState, useMemo } from 'react';
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
import { RootStackParamList } from '../types';
import { useShoppingListsContext } from '../context/ShoppingListsContext';
import { Button, TextInput, Card } from '../components';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../styles/theme';
import { formatPrice, parsePriceInput } from '../utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'EditTask'>;

export const EditTaskScreen: React.FC<Props> = ({ route, navigation }) => {
  const { listId, taskId } = route.params;
  const { lists, updateTask, deleteTask } = useShoppingListsContext();

  const task = useMemo(() => {
    const list = lists.find((l) => l.id === listId);
    return list?.tasks.find((t) => t.id === taskId);
  }, [lists, listId, taskId]);

  // Lazy initializers — run once on mount, never reset by external state changes
  const [title, setTitle] = useState(() => task?.title ?? '');
  const [price, setPrice] = useState(() =>
    task?.type === 'purchase' && task.price !== undefined ? task.price.toString() : ''
  );

  const handleSaveTask = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a task title');
      return;
    }

    let priceNumber: number | undefined;
    if (task?.type === 'purchase') {
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

    updateTask(listId, taskId, { title: title.trim(), price: priceNumber });
    navigation.goBack();
  };

  const handleDeleteTask = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTask(listId, taskId);
          navigation.goBack();
        },
      },
    ]);
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Task not found</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backFallback}>
            <Text style={styles.backFallbackText}>← Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
            <Text style={styles.title}>Edit Task</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Task Type</Text>
            <Card>
              <View style={styles.typeInfo}>
                <Text style={styles.typeIcon}>{task.type === 'purchase' ? '🛒' : '📝'}</Text>
                <Text style={styles.typeLabel}>
                  {task.type === 'purchase' ? 'Purchase Task' : 'Simple Task'}
                </Text>
              </View>
            </Card>
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

            {task.type === 'purchase' && (
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
                  <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
                    {task.completed && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <View style={styles.previewContent}>
                    <Text style={[styles.previewTitle, task.completed && styles.completedText]}>
                      {title}
                    </Text>
                    {task.type === 'purchase' && previewPrice !== null && (
                      <Text style={[styles.previewPrice, task.completed && styles.completedText]}>
                        {formatPrice(previewPrice)}
                      </Text>
                    )}
                  </View>
                </View>
              </Card>
            </View>
          )}
        </ScrollView>

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
              onPress={() => navigation.goBack()}
              style={styles.footerButton}
            />
            <Button title="Save" onPress={handleSaveTask} style={styles.footerButton} />
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
  footerButton: {
    flex: 1,
  },
});
