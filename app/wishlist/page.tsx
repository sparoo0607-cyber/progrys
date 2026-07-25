"use client";

import * as React from "react";
import { Suspense } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ProductCard } from "@/components/ui/product-card";
import { BlogCard } from "@/components/ui/blog-card";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useProductStore } from "@/lib/store/useProductStore";
import { useBlogModerationStore } from "@/lib/store/useBlogModerationStore";
import { Heart, Package, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  return (
    <Suspense fallback={null}>
      <WishlistContent />
    </Suspense>
  );
}

function WishlistContent() {
  const [activeTab, setActiveTab] = React.useState<"products" | "blogs">("products");
  
  const { productIds, blogIds } = useWishlistStore();
  const { products, fetchProducts } = useProductStore();
  const { blogs, fetchBlogs } = useBlogModerationStore();

  React.useEffect(() => {
    fetchProducts();
    fetchBlogs();
  }, [fetchProducts, fetchBlogs]);

  const savedProducts = products.filter((p) => productIds.includes(p.id));
  const savedBlogs = blogs.filter((b) => blogIds.includes(b.id));

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 min-h-[70vh]">
      <AnimatedSection>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4 tracking-tight flex items-center gap-3">
              <Heart className="text-[var(--color-brand)]" size={40} />
              Your Wishlist
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
              All your saved products and articles in one place.
            </p>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex p-1 bg-[var(--alt-section)] rounded-lg border border-[var(--border-color)] self-stretch md:self-auto shrink-0">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-md transition-all ${
                activeTab === "products" 
                  ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm border border-[var(--border-color)]" 
                  : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Package size={16} /> Products ({savedProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-md transition-all ${
                activeTab === "blogs" 
                  ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm border border-[var(--border-color)]" 
                  : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <FileText size={16} /> Articles ({savedBlogs.length})
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "products" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {savedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {savedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[var(--alt-section)] rounded-2xl border border-[var(--border-color)]">
                <Heart size={48} className="mx-auto text-[var(--text-muted)] mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">No saved products yet</h3>
                <p className="text-[var(--text-secondary)] mb-6">Explore the store and click the bookmark icon to save items here.</p>
                <Link href="/store">
                  <Button variant="primary">Browse Store</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "blogs" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {savedBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedBlogs.map((blog) => (
                  <BlogCard key={blog.id} post={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[var(--alt-section)] rounded-2xl border border-[var(--border-color)]">
                <FileText size={48} className="mx-auto text-[var(--text-muted)] mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">No saved articles yet</h3>
                <p className="text-[var(--text-secondary)] mb-6">Read through our community blogs and bookmark your favorites.</p>
                <Link href="/blogs">
                  <Button variant="primary">Browse Articles</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
