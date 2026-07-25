import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function PoliciesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-[70vh] max-w-4xl">
      <AnimatedSection>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">Legal & Policies</h1>
        <p className="text-lg text-[var(--text-secondary)] mb-12">
          Everything you need to know about our rules, data practices, and support policies.
        </p>

        <div className="space-y-16">
          <section id="privacy" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Privacy Policy</h2>
            <div className="prose prose-invert max-w-none text-[var(--text-secondary)] space-y-4">
              <p>Your privacy is important to us. This policy explains what information we collect, how we use it, and how we protect it.</p>
              <h3 className="text-lg font-medium text-[var(--foreground)]">1. Information We Collect</h3>
              <p>We collect information you provide when creating an account, purchasing products, or using our platform. This includes your name, email address, and interactions on our site.</p>
              <h3 className="text-lg font-medium text-[var(--foreground)]">2. How We Use Information</h3>
              <p>Your data helps us improve your experience, process transactions, and provide customer support. We do not sell your personal data to third parties.</p>
            </div>
          </section>

          <section id="terms" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Terms of Service</h2>
            <div className="prose prose-invert max-w-none text-[var(--text-secondary)] space-y-4">
              <p>By using Progrys, you agree to these terms. Please read them carefully.</p>
              <h3 className="text-lg font-medium text-[var(--foreground)]">1. User Responsibilities</h3>
              <p>You are responsible for maintaining the security of your account. You agree not to distribute our digital products without permission or use our platform for illegal activities.</p>
              <h3 className="text-lg font-medium text-[var(--foreground)]">2. Content Ownership</h3>
              <p>All digital products, roadmaps, and content on this platform are owned by Progrys or our content creators. Purchasing a digital item grants you a license for personal use, not redistribution.</p>
            </div>
          </section>

          <section id="refunds" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Refund Policy</h2>
            <div className="prose prose-invert max-w-none text-[var(--text-secondary)] space-y-4">
              <p>Because our products are digital downloads, we generally do not offer refunds once a file has been downloaded.</p>
              <h3 className="text-lg font-medium text-[var(--foreground)]">Exceptions</h3>
              <p>We may grant refunds in cases where a file is corrupted, the product is significantly different from its description, or you accidentally purchased duplicate items. Please contact our support team within 14 days of purchase for assistance.</p>
            </div>
          </section>

          <section id="shipping" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Delivery & Shipping</h2>
            <div className="prose prose-invert max-w-none text-[var(--text-secondary)] space-y-4">
              <p>As a digital-first platform, we do not ship physical goods.</p>
              <h3 className="text-lg font-medium text-[var(--foreground)]">Digital Delivery</h3>
              <p>Upon completing your purchase, digital products will be immediately available in your "My Library" section. You can download them instantly. If you experience any issues accessing your content, please reach out to our support team.</p>
            </div>
          </section>
        </div>
      </AnimatedSection>
    </div>
  );
}
