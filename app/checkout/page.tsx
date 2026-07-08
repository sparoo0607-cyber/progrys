"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useCartStore } from "@/lib/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock, CreditCard, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { total, items, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const router = useRouter();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <AnimatedSection>
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">Payment Successful!</h1>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            Thank you for your purchase. Your digital products have been added to your library and are ready to download.
          </p>
          <Button variant="primary" size="lg" onClick={() => router.push("/library")}>
            Go to My Library
          </Button>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 min-h-[70vh]">
      <AnimatedSection>
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2 tracking-tight">Secure Checkout</h1>
          <p className="text-[var(--text-secondary)]">Complete your purchase to get instant access.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Payment Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 border-b border-[var(--border-color)] pb-4">Payment Details</h2>
              
              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-[var(--foreground)]">Contact Information</h3>
                  <Input type="email" placeholder="Email address" required className="w-full bg-[var(--input-bg)]" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-[var(--foreground)]">Card Information</h3>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                    <Input type="text" placeholder="Card number" required className="w-full pl-10 bg-[var(--input-bg)]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="text" placeholder="MM / YY" required className="w-full bg-[var(--input-bg)]" />
                    <Input type="text" placeholder="CVC" required className="w-full bg-[var(--input-bg)]" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-[var(--foreground)]">Name on card</h3>
                  <Input type="text" placeholder="Full name" required className="w-full bg-[var(--input-bg)]" />
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full mt-8"
                  disabled={isProcessing || total() === 0}
                >
                  {isProcessing ? "Processing securely..." : `Pay ₹${total().toFixed(2)}`}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)] mt-4">
                  <Lock size={12} /> Payments are secure and encrypted
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="bg-[var(--alt-section)] border border-[var(--border-color)] rounded-2xl p-6 md:p-8 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.length > 0 ? items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-[var(--foreground)]">{item.product.title}</span>
                    <span className="text-[var(--text-secondary)] font-medium">₹{item.product.price.toFixed(2)}</span>
                  </div>
                )) : (
                  <p className="text-sm text-[var(--text-muted)]">No items in cart</p>
                )}
              </div>

              <div className="space-y-4 pt-6 border-t border-[var(--border-color)]">
                <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                  <span>Subtotal</span>
                  <span>₹{total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                  <span>Tax</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between text-[var(--foreground)] font-bold text-xl pt-4 border-t border-[var(--border-color)]">
                  <span>Total Due</span>
                  <span>₹{total().toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 bg-[var(--card)] rounded-xl p-4 border border-[var(--border-color)]">
                <div className="flex gap-3 items-start">
                  <ShieldCheck className="text-[#16A34A] shrink-0 mt-0.5" size={18} />
                  <p className="text-xs text-[var(--text-secondary)]">
                    <strong className="text-[var(--foreground)] block mb-0.5">Instant Delivery Guarantee</strong>
                    You will receive instant access to download your digital products immediately after payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
