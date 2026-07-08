"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { 
  DollarSign, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  ArrowRight,
  UserPlus,
  BookOpen,
  CheckCircle2,
  MoreVertical
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminOverviewPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Mock CSS Sparkline data
  const revenueData = [30, 45, 25, 60, 40, 70, 85];
  const usersData = [10, 15, 20, 18, 30, 25, 40];

  return (
    <AnimatedSection>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Overview</h1>
          <p className="text-[var(--text-secondary)]">Welcome to the PROGRYS admin dashboard.</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" className="gap-2 h-10">
            <Plus size={16} /> Digital Product
          </Button>
          <Button variant="secondary" className="gap-2 h-10">
            <Plus size={16} /> Roadmap
          </Button>
          <Button variant="primary" className="gap-2 h-10">
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid with CSS Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] p-6 rounded-2xl shadow-sm flex flex-col group hover:border-[#2563EB] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">Total Revenue (7d)</h3>
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--foreground)] mb-4">₹12,450.00</p>
          
          <div className="h-8 flex items-end gap-1 mt-auto">
            {revenueData.map((val, i) => (
              <div key={i} className="flex-1 bg-green-200 dark:bg-green-900/50 rounded-t-sm" style={{ height: `${val}%` }}></div>
            ))}
          </div>
          <p className="text-xs text-green-600 flex items-center gap-1 mt-3 pt-3 border-t border-[var(--border-color)]">
            <TrendingUp size={12} /> +14.5% from last week
          </p>
        </div>

        {/* Users */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] p-6 rounded-2xl shadow-sm flex flex-col group hover:border-[#2563EB] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">New Users (7d)</h3>
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Users size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--foreground)] mb-4">342</p>
          
          <div className="h-8 flex items-end gap-1 mt-auto">
            {usersData.map((val, i) => (
              <div key={i} className="flex-1 bg-blue-200 dark:bg-blue-900/50 rounded-t-sm" style={{ height: `${val}%` }}></div>
            ))}
          </div>
          <p className="text-xs text-blue-600 flex items-center gap-1 mt-3 pt-3 border-t border-[var(--border-color)]">
            <TrendingUp size={12} /> +2.4% from last week
          </p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--card-border)] p-6 rounded-2xl shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">Products Sold</h3>
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <ShoppingBag size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--foreground)]">842</p>
          <div className="mt-auto pt-3 border-t border-[var(--border-color)]">
            <p className="text-xs text-[var(--text-muted)]">Lifetime</p>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--card-border)] p-6 rounded-2xl shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">Pending Tasks</h3>
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <BookOpen size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--foreground)]">12</p>
          <div className="mt-auto pt-3 border-t border-[var(--border-color)] flex justify-between items-center">
            <p className="text-xs text-orange-600 font-medium">Needs moderation</p>
            <ArrowRight size={14} className="text-orange-600 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Interactive Orders Table */}
        <div className="xl:col-span-2 bg-[var(--card)] border border-[var(--card-border)] rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-semibold text-[var(--foreground)]">Recent Orders</h3>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input 
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 pl-8 pr-3 py-1.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-md shrink-0">
                <Filter size={14} />
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--alt-section)] border-b border-[var(--border-color)]">
                <tr>
                  <th className="px-6 py-3 font-medium">Order ID</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium text-right">Amount</th>
                  <th className="px-6 py-3 font-medium text-center">Status</th>
                  <th className="px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {[
                  { id: "ORD-001", name: "Sarah J.", email: "sarah@example.com", prod: "Next.js Starter Kit", amt: "₹49.00", status: "completed" },
                  { id: "ORD-002", name: "Mike T.", email: "mike@example.com", prod: "DSA Handbook", amt: "₹19.99", status: "completed" },
                  { id: "ORD-003", name: "Alex C.", email: "alex@example.com", prod: "Notion Dashboard", amt: "₹9.00", status: "refunded" },
                  { id: "ORD-004", name: "Jessica R.", email: "jess@example.com", prod: "Network Notes", amt: "₹0.00", status: "completed" },
                  { id: "ORD-005", name: "Tom B.", email: "tom@example.com", prod: "Next.js Starter Kit", amt: "₹49.00", status: "processing" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[var(--alt-section)] transition-colors group cursor-pointer">
                    <td className="px-6 py-4 font-medium text-[var(--foreground)]">{row.id}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold text-xs shrink-0">
                        {row.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[var(--foreground)] font-medium">{row.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{row.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{row.prod}</td>
                    <td className="px-6 py-4 text-[var(--foreground)] font-medium text-right">{row.amt}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge className={
                        row.status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 capitalize" :
                        row.status === "refunded" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 capitalize" :
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 capitalize"
                      }>
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[var(--text-muted)] hover:text-[var(--foreground)] p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="px-6 py-5 border-b border-[var(--border-color)] flex justify-between items-center">
            <h3 className="font-semibold text-[var(--foreground)]">Recent Activity</h3>
            <span className="text-xs text-[var(--text-muted)]">Live</span>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {[
              { type: 'purchase', text: "Sarah J. purchased Next.js Starter Kit", time: "2 mins ago", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
              { type: 'user', text: "New user registration: Michael T.", time: "15 mins ago", icon: UserPlus, color: "text-green-500", bg: "bg-green-500/10" },
              { type: 'review', text: "Alex submitted a blog post for review", time: "1 hour ago", icon: BookOpen, color: "text-orange-500", bg: "bg-orange-500/10" },
              { type: 'success', text: "System backup completed successfully", time: "3 hours ago", icon: CheckCircle2, color: "text-[var(--foreground)]", bg: "bg-[var(--alt-section)]" },
              { type: 'purchase', text: "Tom B. purchased Next.js Starter Kit", time: "5 hours ago", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
              { type: 'user', text: "New user registration: Jessica R.", time: "1 day ago", icon: UserPlus, color: "text-green-500", bg: "bg-green-500/10" },
            ].map((activity, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activity.bg} ${activity.color}`}>
                    <activity.icon size={14} />
                  </div>
                  {idx !== 5 && (
                    <div className="absolute top-8 bottom-[-24px] left-1/2 -translate-x-1/2 w-px bg-[var(--border-color)] group-last:hidden" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)] font-medium leading-tight mb-1">{activity.text}</p>
                  <p className="text-xs text-[var(--text-muted)]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
