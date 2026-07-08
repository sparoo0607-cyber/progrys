"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, ExternalLink, BookOpen, Layers, Users, Zap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { ProductCard } from "@/components/ui/product-card";
import { RoadmapCard } from "@/components/ui/roadmap-card";
import { useProductStore } from "@/lib/store/useProductStore";
import { MOCK_ROADMAPS } from "@/lib/data/roadmaps";

export default function Home() {
  const { products } = useProductStore();
  const featuredProducts = products.slice(0, 4);
  const trendingRoadmaps = MOCK_ROADMAPS.slice(0, 3);

  return (
    <div className="flex flex-col relative w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 container mx-auto px-4 flex flex-col items-center text-center overflow-hidden">
        {/* Apple-style background blur orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-brand)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none -z-10"></div>
        
        <AnimatedSection className="flex flex-col items-center max-w-5xl mx-auto">
          <Badge className="mb-8 bg-[var(--card)] text-[var(--color-brand)] border border-[var(--color-brand)]/20 px-4 py-1.5 rounded-full uppercase font-semibold tracking-widest text-[10px] shadow-sm shadow-[var(--color-brand)]/5">
            PROGRYS OS 2.0 IS LIVE
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-[-0.04em] text-[var(--foreground)] mb-6 leading-[1.05]">
            The operating system <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[var(--foreground)] to-[var(--text-muted)]">
              for ambitious students.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Stop switching between ten different tools. Premium roadmaps, world-class resources, and an elite knowledge hub—all perfectly integrated.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/store" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base h-12 px-8">
                Explore Ecosystem
              </Button>
            </Link>
            <Link href="/roadmaps" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full text-base h-12 px-8">
                View Roadmaps
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </section>



      {/* 3. ROADMAPS (The Journey) */}
      <section className="py-32 container mx-auto px-4 relative">
        <AnimatedSection className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-[var(--card)] border border-[var(--border-color)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Layers className="text-[var(--color-brand)]" size={28} />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--foreground)] mb-6 tracking-tight">Master any discipline.</h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Beautifully crafted, step-by-step roadmaps designed by industry experts. Track your progress, build real projects, and earn verifiable certificates.
          </p>
        </AnimatedSection>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingRoadmaps.map((roadmap) => (
            <StaggerItem key={roadmap.id}>
              <RoadmapCard roadmap={roadmap} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <div className="mt-16 text-center">
          <Link href="/roadmaps">
            <Button variant="ghost" className="gap-2 font-medium">
              View all learning paths <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* 4. RESOURCES / STORE */}
      <section className="py-32 bg-[var(--alt-section)] border-y border-[var(--border-color)]">
        <div className="container mx-auto px-4">
          <AnimatedSection className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-[var(--card)] text-[var(--foreground)] border border-[var(--border-color)] shadow-sm font-medium tracking-wide">
                Resource Ecosystem
              </Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--foreground)] tracking-tight mb-4">
                Tools that give you an unfair advantage.
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">
                Premium study kits, Notion templates, and cheat sheets designed to maximize your output.
              </p>
            </div>
            <Link href="/store" className="hidden md:flex">
              <Button variant="outline" className="rounded-2xl">Browse Store</Button>
            </Link>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. KNOWLEDGE HUB TEASER */}
      <section className="py-32 container mx-auto px-4 text-center">
        <AnimatedSection className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-[var(--foreground)] text-[var(--background)] border border-[var(--border-color)] px-4 py-1.5 rounded-full uppercase font-semibold tracking-widest text-[10px]">
            Knowledge Hub
          </Badge>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-[var(--foreground)] tracking-tight mb-8">
            Your second brain. <br className="hidden md:block" />
            Beautifully organized.
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12">
            A Notion-like interactive environment where you can explore concepts, run code snippets, and save bookmarks—all seamlessly synced.
          </p>
          
          <div className="relative mx-auto max-w-4xl rounded-[24px] border border-[var(--border-color)] bg-[var(--card)] shadow-2xl overflow-hidden group">
            {/* Mock Header */}
            <div className="h-14 border-b border-[var(--border-color)] flex items-center px-6 bg-[var(--alt-section)]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/20"></div>
              </div>
              <div className="mx-auto flex items-center gap-2 px-4 py-1.5 bg-[var(--card)] rounded-lg border border-[var(--border-color)] text-xs text-[var(--text-muted)] font-medium w-64 justify-center shadow-sm">
                <Search size={14} /> Search knowledge base...
              </div>
            </div>
            {/* Mock Content */}
            <div className="p-10 text-left bg-gradient-to-b from-[var(--card)] to-[var(--alt-section)] h-80 flex flex-col gap-6 relative">
              <div className="w-1/3 h-8 bg-[var(--border-color)]/60 rounded-md animate-pulse"></div>
              <div className="w-full h-4 bg-[var(--border-color)]/30 rounded mt-4"></div>
              <div className="w-5/6 h-4 bg-[var(--border-color)]/30 rounded"></div>
              <div className="w-4/6 h-4 bg-[var(--border-color)]/30 rounded"></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/90 to-transparent flex items-end justify-center pb-16 z-10 transition-transform duration-500 group-hover:pb-20">
                <Link href="/knowledge-hub">
                  <Button size="lg" className="shadow-xl px-10 h-14 text-lg">
                    Enter Knowledge Hub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>


      {/* 7. FINAL CTA */}
      <section className="py-40 container mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-[var(--foreground)] tracking-tight mb-8">
            Ready to upgrade?
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12">
            Join the next generation of ambitious students who are building their future with PROGRYS today.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-black/10 dark:shadow-white/5 hover:shadow-black/20 dark:hover:shadow-white/10 transition-shadow">
              Create Free Account
            </Button>
          </Link>
        </AnimatedSection>
      </section>

    </div>
  );
}
