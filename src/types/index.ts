/**
 * Type definitions for SuperList app
 */

export type TaskType = 'simple' | 'purchase';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  price?: number; // Only for purchase tasks
  completed: boolean;
  createdAt: number;
}

export interface ShoppingList {
  id: string;
  title: string;
  tasks: Task[];
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface AppContextType {
  lists: ShoppingList[];
  addList: (title: string) => void;
  deleteList: (id: string) => void;
  updateList: (id: string, title: string) => void;
  toggleListComplete: (id: string) => void;
  addTask: (listId: string, task: Omit<Task, 'id' | 'createdAt'>) => void;
  deleteTask: (listId: string, taskId: string) => void;
  updateTask: (listId: string, taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  toggleTaskComplete: (listId: string, taskId: string) => void;
}

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  ListDetails: { listId: string };
  CreateTask: { listId: string };
  EditTask: { listId: string; taskId: string };
};
