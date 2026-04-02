import * as Crypto from 'expo-crypto';
import { Task } from '../types';

export const generateUUID = (): string => Crypto.randomUUID();

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const calculateTotal = (prices: number[]): number =>
  prices.reduce((sum, price) => sum + price, 0);

export const formatDate = (timestamp: number): string =>
  new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export const countCompletedTasks = (tasks: Array<{ completed: boolean }>): number =>
  tasks.filter((task) => task.completed).length;

export const parsePriceInput = (raw: string): number | null => {
  const parsed = parseFloat(raw.replace(/[^0-9.]/g, ''));
  if (isNaN(parsed) || parsed < 0) return null;
  return parsed;
};

export const calculateRemainingTotal = (tasks: Task[]): number =>
  calculateTotal(
    tasks
      .filter((t) => t.type === 'purchase' && !t.completed && t.price !== undefined)
      .map((t) => t.price!)
  );
