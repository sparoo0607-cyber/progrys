"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Target, 
  BookOpen, 
  Lightbulb, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_LINKS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Digital Products", href: "/admin/digital-products", icon: ShoppingBag },
  { name: "Affiliate Products", href: "/admin/affiliate-products", icon: CreditCard },
  { name: "Roadmaps", href: "/admin/roadmaps", icon: Target },
  { name: "Blog Moderation", href: "/admin/blog-moderation", icon: BookOpen },
  { name: "Knowledge Hub", href: "/admin/knowledge-hub", icon: Lightbulb },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted && (!isLoggedIn || !isAdmin)) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, isAdmin, mounted, router]);

  if (!mounted) return null;
  if (!isLoggedIn || !isAdmin) return null;

  return (
    <div className="flex h-screen bg-[#F4F4F5] dark:bg-[#0A0A0A] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0A0A] text-[#A1A1AA] flex flex-col transition-transform duration-300 lg:static lg:translate-x-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#27272A]">
          <Link href="/admin" className="text-xl font-bold text-white tracking-tight">
            PROGRYS <span className="text-xs font-normal text-[#71717A] ml-2">ADMIN</span>
          </Link>
          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="px-3 space-y-1">
            {ADMIN_LINKS.map(link => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/admin");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-[#27272A] text-white" 
                      : "hover:bg-[#18181B] hover:text-white"
                  )}
                >
                  <link.icon size={18} className={isActive ? "text-white" : "text-[#71717A]"} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#27272A]">
          <div className="flex items-center gap-3 px-3 py-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center text-white font-bold text-xs">
              {user?.firstName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-[#71717A] truncate">{user?.email}</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#71717A] hover:bg-[#18181B] hover:text-white transition-colors w-full">
            <LogOut size={18} /> Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-[#FFFFFF] dark:bg-[#141414] border-b border-[#E4E4E7] dark:border-[#2E2E2E] flex items-center px-4 shrink-0">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-[var(--foreground)]">
            <Menu size={24} />
          </button>
          <span className="font-bold text-[var(--foreground)] ml-2">Admin Dashboard</span>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
