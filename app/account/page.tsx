"use client";

import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";
import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, User, Bell, Shield, LogOut, Camera } from "lucide-react";
import { toast } from "sonner";

export default function AccountPage() {
  const { user, isLoggedIn, logout, updateUser } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const [activeTab, setActiveTab] = React.useState<"profile" | "security">("profile");
  
  // Profile state
  const [firstName, setFirstName] = React.useState(user?.firstName || "");
  const [lastName, setLastName] = React.useState(user?.lastName || "");
  const [email, setEmail] = React.useState(user?.email || "");
  
  // Security state
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = React.useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, mounted, router]);

  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [user]);

  if (!mounted) return null;
  if (!isLoggedIn || !user) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setIsUpdatingAvatar(true);
      try {
        const res = await fetch("/api/user/update-avatar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, avatarBase64: base64 }),
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "Failed to update avatar");
        
        updateUser({ avatar: base64 });
        toast.success("Avatar updated successfully!");
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsUpdatingAvatar(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, currentPassword, newPassword }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to change password");
      
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

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
            <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "profile" ? "bg-[var(--alt-section)] text-[var(--foreground)]" : "text-[var(--text-secondary)] hover:bg-[var(--alt-section)] hover:text-[var(--foreground)]"}`}
            >
              <User size={18} /> Profile
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "security" ? "bg-[var(--alt-section)] text-[var(--foreground)]" : "text-[var(--text-secondary)] hover:bg-[var(--alt-section)] hover:text-[var(--foreground)]"}`}
            >
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
            {activeTab === "profile" && (
              <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-6 md:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 border-b border-[var(--border-color)] pb-4">Personal Information</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold text-4xl overflow-hidden border-4 border-[var(--card)] shadow-sm">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        firstName.charAt(0).toUpperCase()
                      )}
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUpdatingAvatar}
                      className="absolute bottom-0 right-0 p-2 bg-[#2563EB] text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      <Camera size={16} />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleAvatarChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--foreground)]">Profile Picture</h3>
                    <p className="text-sm text-[var(--text-muted)] mt-1">JPG, PNG or WEBP. Max size 2MB.</p>
                  </div>
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
            )}

            {activeTab === "security" && (
              <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-6 md:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 border-b border-[var(--border-color)] pb-4">Security Settings</h2>
                
                <form className="space-y-6" onSubmit={handlePasswordChange}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--foreground)]">Current Password</label>
                    <input 
                      type="password" 
                      required
                      value={currentPassword} 
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 max-w-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--foreground)]">New Password</label>
                    <input 
                      type="password" 
                      required
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 max-w-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--foreground)]">Confirm New Password</label>
                    <input 
                      type="password" 
                      required
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 max-w-md"
                    />
                  </div>

                  <div className="pt-4 flex justify-start">
                    <Button type="submit" variant="primary" disabled={isUpdatingPassword}>
                      {isUpdatingPassword ? "Updating..." : "Change Password"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
