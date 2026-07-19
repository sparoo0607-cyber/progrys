import { create } from "zustand";
import type { AffiliateProduct } from "@/lib/data/affiliates";

interface AffiliateStore {
  products: AffiliateProduct[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<AffiliateProduct, "id" | "updatedAt" | "rating" | "reviewCount">) => Promise<void>;
  updateProduct: (id: string, product: Partial<AffiliateProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useAffiliateStore = create<AffiliateStore>((set, get) => ({
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/affiliates");
      if (res.ok) {
        const data = await res.json();
        set({ products: data });
      }
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (newProduct) => {
    try {
      const res = await fetch("/api/affiliates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        const data = await res.json();
        set((state) => ({ products: [data.product, ...state.products] }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  updateProduct: async (id, updatedFields) => {
    try {
      const res = await fetch(`/api/affiliates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) {
        const data = await res.json();
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? data.product : p)),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/affiliates/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  },
}));
