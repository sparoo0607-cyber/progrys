import { create } from "zustand";
import type { BlogPost } from "@/lib/data/blogs";

export interface ModeratableBlog extends BlogPost {
  status: "pending" | "approved" | "rejected";
}

interface BlogModerationStore {
  blogs: ModeratableBlog[];
  isLoading: boolean;
  fetchBlogs: () => Promise<void>;
  approve: (id: string) => Promise<void>;
  reject: (id: string) => Promise<void>;
  delete: (id: string) => Promise<void>;
  submitBlog: (blog: Omit<ModeratableBlog, "id" | "status" | "publishedAt" | "likes">) => Promise<void>;
  getBlogBySlug: (slug: string) => ModeratableBlog | undefined;
}

export const useBlogModerationStore = create<BlogModerationStore>((set, get) => ({
  blogs: [],
  isLoading: false,

  fetchBlogs: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        set({ blogs: data });
      }
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      set({ isLoading: false });
    }
  },

  approve: async (id) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      if (res.ok) {
        const data = await res.json();
        set((s) => ({
          blogs: s.blogs.map((b) => (b.id === id ? data.blog : b)),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  reject: async (id) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      if (res.ok) {
        const data = await res.json();
        set((s) => ({
          blogs: s.blogs.map((b) => (b.id === id ? data.blog : b)),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  delete: async (id) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((s) => ({
          blogs: s.blogs.filter((b) => b.id !== id),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  submitBlog: async (newBlog) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });
      if (res.ok) {
        const data = await res.json();
        set((s) => ({
          blogs: [data.blog, ...s.blogs],
        }));
      } else {
        throw new Error("Failed to submit blog");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getBlogBySlug: (slug) => {
    return get().blogs.find((b) => b.slug === slug);
  },
}));
