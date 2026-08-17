"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { RoadmapCard } from "@/components/ui/roadmap-card";
import { useRoadmapStore } from "@/lib/store/useRoadmapStore";

export default function RoadmapsPage() {
  const { roadmaps, fetchRoadmaps } = useRoadmapStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    fetchRoadmaps();
    setMounted(true);
  }, [fetchRoadmaps]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <AnimatedSection>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4 tracking-tight">Roadmaps</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Curated, step-by-step learning paths to take you from beginner to job-ready. Track your progress along the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map(roadmap => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
