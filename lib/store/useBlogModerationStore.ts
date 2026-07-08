import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_BLOGS } from "@/lib/data/blogs";
import type { BlogPost } from "@/lib/data/blogs";

export interface ModeratableBlog extends BlogPost {
  status: "pending" | "approved" | "rejected";
}

// Add moderation status to all mock blogs, some pending
const seeded: ModeratableBlog[] = MOCK_BLOGS.map((b, i) => ({
  ...b,
  status: i < 2 ? "pending" : "approved",
}));

// Add a couple of new pending submissions
const pendingSubmissions: ModeratableBlog[] = [
  {
    id: "pending-1",
    title: "How I passed AWS Cloud Practitioner in 2 weeks",
    slug: "aws-cloud-practitioner-2-weeks",
    excerpt: "A step-by-step study guide and my personal routine that helped me pass on first attempt.",
    content: "...",
    authorName: "Raj Patel",
    author: { name: "Raj Patel", avatar: "" },
    category: "Certification",
    rating: 0,
    coverImage: "",
    tags: ["AWS", "Cloud", "Certification"],
    readTime: 8,
    publishedAt: new Date().toISOString(),
    likes: 0,
    status: "pending",
  },
  {
    id: "pending-2",
    title: "Top 5 VS Code Extensions for Students",
    slug: "vscode-extensions-students",
    excerpt: "Boost your productivity with these must-have extensions. All free, all awesome.",
    content: "...",
    authorName: "Lily Nguyen",
    author: { name: "Lily Nguyen", avatar: "" },
    category: "Productivity",
    rating: 0,
    coverImage: "",
    tags: ["Tools", "Productivity", "VSCode"],
    readTime: 4,
    publishedAt: new Date().toISOString(),
    likes: 0,
    status: "pending",
  },
];

interface BlogModerationStore {
  blogs: ModeratableBlog[];
  approve: (id: string) => void;
  reject: (id: string) => void;
  delete: (id: string) => void;
  submitBlog: (blog: Omit<ModeratableBlog, "id" | "status" | "publishedAt" | "likes">) => void;
  getBlogBySlug: (slug: string) => ModeratableBlog | undefined;
}

export const useBlogModerationStore = create<BlogModerationStore>()(
  persist(
    (set, get) => ({
      blogs: [...pendingSubmissions, ...seeded],
      approve: (id) =>
        set((s) => ({ blogs: s.blogs.map((b) => (b.id === id ? { ...b, status: "approved" } : b)) })),
      reject: (id) =>
        set((s) => ({ blogs: s.blogs.map((b) => (b.id === id ? { ...b, status: "rejected" } : b)) })),
      delete: (id) =>
        set((s) => ({ blogs: s.blogs.filter((b) => b.id !== id) })),
      submitBlog: (newBlog) =>
        set((s) => ({
          blogs: [
            {
              ...newBlog,
              id: `b${Date.now()}`,
              status: "pending",
              publishedAt: new Date().toISOString(),
              likes: 0,
            },
            ...s.blogs,
          ],
        })),
      getBlogBySlug: (slug) => {
        return get().blogs.find((b) => b.slug === slug);
      },
    }),
    { name: "progrys-blog-moderation" }
  )
);
