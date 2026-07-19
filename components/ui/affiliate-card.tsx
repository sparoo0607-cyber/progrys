"use client";

import { ExternalLink, Star, Headphones, GraduationCap, BookMarked } from "lucide-react";
import { AffiliateProduct } from "@/lib/data/affiliates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CATEGORY_ICON = {
  gear: Headphones,
  courses: GraduationCap,
  books: BookMarked,
} as const;

export function AffiliateCard({ product }: { product: AffiliateProduct }) {
  const CategoryIcon = CATEGORY_ICON[product.category] ?? BookMarked;
  return (
    <div className="group flex flex-col bg-[var(--card)] border border-[var(--border-color)] rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-1.5 hover:border-[var(--foreground)]/30 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
      <div className="aspect-square bg-gradient-to-br from-[var(--alt-section)] to-[var(--border-color)]/20 relative p-4 flex items-center justify-center overflow-hidden">
        <Badge className="absolute top-4 left-4 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--text-secondary)] backdrop-blur-md px-3 py-1 font-medium shadow-sm z-10 border border-transparent">
          {product.platform}
        </Badge>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <CategoryIcon size={48} strokeWidth={1.5} className="text-[var(--text-muted)] opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all" />
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-1 relative z-10 bg-[var(--card)]">
        <h3 className="font-heading font-semibold text-lg text-[var(--foreground)] mb-1 group-hover:text-[var(--text-secondary)] transition-colors">{product.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 leading-relaxed flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-[var(--foreground)] text-lg">
              ₹{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[var(--text-muted)] line-through">₹{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <Button 
            size="sm" 
            variant="secondary" 
            className="gap-2 shadow-sm"
            onClick={() => window.open(product.url, "_blank", "noopener,noreferrer")}
          >
            View on {product.platform} <ExternalLink size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
