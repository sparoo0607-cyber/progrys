"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Heart, Share2, AlertCircle } from "lucide-react";
import { useBlogModerationStore } from "@/lib/store/useBlogModerationStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";

export default function BlogReaderPage(props: { params: Promise<{ slug: string }> }) {
  const params = React.use(props.params);
  const router = useRouter();
  const { getBlogBySlug } = useBlogModerationStore();
  const { hasBlog, toggleBlog } = useWishlistStore();
  
  const post = getBlogBySlug(params.slug);
  const isWishlisted = post ? hasBlog(post.id) : false;

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">Article not found</h1>
        <p className="text-[var(--text-secondary)] mb-8">The blog post you are looking for does not exist or was removed.</p>
        <Button onClick={() => router.push("/blogs")} variant="primary">Browse Articles</Button>
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <AnimatedSection>
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-10">
          <button 
            onClick={() => router.push("/blogs")} 
            className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft size={16} /> Back to blogs
          </button>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all">
              <Share2 size={16} />
            </button>
            <button 
              onClick={() => toggleBlog(post.id)}
              className={`w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border-color)] flex items-center justify-center transition-all ${isWishlisted ? 'border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10' : 'hover:border-[var(--foreground)]'}`}
            >
              <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : "text-[var(--text-secondary)]"} />
            </button>
          </div>
        </div>

        {/* Warning if pending */}
        {post.status === "pending" && (
          <div className="mb-8 p-4 bg-orange-50 border border-orange-200 dark:bg-orange-900/10 dark:border-orange-900/30 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="font-bold text-orange-800 dark:text-orange-300">Pending Review</h4>
              <p className="text-sm text-orange-700 dark:text-orange-400/80">This article is awaiting moderation and is not visible to the public yet.</p>
            </div>
          </div>
        )}

        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-[var(--foreground)] text-[var(--background)] border-transparent">{post.category}</Badge>
            {/* The store added a tags array manually for pending ones, so let's check if it exists */}
            {(post as any).tags?.map((tag: string) => (
              <Badge key={tag} className="bg-[var(--alt-section)] text-[var(--text-secondary)] border-transparent">{tag}</Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 py-6 border-y border-[var(--border-color)]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--foreground)] to-[var(--text-secondary)] flex items-center justify-center text-white font-bold text-lg">
              {post.authorName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-[var(--foreground)]">{post.authorName}</p>
              <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] mt-1">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {formattedDate}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border-color)]" />
                <span className="flex items-center gap-1.5"><Clock size={14} /> {(post as any).readTime || 5} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        {/* We use dangerouslySetInnerHTML because the mock data has raw HTML string like <p>...</p> */}
        {/* In a real app, you'd parse markdown or sanitize HTML here */}
        <article 
          className="prose prose-lg dark:prose-invert prose-neutral max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--foreground)] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
      </AnimatedSection>
    </div>
  );
}
