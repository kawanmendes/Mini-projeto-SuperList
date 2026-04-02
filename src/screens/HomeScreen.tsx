import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, ShoppingList } from '../types';
import { useShoppingListsContext } from '../context/ShoppingListsContext';
import { Button, ListCard, FAB, EmptyState } from '../components';
import { TextInput } from '../components/TextInput';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { lists, isLoading, loadError, addList, deleteList, updateList, toggleListComplete } =
    useShoppingListsContext();

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

  const renderListCard = ({ item }: ListRenderItemInfo<ShoppingList>) => (
    <ListCard
      list={item}
      onPress={(id) => navigation.navigate('ListDetails', { listId: id })}
      onEdit={(id) => handleEditList(id, item.title)}
      onDelete={deleteList}
      onToggleComplete={toggleListComplete}
    />
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (loadError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{loadError}</Text>
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
        <View style={styles.header}>
          <Text style={styles.title}>SuperList</Text>
          <Text style={styles.subtitle}>
            {lists.length} {lists.length === 1 ? 'list' : 'lists'}
          </Text>
        </View>

        {editingId && (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Editing list title:</Text>
            <TextInput
              value={editingTitle}
              onChangeText={setEditingTitle}
              placeholder="Enter new title..."
              onSubmitEditing={handleSaveEdit}
            />
            <View style={styles.formActions}>
              <Button
                title="Cancel"
                variant="secondary"
                size="small"
                onPress={() => { setEditingId(null); setEditingTitle(''); }}
              />
              <Button title="Save" size="small" onPress={handleSaveEdit} />
            </View>
          </View>
        )}

        {showNewListForm && !editingId && (
          <View style={styles.formContainer}>
            <TextInput
              value={newListTitle}
              onChangeText={setNewListTitle}
              placeholder="Enter list name..."
              label="New List"
              maxLength={50}
              onSubmitEditing={handleAddList}
            />
            <View style={styles.formActions}>
              <Button
                title="Cancel"
                variant="secondary"
                size="small"
                onPress={() => { setShowNewListForm(false); setNewListTitle(''); }}
              />
              <Button title="Create" size="small" onPress={handleAddList} />
            </View>
          </View>
        )}

        {lists.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No Lists Yet"
            description="Create your first shopping list by tapping the + button below"
          />
        ) : (
          <FlatList<ShoppingList>
            data={lists}
            renderItem={renderListCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
      </KeyboardAvoidingView>

      {!showNewListForm && !editingId && (
        <FAB
          onPress={() => setShowNewListForm(true)}
          icon="+"
          accessibilityLabel="Create new list"
        />
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.gray,
    ...TYPOGRAPHY.body,
  },
  errorText: {
    color: COLORS.error,
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
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
  },
  subtitle: {
    color: COLORS.gray,
    ...TYPOGRAPHY.bodySmall,
    marginTop: SPACING.xs,
  },
  formContainer: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  formLabel: {
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
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
});
