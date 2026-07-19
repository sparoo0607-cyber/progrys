"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Moon, Sun, Menu, ShoppingCart, X, UserCircle, Settings, Lock, ShoppingBag, Heart, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/lib/store/useThemeStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { SearchDropdown } from "@/components/ui/search-dropdown";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
  { name: "Roadmaps", href: "/roadmaps" },
  { name: "Blogs", href: "/blogs" },
  { name: "Knowledge Hub", href: "/knowledge-hub" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const { theme, toggleTheme } = useThemeStore();
  const { user, isLoggedIn, logout } = useAuthStore();
  const { count, clearCart } = useCartStore();
  const cartCount = count();

  React.useEffect(() => { setMounted(true); }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdowns on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full bg-[var(--background)]/60 backdrop-blur-xl border-b border-[var(--border-color)]/50 transition-all duration-500",
          isScrolled ? "shadow-sm py-0" : "py-1"
        )}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile Left: Menu */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-[var(--foreground)]">
              <Menu size={24} />
            </button>
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="PROGRYS Logo" width={100} height={32} className="object-contain h-8 w-auto dark:invert" />
            </Link>
          </div>

          {/* Logo (Desktop) */}
          <div className="hidden md:flex flex-shrink-0 items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="PROGRYS Logo" width={120} height={40} className="object-contain h-10 w-auto dark:invert" priority />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium transition-colors"
                >
                  <span className={isActive ? "text-[var(--foreground)]" : "text-[var(--text-muted)] hover:text-[var(--foreground)]"}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--foreground)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search Trigger */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-[var(--text-muted)] bg-[var(--card)]/50 hover:bg-[var(--alt-section)] px-3 lg:px-4 py-2 lg:py-2.5 rounded-2xl transition-colors border border-[var(--border-color)]/50 shadow-sm hover:shadow group"
            >
              <Search size={16} className="group-hover:text-[var(--foreground)] transition-colors" />
              <span className="hidden lg:inline-block text-sm mr-4 font-medium">Search...</span>
              <kbd className="hidden lg:inline-block text-[10px] font-semibold bg-[var(--background)] px-1.5 py-0.5 border border-[var(--border-color)] rounded-md shadow-sm">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Cart Icon */}
            <Link href="/cart" className="md:hidden p-2 text-[var(--foreground)] relative">
              <ShoppingCart size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 text-[10px] flex items-center justify-center bg-[#EF4444] text-white rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-2 border-l border-[var(--border-color)] pl-4 ml-2">
              <button 
                onClick={toggleTheme}
                className="p-2 text-[var(--foreground)] hover:bg-[var(--alt-section)] rounded-full transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link href="/cart" className="p-2 text-[var(--foreground)] hover:bg-[var(--alt-section)] rounded-full transition-colors relative">
                <ShoppingCart size={20} />
                {mounted && cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 text-[10px] flex items-center justify-center bg-[#EF4444] text-white rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="hidden md:block relative">
              {isLoggedIn && user ? (
                <div>
                  <button 
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-[var(--alt-section)] p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-[var(--border-color)]"
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold text-sm">
                      {user.firstName.charAt(0)}
                    </div>
                  </button>

                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-[var(--card)] border border-[var(--card-border)] rounded-xl shadow-lg py-2 z-50 flex flex-col"
                      >
                        <div className="px-4 py-2 border-b border-[var(--border-color)] mb-2">
                          <p className="font-semibold text-[var(--foreground)] text-sm">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
                        </div>
                        
                        <Link href="/account" className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--alt-section)] flex items-center gap-2">
                          <Settings size={16} /> Account Settings
                        </Link>
                        <Link href="/library" className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--alt-section)] flex items-center gap-2">
                          <ShoppingBag size={16} /> My Library
                        </Link>
                        <Link href="/wishlist" className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--alt-section)] flex items-center gap-2">
                          <Heart size={16} /> Wishlist
                        </Link>
                        
                        {user.role === "admin" && (
                          <Link href="/admin" className="px-4 py-2 mt-2 border-t border-[var(--border-color)] text-sm text-[var(--foreground)] hover:bg-[var(--alt-section)] flex items-center gap-2 font-medium">
                            <Lock size={16} /> Admin Dashboard
                          </Link>
                        )}
                        
                        <button 
                          onClick={() => { clearCart(); logout(); }}
                          className="px-4 py-2 mt-2 border-t border-[var(--border-color)] text-sm text-[#EF4444] hover:bg-[#EF4444]/10 flex items-center gap-2 w-full text-left"
                        >
                          <LogOut size={16} /> Log out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/auth/login">
                  <Button variant="primary" className="h-10 px-4 ml-2">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Overlay */}
      <SearchDropdown isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 md:hidden backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[var(--background)] z-50 shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-4 flex items-center justify-between border-b border-[var(--border-color)]">
                <Image src="/logo.png" alt="PROGRYS Logo" width={100} height={32} className="object-contain h-8 w-auto dark:invert" />
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[var(--foreground)] hover:bg-[var(--alt-section)] rounded-full">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                <nav className="flex flex-col px-2 space-y-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-lg text-base font-medium ${
                          isActive
                            ? "bg-[var(--alt-section)] text-[var(--foreground)]"
                            : "text-[var(--text-secondary)] hover:bg-[var(--alt-section)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>

                {isLoggedIn && user && (
                  <div className="mt-8 px-4">
                    <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">My Account</h4>
                    <div className="space-y-1">
                      <Link href="/library" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-2 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--alt-section)]">
                        <ShoppingBag size={20} /> My Library
                      </Link>
                      <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-2 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--alt-section)]">
                        <Heart size={20} /> Wishlist
                      </Link>
                      <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-2 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--alt-section)]">
                        <Settings size={20} /> Settings
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-[var(--border-color)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--foreground)]">Theme</span>
                  <button 
                    onClick={toggleTheme}
                    className="p-2 bg-[var(--alt-section)] text-[var(--foreground)] rounded-full"
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
                
                {!isLoggedIn ? (
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full">
                      Login / Sign Up
                    </Button>
                  </Link>
                ) : (
                  <Button variant="secondary" className="w-full text-[#EF4444] border-[#EF4444]" onClick={() => { clearCart(); logout(); setMobileMenuOpen(false); }}>
                    Log out
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
