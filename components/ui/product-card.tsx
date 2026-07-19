"use client";

import Link from "next/link";
import { Bookmark, Star, Download, BookOpen, LayoutTemplate, FileText, Package } from "lucide-react";
import { Product } from "@/lib/data/products";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/useCartStore";

const CATEGORY_ICON = {
  ebooks: BookOpen,
  templates: LayoutTemplate,
  notes: FileText,
  kits: Package,
} as const;

export function ProductCard({ product }: { product: Product }) {
  const { hasProduct, toggleProduct } = useWishlistStore();
  const CategoryIcon = CATEGORY_ICON[product.category] ?? Package;
  const { addItem } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const isWishlisted = hasProduct(product.id);

  return (
    <div className="group flex flex-col bg-[var(--card)] border border-[var(--border-color)] rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-1.5 hover:border-[var(--foreground)]/30 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
      <div className="aspect-[4/3] bg-[var(--alt-section)] relative p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-start w-full">
          {product.isFree ? (
            <Badge className="bg-[var(--color-brand)] text-[var(--background)] border border-transparent px-3 py-1 font-medium shadow-sm hover:bg-[var(--text-secondary)] transition-colors">Free</Badge>
          ) : product.category === "kits" ? (
            <Badge className="bg-[var(--foreground)] text-[var(--background)] border border-transparent px-3 py-1 font-medium shadow-sm hover:bg-[var(--foreground)]/90 transition-colors">Kit</Badge>
          ) : (
            <Badge className="bg-white/80 dark:bg-black/50 backdrop-blur-md text-[var(--foreground)] border border-[var(--border-color)] px-3 py-1 font-medium shadow-sm capitalize transition-colors">{product.category}</Badge>
          )}
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleProduct(product.id);
              toast.success(isWishlisted ? "Removed bookmark" : "Added bookmark");
            }}
            className="p-2 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all border border-[var(--border-color)] z-10"
          >
            <Bookmark size={16} className={isWishlisted ? "fill-[var(--foreground)] text-[var(--foreground)]" : "text-[var(--text-secondary)] transition-colors group-hover:text-[var(--foreground)]"} />
          </button>
        </div>
        
        {/* Subtle hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <Link href={`/store/digital/${product.slug}`} className="absolute inset-0 z-0">
           {product.coverImage || (product.images && product.images.length > 0) ? (
             <img src={product.coverImage || product.images[0]} alt={product.title} className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--alt-section)] to-[var(--border-color)]/20">
               <CategoryIcon size={40} strokeWidth={1.5} className="text-[var(--text-muted)] opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all" />
             </div>
           )}
        </Link>
      </div>

      <div className="p-6 flex flex-col flex-grow bg-[var(--card)]">
        <Link href={`/store/${product.category}/${product.slug}`} className="flex-grow group/title">
          <h3 className="font-heading font-semibold text-lg text-[var(--foreground)] mb-1 group-hover/title:text-[var(--color-brand)] transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-[var(--foreground)] text-lg">
              {product.isFree ? "Free" : `₹${product.price.toFixed(2)}`}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[var(--text-muted)] line-through">₹{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          {product.isFree ? (
            <Button size="sm" variant="secondary" className="gap-2 shadow-sm">
              <Download size={16} /> Get
            </Button>
          ) : (
            <Button size="sm" variant="secondary" onClick={() => {
              if (!isLoggedIn) {
                toast.error("Please login to add to cart");
                router.push("/auth/login");
                return;
              }
              addItem(product);
              toast.success("Added to cart");
            }} className="shadow-sm">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
