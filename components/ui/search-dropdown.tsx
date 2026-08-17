"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ShoppingBag, Target, FileText, Lightbulb, ExternalLink, TrendingUp, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore } from "@/lib/store/useProductStore";
import { useRoadmapStore } from "@/lib/store/useRoadmapStore";
import { useBlogModerationStore } from "@/lib/store/useBlogModerationStore";
import { useKnowledgeStore } from "@/lib/store/useKnowledgeStore";
import { useAffiliateStore } from "@/lib/store/useAffiliateStore";

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

type ResultItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  type: "product" | "roadmap" | "blog" | "knowledge" | "affiliate";
};

const TYPE_META: Record<ResultItem["type"], { label: string; icon: React.ElementType; color: string }> = {
  product:    { label: "Digital Product", icon: ShoppingBag, color: "text-[var(--foreground)]" },
  affiliate:  { label: "Curated Pick",    icon: ExternalLink, color: "text-[var(--foreground)]" },
  roadmap:    { label: "Roadmap",          icon: Target,      color: "text-[var(--foreground)]" },
  blog:       { label: "Blog",             icon: FileText,    color: "text-[var(--foreground)]" },
  knowledge:  { label: "Lesson",           icon: Lightbulb,  color: "text-[var(--foreground)]" },
};

const TRENDING_TAGS = [
  "Next.js", "React", "DSA", "System Design",
  "Notion", "AWS", "SQL", "UI/UX", "Python",
  "Frontend", "Productivity", "Algorithms",
];

