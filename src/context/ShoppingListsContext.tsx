import React, { createContext, useContext } from 'react';
import { useShoppingLists } from '../hooks/useShoppingLists';

type ShoppingListsContextValue = ReturnType<typeof useShoppingLists>;

const ShoppingListsContext = createContext<ShoppingListsContextValue | null>(null);

export const ShoppingListsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ShoppingListsContext.Provider value={useShoppingLists()}>
    {children}
  </ShoppingListsContext.Provider>
);

export const useShoppingListsContext = (): ShoppingListsContextValue => {
  const ctx = useContext(ShoppingListsContext);
  if (!ctx) throw new Error('useShoppingListsContext must be used within ShoppingListsProvider');
  return ctx;
};
