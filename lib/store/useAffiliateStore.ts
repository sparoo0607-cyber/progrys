import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AffiliateProduct, MOCK_AFFILIATES } from "@/lib/data/affiliates";

interface AffiliateStore {
  products: AffiliateProduct[];
  addProduct: (product: Omit<AffiliateProduct, "id" | "updatedAt" | "rating" | "reviewCount">) => void;
  updateProduct: (id: string, product: Partial<AffiliateProduct>) => void;
  deleteProduct: (id: string) => void;
}

export const useAffiliateStore = create<AffiliateStore>()(
  persist(
    (set) => ({
      products: MOCK_AFFILIATES,

      addProduct: (newProduct) => {
        const product: AffiliateProduct = {
          ...newProduct,
          id: `a${Date.now()}`,
          rating: 0,
          reviewCount: 0,
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ products: [product, ...state.products] }));
      },

      updateProduct: (id, updatedFields) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedFields, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },
    }),
    {
      name: "progrys-affiliates",
    }
  )
);
