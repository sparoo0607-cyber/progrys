"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    category: "General",
    questions: [
      { q: "What is Progrys?", a: "Progrys is an all-in-one platform for students. We provide curated digital products, learning roadmaps, and a community knowledge hub to help you succeed in your studies and career." },
      { q: "Do I need an account to buy products?", a: "Yes, you need to create a free account to purchase and download products. This ensures you have permanent access to your digital files in your Library." },
    ]
  },
  {
    category: "Purchases & Downloads",
    questions: [
      { q: "How do I download a product I bought?", a: "Once purchased, your product will instantly appear in the 'My Library' tab in your account. From there, you can download all included file formats at any time." },
      { q: "What happens if a product gets updated?", a: "When a creator updates a digital product you've purchased, you will automatically receive access to the new version in your Library at no extra cost." },
      { q: "Do you offer refunds?", a: "Because our products are digital, we generally do not offer refunds once downloaded. However, if a file is corrupted or not as described, please contact us within 14 days." },
    ]
  },
  {
    category: "Technical Support",
    questions: [
      { q: "I can't open a ZIP file I downloaded.", a: "Most operating systems have built-in tools to extract ZIP files (right-click and select 'Extract'). If you're on a mobile device, you may need to download a free file extraction app." },
      { q: "My download link is not working.", a: "Try refreshing the page or clearing your browser cache. If the issue persists, please reach out to our support team and we will fix it immediately." },
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = React.useState<string>("0-0");

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-[70vh] max-w-4xl">
      <AnimatedSection>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Find answers to common questions about using Progrys.
          </p>
        </div>

        <div className="space-y-12">
          {FAQS.map((category, cIdx) => (
            <div key={category.category} className="space-y-4">
              <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6 border-b border-[var(--border-color)] pb-2">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((faq, qIdx) => {
                  const id = `${cIdx}-${qIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div key={id} className="border border-[var(--border-color)] rounded-xl overflow-hidden bg-[var(--card)] transition-colors hover:border-[var(--text-muted)]">
                      <button 
                        onClick={() => setOpenIndex(isOpen ? "" : id)}
                        className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                      >
                        <span className="font-medium text-[var(--foreground)] pr-8">{faq.q}</span>
                        <ChevronDown className={cn("text-[var(--text-muted)] transition-transform shrink-0", isOpen && "rotate-180")} size={20} />
                      </button>
                      <div 
                        className={cn("overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}
                      >
                        <div className="px-6 pb-5 text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] pt-4 mt-2">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-[var(--alt-section)] rounded-2xl border border-[var(--border-color)] text-center">
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Still have questions?</h3>
          <p className="text-[var(--text-secondary)] mb-6">We're here to help! Our support team typically responds within 24 hours.</p>
          <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-medium hover:opacity-90 transition-opacity">
            Contact Support
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
}
