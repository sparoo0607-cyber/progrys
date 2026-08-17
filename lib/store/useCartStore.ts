import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product) => {
        const existing = get().items.find((i) => i.product.id === product.id);
        if (!existing) {
          set({ items: [...get().items, { product, quantity: 1 }] });
        }
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.product.id !== productId) }),
      clearCart: () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),
      total: () =>
        get().items.reduce(
          (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
          0
        ),
      count: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "progrys-cart" }
  )
);
