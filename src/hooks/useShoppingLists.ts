import { useEffect, useState, useCallback } from 'react';
import { ShoppingList, Task } from '../types';
import { StorageService } from '../utils/storage';
import { generateUUID } from '../utils/helpers';

export const useShoppingLists = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedLists = await StorageService.loadLists();
        setLists(loadedLists);
      } catch {
        setLoadError('Failed to load your lists. Please restart the app.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      StorageService.saveLists(lists).catch((err) =>
        console.error('Failed to persist lists:', err)
      );
    }
  }, [lists, isLoading]);

  const addList = useCallback((title: string) => {
    const now = Date.now();
    setLists((prev) => [
      { id: generateUUID(), title, tasks: [], completed: false, createdAt: now, updatedAt: now },
      ...prev,
    ]);
  }, []);

  const deleteList = useCallback((id: string) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  }, []);

  const updateList = useCallback((id: string, title: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === id ? { ...list, title, updatedAt: Date.now() } : list
      )
    );
  }, []);

  const toggleListComplete = useCallback((id: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === id
          ? { ...list, completed: !list.completed, updatedAt: Date.now() }
          : list
      )
    );
  }, []);

  const addTask = useCallback((listId: string, task: Omit<Task, 'id' | 'createdAt'>) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [{ ...task, id: generateUUID(), createdAt: Date.now() }, ...list.tasks],
              updatedAt: Date.now(),
            }
          : list
      )
    );
  }, []);

  const deleteTask = useCallback((listId: string, taskId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((t) => t.id !== taskId), updatedAt: Date.now() }
          : list
      )
    );
  }, []);

  const updateTask = useCallback(
    (listId: string, taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                tasks: list.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
                updatedAt: Date.now(),
              }
            : list
        )
      );
    },
    []
  );

  const toggleTaskComplete = useCallback((listId: string, taskId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
              ),
              updatedAt: Date.now(),
            }
          : list
      )
    );
  }, []);

  return {
    lists,
    isLoading,
    loadError,
    addList,
    deleteList,
    updateList,
    toggleListComplete,
    addTask,
    deleteTask,
    updateTask,
    toggleTaskComplete,
  };
};
