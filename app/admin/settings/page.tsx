"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function SettingsAdminPage() {
  const [saved, setSaved] = React.useState(false);
  const [settings, setSettings] = React.useState({
    siteName: "PROGRYS",
    siteDescription: "The Student Digital Ecosystem",
    supportEmail: "support@progrys.com",
    stripeKey: "pk_test_••••••••••••••••",
    allowBlogSubmissions: true,
    maintenanceMode: false,
    showAffiliateBanner: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    toast.success("Settings saved successfully!");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AnimatedSection>
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Platform Settings</h1>
          <p className="text-[var(--text-secondary)]">Configure global platform variables and integrations.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* General */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-[var(--foreground)] border-b border-[var(--border-color)] pb-4">General</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Site Name</label>
            <Input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="bg-[var(--input-bg)]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Site Description</label>
            <Input value={settings.siteDescription} onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })} className="bg-[var(--input-bg)]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Support Email</label>
            <Input type="email" value={settings.supportEmail} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} className="bg-[var(--input-bg)]" />
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-[var(--foreground)] border-b border-[var(--border-color)] pb-4">Integrations</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Stripe Publishable Key</label>
            <Input value={settings.stripeKey} onChange={(e) => setSettings({ ...settings, stripeKey: e.target.value })} className="bg-[var(--input-bg)] font-mono text-sm" />
            <p className="text-xs text-[var(--text-muted)]">Used for client-side payment intent creation.</p>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-[var(--foreground)] border-b border-[var(--border-color)] pb-4">Feature Toggles</h2>

          {([
            { key: "allowBlogSubmissions", label: "Allow Community Blog Submissions", description: "Enables users to submit articles for moderation." },
            { key: "showAffiliateBanner", label: "Show Affiliate Disclaimer Banner", description: "Shows the transparency note on the Curated Picks tab." },
            { key: "maintenanceMode", label: "Maintenance Mode", description: "Displays a maintenance page to all non-admin users. Enable with caution." },
          ] as const).map(({ key, label, description }) => (
            <div key={key} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, [key]: !settings[key] })}
                className={`relative shrink-0 h-6 w-11 rounded-full border-2 transition-colors focus:outline-none ${settings[key] ? "bg-[#2563EB] border-[#2563EB]" : "bg-[var(--alt-section)] border-[var(--border-color)]"}`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${settings[key] ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary" className="gap-2" onClick={() => toast.info("Settings reverted.")}>
            <RefreshCw size={16} /> Reset
          </Button>
          <Button type="submit" variant="primary" className="gap-2">
            <Save size={16} /> {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </form>
    </AnimatedSection>
  );
}
