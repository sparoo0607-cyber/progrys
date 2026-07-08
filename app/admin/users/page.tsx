"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Trash2, ShieldCheck, ShieldOff, UserCog } from "lucide-react";
import { useUserAdminStore } from "@/lib/store/useUserAdminStore";
import { toast } from "sonner";

export default function UsersAdminPage() {
  const { users, updateRole, updateStatus, deleteUser } = useUserAdminStore();
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | "user" | "admin" | "banned">("all");

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "banned" ? u.status === "banned" : u.role === filter);
    return matchSearch && matchFilter;
  });

  return (
    <AnimatedSection>
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Users</h1>
          <p className="text-[var(--text-secondary)]">Manage accounts, roles, and access.</p>
        </div>
        <Button variant="secondary" className="h-10" onClick={() => toast.info("CSV export coming soon!")}>
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: users.length, color: "text-[var(--foreground)]" },
          { label: "Admins", value: users.filter(u => u.role === "admin").length, color: "text-blue-600" },
          { label: "Active", value: users.filter(u => u.status === "active").length, color: "text-green-600" },
          { label: "Banned", value: users.filter(u => u.status === "banned").length, color: "text-red-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 shadow-sm">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-5 border-b border-[var(--border-color)] flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 pl-8 pr-3 py-1.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>
          <div className="flex p-1 bg-[var(--alt-section)] rounded-lg border border-[var(--border-color)] self-start sm:self-auto">
            {(["all", "user", "admin", "banned"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
                  filter === tab
                    ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--alt-section)] border-b border-[var(--border-color)]">
              <tr>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Joined</th>
                <th className="px-6 py-3 font-medium">Purchases</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--alt-section)] transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold text-sm shrink-0">
                      {user.firstName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-[var(--text-muted)]">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-[var(--foreground)] font-medium">{user.purchases}</td>
                  <td className="px-6 py-4">
                    <Badge className={user.role === "admin"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-[var(--alt-section)] text-[var(--text-secondary)]"
                    }>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={user.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Toggle Role */}
                      <button
                        title={user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                        onClick={() => {
                          const newRole = user.role === "admin" ? "user" : "admin";
                          updateRole(user.id, newRole);
                          toast.success(`${user.firstName} is now ${newRole}`);
                        }}
                        className="p-1.5 text-[var(--text-secondary)] hover:text-blue-500 bg-[var(--alt-section)] rounded-md border border-[var(--border-color)]"
                      >
                        <UserCog size={14} />
                      </button>
                      {/* Toggle Ban */}
                      <button
                        title={user.status === "banned" ? "Unban user" : "Ban user"}
                        onClick={() => {
                          const newStatus = user.status === "banned" ? "active" : "banned";
                          updateStatus(user.id, newStatus);
                          toast.success(`${user.firstName} has been ${newStatus === "banned" ? "banned" : "unbanned"}`);
                        }}
                        className="p-1.5 text-[var(--text-secondary)] hover:text-orange-500 bg-[var(--alt-section)] rounded-md border border-[var(--border-color)]"
                      >
                        {user.status === "banned" ? <ShieldCheck size={14} /> : <ShieldOff size={14} />}
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${user.firstName}'s account?`)) {
                            deleteUser(user.id);
                            toast.success("User deleted");
                          }
                        }}
                        className="p-1.5 text-[var(--text-secondary)] hover:text-red-500 bg-[var(--alt-section)] rounded-md border border-[var(--border-color)]"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[var(--text-muted)]">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AnimatedSection>
  );
}
