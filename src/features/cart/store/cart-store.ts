'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            const newQty = Math.min(existing.quantity + quantity, item.stock);
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: newQty } : i,
              ),
            };
          }
          const qty = Math.min(quantity, item.stock);
          return {
            items: [...state.items, { ...item, quantity: qty }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? { ...i, quantity: Math.min(quantity, i.stock) }
              : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getItemQuantity: (id) => {
        return get().items.find((i) => i.id === id)?.quantity || 0;
      },
    }),
    {
      name: 'shopcraft-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
