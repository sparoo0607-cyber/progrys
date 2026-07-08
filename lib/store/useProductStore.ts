import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, MOCK_PRODUCTS } from "@/lib/data/products";

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: MOCK_PRODUCTS,

      addProduct: (newProduct) => {
        const product: Product = {
          ...newProduct,
          id: `p${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ products: [product, ...state.products] }));
      },

      updateProduct: (id, updatedFields) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id
              ? { ...p, ...updatedFields, updatedAt: new Date().toISOString() }
              : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProductBySlug: (slug) => {
        return get().products.find((p) => p.slug === slug);
      },
    }),
    {
      name: "progrys-products",
      // ⚠️  Strip the large base64 dataUrl before writing to localStorage.
      //     Only keep file metadata (name, size, type).
      //     The actual binary data lives in IndexedDB via fileStorage.ts.
      partialize: (state) => ({
        products: state.products.map((p) => ({
          ...p,
          // Remove dataUrl but keep the rest of downloadFile for display
          downloadFile: p.downloadFile
            ? { name: p.downloadFile.name, size: p.downloadFile.size, type: p.downloadFile.type, dataUrl: "" }
            : undefined,
        })),
      }),
    }
  )
);
