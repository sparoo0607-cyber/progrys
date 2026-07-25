import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "banned";
  createdAt: string;
  purchases: number;
}

interface UserAdminStore {
  users: AdminUser[];
  setUsers: (users: AdminUser[]) => void;
  updateRole: (id: string, role: "user" | "admin") => void;
  updateStatus: (id: string, status: "active" | "banned") => void;
  deleteUser: (id: string) => void;
}

export const useUserAdminStore = create<UserAdminStore>()(
  persist(
    (set) => ({
      users: [],
      setUsers: (users) => set({ users }),
      updateRole: (id, role) =>
        set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, role } : u)) })),
      updateStatus: (id, status) =>
        set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, status } : u)) })),
      deleteUser: (id) =>
        set((s) => ({ users: s.users.filter((u) => u.id !== id) })),
    }),
    { name: "progrys-users-admin" }
  )
);
