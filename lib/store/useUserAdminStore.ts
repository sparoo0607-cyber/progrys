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

const MOCK_USER_LIST: AdminUser[] = [
  { id: "u1", firstName: "Alex", lastName: "Chen", email: "alex@example.com", role: "user", status: "active", createdAt: "2025-01-10", purchases: 3 },
  { id: "u2", firstName: "Sarah", lastName: "Johnson", email: "sarah@example.com", role: "user", status: "active", createdAt: "2025-02-14", purchases: 5 },
  { id: "u3", firstName: "Mike", lastName: "Taylor", email: "mike@example.com", role: "user", status: "active", createdAt: "2025-03-20", purchases: 1 },
  { id: "u4", firstName: "Jessica", lastName: "Rivera", email: "jess@example.com", role: "user", status: "banned", createdAt: "2025-04-05", purchases: 0 },
  { id: "u5", firstName: "Tom", lastName: "Brooks", email: "tom@example.com", role: "user", status: "active", createdAt: "2025-05-12", purchases: 2 },
  { id: "a1", firstName: "Admin", lastName: "User", email: "admin@progrys.com", role: "admin", status: "active", createdAt: "2024-06-01", purchases: 0 },
];

interface UserAdminStore {
  users: AdminUser[];
  updateRole: (id: string, role: "user" | "admin") => void;
  updateStatus: (id: string, status: "active" | "banned") => void;
  deleteUser: (id: string) => void;
}

export const useUserAdminStore = create<UserAdminStore>()(
  persist(
    (set) => ({
      users: MOCK_USER_LIST,
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
