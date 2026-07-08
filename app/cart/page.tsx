"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function CartPage() {
  const { items, removeItem, total, count } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <AnimatedSection>
          <div className="w-24 h-24 bg-[var(--alt-section)] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🛒</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">Your cart is empty</h1>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            Looks like you haven't added any resources yet. Explore the store to find what you need.
          </p>
          <Link href="/store">
            <Button variant="primary" size="lg">Browse Store</Button>
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 min-h-[70vh]">
      <AnimatedSection>
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-8 tracking-tight">Shopping Cart ({count()})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.product.id} className="flex flex-col sm:flex-row gap-6 p-4 sm:p-6 bg-[var(--card)] border border-[var(--card-border)] rounded-2xl shadow-sm">
                <div className="w-full sm:w-32 aspect-[4/3] sm:aspect-square bg-[var(--alt-section)] rounded-xl border border-[var(--border-color)] flex-shrink-0" />
                
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-[var(--foreground)]">{item.product.title}</h3>
                    <span className="font-bold text-lg text-[var(--foreground)]">₹{item.product.price.toFixed(2)}</span>
                  </div>
                  
                  <Badge className="w-fit mb-4 bg-[var(--alt-section)] text-[var(--text-secondary)] border-transparent">
                    {item.product.category}
                  </Badge>
                  
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-[var(--border-color)]">
                    <span className="text-sm text-[var(--text-secondary)]">Instant Download</span>
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[#EF4444] transition-colors"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Subtotal</span>
                  <span>₹{total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Tax (Calculated at checkout)</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between text-[var(--foreground)] font-bold text-xl pt-4 border-t border-[var(--border-color)]">
                  <span>Total</span>
                  <span>₹{total().toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button variant="primary" size="lg" className="w-full mb-4">
                  Proceed to Checkout <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <ShieldCheck size={18} className="text-[#16A34A]" />
                  Secure 256-bit SSL encryption
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <CreditCard size={18} className="text-[var(--text-muted)]" />
                  Stripe secure payments
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
