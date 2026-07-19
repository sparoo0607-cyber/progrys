"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Target, BookOpen, Lightbulb } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Store", href: "/store", icon: ShoppingBag },
    { name: "Roadmaps", href: "/roadmaps", icon: Target },
    { name: "Blogs", href: "/blogs", icon: BookOpen },
    { name: "Hub", href: "/knowledge-hub", icon: Lightbulb },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--background)] border-t border-[var(--border-color)] pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "text-[var(--foreground)]" : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <item.icon size={20} className={isActive ? "fill-[var(--foreground)]/20" : ""} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
