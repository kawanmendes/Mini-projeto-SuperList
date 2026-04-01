/**
 * HomeScreen - Main screen displaying all shopping lists
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useShoppingLists } from '../hooks/useShoppingLists';
import { Button, ListCard, FAB, EmptyState } from '../components';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../styles/theme';
import { TextInput } from '../components/TextInput';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const {
    lists,
    isLoading,
    addList,
    deleteList,
    updateList,
    toggleListComplete,
  } = useShoppingLists();

  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleAddList = () => {
    if (newListTitle.trim()) {
      addList(newListTitle.trim());
      setNewListTitle('');
      setShowNewListForm(false);
    }
  };

  const handleEditList = (listId: string, currentTitle: string) => {
    setEditingId(listId);
    setEditingTitle(currentTitle);
  };

  const handleSaveEdit = () => {
    if (editingTitle.trim() && editingId) {
      updateList(editingId, editingTitle.trim());
      setEditingId(null);
      setEditingTitle('');
    }
  };

  const handleNavigateToList = (listId: string) => {
    navigation.navigate('ListDetails', { listId });
  };

  const renderListCard = ({ item }: { item: any }) => (
    <ListCard
      list={item}
      onPress={handleNavigateToList}
      onEdit={(id) => handleEditList(id, item.title)}
      onDelete={deleteList}
      onToggleComplete={toggleListComplete}
    />
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderEmptyState = () => (
    <EmptyState
      icon="📋"
      title="No Lists Yet"
      description="Create your first shopping list by tapping the + button below"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.header}>
          <Text style={styles.title}>SuperList</Text>
          <Text style={styles.subtitle}>
            {lists.length} {lists.length === 1 ? 'list' : 'lists'}
          </Text>
        </View>

        {editingId && (
          <View style={styles.editContainer}>
            <Text style={styles.editLabel}>Editing list title:</Text>
            <TextInput
              value={editingTitle}
              onChangeText={setEditingTitle}
              placeholder="Enter new title..."
            />
            <View style={styles.editActions}>
              <Button
                title="Cancel"
                variant="secondary"
                size="small"
                onPress={() => {
                  setEditingId(null);
                  setEditingTitle('');
                }}
              />
              <Button
                title="Save"
                size="small"
                onPress={handleSaveEdit}
              />
            </View>
          </View>
        )}

        {showNewListForm && !editingId && (
          <View style={styles.newListContainer}>
            <TextInput
              value={newListTitle}
              onChangeText={setNewListTitle}
              placeholder="Enter list name..."
              label="New List"
              maxLength={50}
            />
            <View style={styles.formActions}>
              <Button
                title="Cancel"
                variant="secondary"
                size="small"
                onPress={() => {
                  setShowNewListForm(false);
                  setNewListTitle('');
                }}
              />
              <Button
                title="Create"
                size="small"
                onPress={handleAddList}
              />
            </View>
          </View>
        )}

        {lists.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={lists}
            renderItem={renderListCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            scrollEnabled={true}
          />
        )}
      </KeyboardAvoidingView>

      {!showNewListForm && !editingId && (
        <FAB onPress={() => setShowNewListForm(true)} icon="+" />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.gray,
    ...TYPOGRAPHY.body,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkLight,
  },
  title: {
    color: COLORS.white,
    ...TYPOGRAPHY.h2,
    fontWeight: '700',
  },
  subtitle: {
    color: COLORS.gray,
    ...TYPOGRAPHY.bodySmall,
    marginTop: SPACING.xs,
  },
  newListContainer: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  editContainer: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  editLabel: {
    color: COLORS.gray,
    ...TYPOGRAPHY.bodySmall,
    marginBottom: SPACING.sm,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
});
