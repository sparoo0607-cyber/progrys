"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending message
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-[70vh]">
      <AnimatedSection className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">Contact Us</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Have questions about a product, your account, or just want to say hi? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--card)] p-8 rounded-2xl border border-[var(--card-border)] shadow-sm">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Full Name</label>
                <Input required placeholder="Jane Doe" className="w-full bg-[var(--input-bg)]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Email Address</label>
                <Input required type="email" placeholder="jane@example.com" className="w-full bg-[var(--input-bg)]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Subject</label>
                <Input required placeholder="How can we help you?" className="w-full bg-[var(--input-bg)]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Message</label>
                <textarea 
                  required 
                  rows={4} 
                  placeholder="Tell us more about your inquiry..." 
                  className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:border-transparent resize-none"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full h-12" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div className="space-y-8 md:pl-8">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Other ways to connect</h2>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--alt-section)] flex items-center justify-center shrink-0 border border-[var(--border-color)]">
                <Mail className="text-[var(--foreground)]" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[var(--foreground)]">Email Support</h3>
                <p className="text-[var(--text-secondary)] mt-1">For general inquiries and support.</p>
                <a href="mailto:support@progrys.com" className="text-blue-500 hover:underline mt-2 inline-block font-medium">support@progrys.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--alt-section)] flex items-center justify-center shrink-0 border border-[var(--border-color)]">
                <MessageSquare className="text-[var(--foreground)]" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[var(--foreground)]">Community Discord</h3>
                <p className="text-[var(--text-secondary)] mt-1">Join our community to ask questions and network.</p>
                <a href="#" className="text-blue-500 hover:underline mt-2 inline-block font-medium">Join Discord Server</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--alt-section)] flex items-center justify-center shrink-0 border border-[var(--border-color)]">
                <MapPin className="text-[var(--foreground)]" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[var(--foreground)]">Headquarters</h3>
                <p className="text-[var(--text-secondary)] mt-1">
                  Progrys Inc.<br/>
                  123 Learning Ave, Suite 100<br/>
                  San Francisco, CA 94103
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