export function SearchDropdown({ isOpen, onClose }: SearchDropdownProps) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { products: digitalProducts } = useProductStore();
  const { products: affiliateProducts } = useAffiliateStore();
  const { roadmaps } = useRoadmapStore();
  const { blogs } = useBlogModerationStore();
  const { topics } = useKnowledgeStore();

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // ── ESC to close ──
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // ── Build result index from all stores ──
  const allResults = React.useMemo<ResultItem[]>(() => {
    const items: ResultItem[] = [];

    digitalProducts.forEach((p) => items.push({
      id: p.id, title: p.title,
      subtitle: p.isFree ? "Free" : `₹${p.price.toFixed(2)}`,
      href: `/store/digital/${p.slug}`,
      type: "product",
    }));

    affiliateProducts.forEach((p) => items.push({
      id: p.id, title: p.title,
      subtitle: p.platform,
      href: p.url,
      type: "affiliate",
    }));

    roadmaps.forEach((r) => items.push({
      id: r.id, title: r.title,
      subtitle: `${r.difficulty} · ${r.estimatedTime}`,
      href: `/roadmaps/${r.slug}`,
      type: "roadmap",
    }));

    blogs
      .filter((b) => b.status === "approved")
      .forEach((b) => items.push({
        id: b.id, title: b.title,
        subtitle: `By ${(b as any).authorName || (b as any).author?.name || "Community"}`,
        href: `/blogs/${b.slug}`,
        type: "blog",
      }));

    topics.forEach((t) => {
      t.lessons.forEach((l) => items.push({
        id: l.id, title: l.title,
        subtitle: `${t.title} · Lesson`,
        href: `/knowledge-hub/${t.slug}/${l.slug}`,
        type: "knowledge",
      }));
    });

    return items;
  }, [digitalProducts, affiliateProducts, roadmaps, blogs, topics]);

  // ── Filter by query ──
  const filtered = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allResults
      .filter((r) => r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query, allResults]);

  // ── Group by type ──
  const grouped = React.useMemo(() => {
    const map: Partial<Record<ResultItem["type"], ResultItem[]>> = {};
    filtered.forEach((r) => {
      if (!map[r.type]) map[r.type] = [];
      map[r.type]!.push(r);
    });
    return map;
  }, [filtered]);

  const handleTagClick = (tag: string) => setQuery(tag);

  const handleResultClick = (item: ResultItem) => {
    onClose();
    if (item.type === "affiliate") {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  };

  const groupOrder: ResultItem["type"][] = ["product", "roadmap", "blog", "knowledge", "affiliate"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            className="fixed z-[61] top-[8%] left-4 right-4 sm:left-1/2 sm:right-auto sm:w-full sm:max-w-2xl sm:-translate-x-1/2 bg-[var(--card)] border border-[var(--card-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
          >
            {/* Search Input */}
            <div className="px-4 py-4 border-b border-[var(--border-color)] flex items-center gap-3 shrink-0">
              <Search className="text-[var(--text-muted)] shrink-0" size={20} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, roadmaps, blogs, lessons..."
                className="flex-1 bg-transparent border-none outline-none text-[var(--foreground)] placeholder:text-[var(--text-muted)] text-base"
              />
              {query && (
                <button onClick={() => setQuery("")} className="p-1.5 rounded-md hover:bg-[var(--alt-section)] text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">
                  <X size={16} />
                </button>
              )}
              <button onClick={onClose} className="px-2 py-1 bg-[var(--alt-section)] text-[var(--text-muted)] rounded-md text-xs font-bold tracking-widest hover:text-[var(--foreground)] transition-colors">
                ESC
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1">
              {!query ? (
                /* ── Default State: Trending Tags ── */
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={14} className="text-[var(--text-muted)]" />
                    <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Trending Tags</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--alt-section)] border border-[var(--border-color)] text-[var(--foreground)] rounded-full text-sm hover:border-[var(--foreground)] hover:text-[var(--background)] hover:bg-[var(--foreground)] transition-all"
                      >
                        <span className="text-[var(--text-muted)] text-xs">#</span>
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      { label: "Browse Store", href: "/store", icon: ShoppingBag, desc: `${digitalProducts.length} products` },
                      { label: "Roadmaps", href: "/roadmaps", icon: Target, desc: `${roadmaps.length} paths` },
                      { label: "Community Blogs", href: "/blogs", icon: FileText, desc: `${blogs.filter(b => b.status === "approved").length} articles` },
                      { label: "Knowledge Hub", href: "/knowledge-hub", icon: Lightbulb, desc: `${topics.length} topics` },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center gap-3 p-3 bg-[var(--alt-section)] rounded-xl border border-[var(--border-color)] hover:border-[var(--foreground)]/40 transition-all group"
                      >
                        <div className="w-8 h-8 bg-[var(--card)] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
                          <item.icon size={16} className="text-[var(--foreground)] group-hover:text-inherit" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--foreground)]">{item.label}</p>
                          <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                        </div>
                        <ArrowRight size={14} className="ml-auto text-[var(--text-muted)] group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filtered.length === 0 ? (
                /* ── No Results ── */
                <div className="py-16 text-center">
                  <Search size={32} className="mx-auto text-[var(--text-muted)] mb-3 opacity-40" />
                  <p className="text-[var(--foreground)] font-medium">No results for "{query}"</p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">Try a different keyword or browse a section below.</p>
                </div>
              ) : (
                /* ── Results Grouped by Type ── */
                <div className="p-3 space-y-4">
                  {groupOrder.map((type) => {
                    const items = grouped[type];
                    if (!items || items.length === 0) return null;
                    const meta = TYPE_META[type];
                    return (
                      <div key={type}>
                        <div className="flex items-center gap-2 px-2 mb-2">
                          <meta.icon size={12} className={meta.color} />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{meta.label}s</span>
                          <span className="ml-auto text-[10px] text-[var(--text-muted)]">{items.length}</span>
                        </div>
                        <div className="space-y-0.5">
                          {items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleResultClick(item)}
                              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[var(--alt-section)] transition-colors group text-left"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-7 h-7 rounded-md bg-[var(--alt-section)] flex items-center justify-center shrink-0 group-hover:bg-[var(--card)] transition-colors`}>
                                  <meta.icon size={14} className={meta.color} />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-[var(--foreground)] truncate group-hover:text-[var(--text-secondary)] transition-colors">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-[var(--text-muted)] truncate">{item.subtitle}</p>
                                </div>
                              </div>
                              {item.type === "affiliate" ? (
                                <ExternalLink size={13} className="text-[var(--text-muted)] shrink-0 ml-3" />
                              ) : (
                                <ArrowRight size={13} className="text-[var(--text-muted)] shrink-0 ml-3 group-hover:translate-x-0.5 transition-transform" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[var(--border-color)] flex items-center gap-4 text-xs text-[var(--text-muted)] shrink-0 bg-[var(--alt-section)]">
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-[var(--card)] border border-[var(--border-color)] rounded text-[10px]">↑↓</kbd> navigate</span>
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-[var(--card)] border border-[var(--border-color)] rounded text-[10px]">↵</kbd> select</span>
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-[var(--card)] border border-[var(--border-color)] rounded text-[10px]">ESC</kbd> close</span>
              <span className="ml-auto">{allResults.length} items indexed</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
