/**
 * Custom hook for managing shopping lists state with AsyncStorage persistence
 */

import { useEffect, useState, useCallback } from 'react';
import { ShoppingList, Task } from '../types';
import { StorageService } from '../utils/storage';
import { generateUUID } from '../utils/helpers';

export const useShoppingLists = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load lists from storage on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const loadedLists = await StorageService.loadLists();
        setLists(loadedLists);
      } catch (error) {
        console.error('Failed to load lists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save lists to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      StorageService.saveLists(lists);
    }
  }, [lists, isLoading]);

  /**
   * Add a new shopping list
   */
  const addList = useCallback((title: string) => {
    const newList: ShoppingList = {
      id: generateUUID(),
      title,
      tasks: [],
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setLists((prev) => [newList, ...prev]);
  }, []);

  /**
   * Delete a shopping list
   */
  const deleteList = useCallback((id: string) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  }, []);

  /**
   * Update list title
   */
  const updateList = useCallback((id: string, title: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === id ? { ...list, title, updatedAt: Date.now() } : list
      )
    );
  }, []);

  /**
   * Toggle list completed status
   */
  const toggleListComplete = useCallback((id: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === id
          ? {
              ...list,
              completed: !list.completed,
              updatedAt: Date.now(),
            }
          : list
      )
    );
  }, []);

  /**
   * Add a task to a list
   */
  const addTask = useCallback((listId: string, task: Omit<Task, 'id' | 'createdAt'>) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                {
                  ...task,
                  id: generateUUID(),
                  createdAt: Date.now(),
                },
                ...list.tasks,
              ],
              updatedAt: Date.now(),
            }
          : list
      )
    );
  }, []);

  /**
   * Delete a task from a list
   */
  const deleteTask = useCallback((listId: string, taskId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
              updatedAt: Date.now(),
            }
          : list
      )
    );
  }, []);

  /**
   * Update a task in a list
   */
  const updateTask = useCallback(
    (listId: string, taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === taskId ? { ...task, ...updates } : task
                ),
                updatedAt: Date.now(),
              }
            : list
        )
      );
    },
    []
  );

  /**
   * Toggle task completed status
   */
  const toggleTaskComplete = useCallback((listId: string, taskId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
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
