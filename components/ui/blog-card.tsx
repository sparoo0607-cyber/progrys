"use client";

import Link from "next/link";
import { Heart, Star, Calendar } from "lucide-react";
import { BlogPost } from "@/lib/data/blogs";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { Badge } from "@/components/ui/badge";

export function BlogCard({ post }: { post: BlogPost }) {
  const { hasBlog, toggleBlog } = useWishlistStore();
  const isWishlisted = hasBlog(post.id);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col bg-[var(--card)] border border-[var(--card-border)] rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="secondary" className="bg-[var(--alt-section)] text-[var(--foreground)] border-transparent">{post.category}</Badge>
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleBlog(post.id);
            }}
            className="p-1.5 text-[var(--text-muted)] hover:text-[#EF4444] rounded-full transition-colors"
          >
            <Heart size={18} className={isWishlisted ? "fill-[#EF4444] text-[#EF4444]" : ""} />
          </button>
        </div>
        
        <Link href={`/blogs/${post.slug}`} className="flex-1">
          <h3 className="font-bold text-xl text-[var(--foreground)] mb-2 group-hover:text-[var(--foreground)] transition-colors">{post.title}</h3>
          <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        </Link>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--alt-section)] flex items-center justify-center text-[10px] font-bold text-[var(--foreground)]">
              {post.authorName.charAt(0)}
            </div>
            <span className="text-sm font-medium text-[var(--foreground)]">{post.authorName}</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" /> {post.rating}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
