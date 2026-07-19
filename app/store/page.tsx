"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ProductCard } from "@/components/ui/product-card";
import { AffiliateCard } from "@/components/ui/affiliate-card";
import { useProductStore } from "@/lib/store/useProductStore";
import { useAffiliateStore } from "@/lib/store/useAffiliateStore";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function StorePage() {
  return (
    <Suspense fallback={null}>
      <StorePageContent />
    </Suspense>
  );
}

function StorePageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "curated" ? "curated" : "digital";
  const [activeTab, setActiveTab] = React.useState<"digital" | "curated">(initialTab);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { products, fetchProducts } = useProductStore();
  const { products: affiliates } = useAffiliateStore();

  React.useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  // Simple filtering for mock data
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredAffiliates = affiliates.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <AnimatedSection>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4 tracking-tight">The Store</h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
              High-quality resources to accelerate your learning. From code templates to curated gear recommendations.
            </p>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex p-1 bg-[var(--alt-section)] rounded-lg border border-[var(--border-color)] self-stretch md:self-auto shrink-0">
            <button
              onClick={() => setActiveTab("digital")}
              className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-medium rounded-md transition-all ${
                activeTab === "digital" 
                  ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm border border-[var(--border-color)]" 
                  : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Digital Products
            </button>
            <button
              onClick={() => setActiveTab("curated")}
              className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-medium rounded-md transition-all ${
                activeTab === "curated" 
                  ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm border border-[var(--border-color)]" 
                  : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Curated Picks
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input 
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--card)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="gap-2 h-[42px]">
              <Filter size={16} /> Filter
            </Button>
            <Button variant="secondary" className="gap-2 h-[42px]">
              <SlidersHorizontal size={16} /> Sort
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "digital" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-[var(--alt-section)] rounded-xl border border-[var(--border-color)]">
                <p className="text-[var(--text-muted)]">No digital products found.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "curated" && (
          <div className="space-y-8">
            <div className="bg-[var(--alt-section)] border border-[var(--border-color)] rounded-xl p-4 flex items-center justify-center">
              <p className="text-sm text-[var(--text-secondary)] text-center">
                Transparency note: Some of these may be partner links. It helps support the platform at no extra cost to you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAffiliates.map(affiliate => (
                <AffiliateCard key={affiliate.id} product={affiliate} />
              ))}
            </div>
            {filteredAffiliates.length === 0 && (
              <div className="text-center py-20 bg-[var(--alt-section)] rounded-xl border border-[var(--border-color)]">
                <p className="text-[var(--text-muted)]">No curated picks found.</p>
              </div>
            )}
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
