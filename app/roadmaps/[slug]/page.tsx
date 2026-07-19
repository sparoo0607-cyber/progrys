"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Target, CheckCircle2, Circle } from "lucide-react";
import { useRoadmapStore } from "@/lib/store/useRoadmapStore";

export default function RoadmapDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = React.use(props.params);
  const router = useRouter();
  const { getRoadmapBySlug, fetchRoadmaps } = useRoadmapStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    fetchRoadmaps();
    setMounted(true);
  }, [fetchRoadmaps]);
  
  const roadmap = getRoadmapBySlug(params.slug);

  if (!mounted) return null;

  if (!roadmap) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">Roadmap not found</h1>
        <p className="text-[var(--text-secondary)] mb-8">The learning path you are looking for does not exist.</p>
        <Button onClick={() => router.push("/roadmaps")} variant="primary">Browse Roadmaps</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <AnimatedSection>
        {/* Header */}
        <button 
          onClick={() => router.push("/roadmaps")} 
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Roadmaps
        </button>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge className={
              roadmap.difficulty === "beginner" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
              roadmap.difficulty === "intermediate" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
              "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
            }>
              {roadmap.difficulty.charAt(0).toUpperCase() + roadmap.difficulty.slice(1)}
            </Badge>
            <Badge className="bg-[var(--alt-section)] text-[var(--foreground)] flex items-center gap-1">
              <Clock size={12} /> {roadmap.estimatedTime}
            </Badge>
            <Badge className="bg-[var(--alt-section)] text-[var(--foreground)] flex items-center gap-1">
              <Target size={12} /> {roadmap.nodes.length} Steps
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-6 tracking-tight">
            {roadmap.title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            {roadmap.description}
          </p>
        </div>

        {/* Timeline / Nodes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">Curriculum</h2>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--border-color)] before:to-transparent">
            {roadmap.nodes.map((node, index) => (
              <div key={node.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                
                {/* Icon Marker */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--card)] border-4 border-[var(--background)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-[var(--text-muted)] group-hover:text-[#2563EB] group-hover:border-[#2563EB]/20 transition-all ml-0 md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>

                {/* Content Card */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-[var(--card)] border border-[var(--card-border)] shadow-sm group-hover:border-[#2563EB]/30 transition-colors ml-4 md:ml-0">
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{node.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{node.description}</p>
                </div>
                
              </div>
            ))}
          </div>
        </div>

      </AnimatedSection>
    </div>
  );
}
