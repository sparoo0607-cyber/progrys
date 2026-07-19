"use client";

import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";
import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { MOCK_PRODUCTS } from "@/lib/data/products";
import { Download, ShoppingBag, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function LibraryPage() {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, mounted, router]);

  if (!mounted) return null;
  if (!isLoggedIn || !user) return null;

  // Mock purchased products (first 2 from mock data)
  const purchasedProducts = MOCK_PRODUCTS.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 min-h-[70vh]">
      <AnimatedSection>
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4 tracking-tight">My Library</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Keep this page bookmarked — it's your personal vault for all purchased resources.
          </p>
        </div>

        <div className="space-y-12">
          {/* Digital Products Section */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-color)] pb-4">
              <ShoppingBag className="text-[var(--text-muted)]" size={24} />
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Digital Products</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedProducts.map(product => (
                <div key={product.id} className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl overflow-hidden shadow-sm flex flex-col">
                  <div className="aspect-video bg-[var(--alt-section)] relative p-4 flex flex-col justify-between items-start border-b border-[var(--border-color)]">
                    <Badge className="bg-[var(--foreground)] text-[var(--background)]">Purchased</Badge>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg text-[var(--foreground)] mb-2">{product.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-6 flex-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-col gap-2">
                      {product.fileFormats.map(format => (
                        <Button key={format} variant="secondary" className="w-full gap-2">
                          <Download size={16} /> Download {format}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Roadmaps Progress Section */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-color)] pb-4">
              <Target className="text-[var(--text-muted)]" size={24} />
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Roadmap Progress</h2>
            </div>
            
            <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-8 text-center">
               <p className="text-[var(--text-muted)] mb-4">You haven't started any roadmaps yet.</p>
               <Link href="/roadmaps">
                 <Button variant="secondary">Browse Roadmaps</Button>
               </Link>
            </div>
          </section>
        </div>
      </AnimatedSection>
    </div>
  );
}
