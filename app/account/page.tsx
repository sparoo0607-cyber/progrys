"use client";

import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";
import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, User, Bell, Shield, LogOut } from "lucide-react";

export default function AccountPage() {
  const { user, isLoggedIn, logout } = useAuthStore();
  const router = useRouter();
  
  const [firstName, setFirstName] = React.useState(user?.firstName || "");
  const [lastName, setLastName] = React.useState(user?.lastName || "");
  const [email, setEmail] = React.useState(user?.email || "");

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) return null;

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 min-h-[70vh]">
      <AnimatedSection className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2 tracking-tight">Account Settings</h1>
          <p className="text-[var(--text-secondary)]">Manage your profile, preferences, and security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium bg-[var(--alt-section)] text-[var(--foreground)] rounded-lg">
              <User size={18} /> Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--alt-section)] hover:text-[var(--foreground)] rounded-lg transition-colors">
              <Shield size={18} /> Security
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--alt-section)] hover:text-[var(--foreground)] rounded-lg transition-colors">
              <Bell size={18} /> Notifications
            </button>
            <button 
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors mt-4"
            >
              <LogOut size={18} /> Log out
            </button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 border-b border-[var(--border-color)] pb-4">Personal Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold text-3xl">
                  {firstName.charAt(0)}
                </div>
                <Button variant="secondary" size="sm">Change Avatar</Button>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--foreground)]">First Name</label>
                    <input 
                      type="text" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--foreground)]">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--foreground)]">Email Address</label>
                  <input 
                    type="email" 
                    value={email} 
                    disabled
                    className="w-full px-4 py-2.5 bg-[var(--alt-section)] border border-[var(--border-color)] rounded-lg text-[var(--text-muted)] cursor-not-allowed"
                  />
                  <p className="text-xs text-[var(--text-muted)] mt-1">To change your email, please contact support.</p>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button variant="primary">Save Changes</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
