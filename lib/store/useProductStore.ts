import { create } from "zustand";
import { Product } from "@/lib/data/products";

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  fetchProductBySlug: (slug: string) => Promise<Product | undefined>;
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<string>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  voteProduct: (id: string, userId: string, type: "like" | "dislike" | "remove") => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductBySlug: (slug: string) => Product | undefined;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        set({ products: data });
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProductBySlug: async (slug) => {
    try {
      const res = await fetch(`/api/products/slug/${slug}`);
      if (res.ok) {
        const fullProduct = await res.json();
        set((state) => {
          // Replace the lightweight product with the full product (including images)
          const exists = state.products.some(p => p.id === fullProduct.id);
          if (exists) {
            return { products: state.products.map(p => p.id === fullProduct.id ? fullProduct : p) };
          } else {
            return { products: [...state.products, fullProduct] };
          }
        });
        return fullProduct;
      }
    } catch (err) {
      console.error(`Failed to fetch product ${slug}`, err);
    }
    return undefined;
  },

  addProduct: async (newProduct) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        const data = await res.json();
        const createdProduct = {
          ...data.product,
          images: JSON.parse(data.product.images),
          tags: JSON.parse(data.product.tags),
          fileFormats: JSON.parse(data.product.fileFormats),
          features: data.product.features ? JSON.parse(data.product.features) : [],
        };
        set((state) => ({ products: [createdProduct, ...state.products] }));
        return createdProduct.id;
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to add product (${res.status})`);
      }
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  },

  updateProduct: async (id, updatedFields) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) {
        const data = await res.json();
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedFields, updatedAt: new Date().toISOString() } : p
          ),
        }));
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to update product (${res.status})`);
      }
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  },

  voteProduct: async (id, userId, type) => {
    try {
      const res = await fetch(`/api/products/${id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, type }),
      });
      if (res.ok) {
        const data = await res.json();
        // data.product has the updated likes/dislikes
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, likes: data.product.likes, dislikes: data.product.dislikes, updatedAt: new Date().toISOString() } : p
          ),
        }));
      } else {
        throw new Error("Failed to vote on product");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getProductBySlug: (slug) => {
    return get().products.find((p) => p.slug === slug);
  },
}));
