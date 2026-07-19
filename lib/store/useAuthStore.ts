import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isAdmin: false,
      login: (user) =>
        set({ user, isLoggedIn: true, isAdmin: user.role === "admin" }),
      logout: () => set({ user: null, isLoggedIn: false, isAdmin: false }),
      updateUser: (partial) => {
        const user = get().user;
        if (user) set({ user: { ...user, ...partial } });
      },
    }),
    { 
      name: "progrys-auth"
    }
  )
);

// Mock users for demo
export const MOCK_USERS = {
  user: {
    id: "u1",
    firstName: "Alex",
    lastName: "Chen",
    email: "alex@example.com",
    avatar: "",
    role: "user" as const,
    createdAt: "2025-01-10",
  },
  admin: {
    id: "a1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@progrys.com",
    avatar: "",
    role: "admin" as const,
    createdAt: "2024-06-01",
  },
};
