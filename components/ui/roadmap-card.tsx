"use client";

import Link from "next/link";
import { Target, Clock, ArrowRight } from "lucide-react";
import { Roadmap } from "@/lib/data/roadmaps";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  return (
    <Link 
      href={`/roadmaps/${roadmap.slug}`}
      className="group flex flex-col bg-[var(--card)] border border-[var(--card-border)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-[var(--alt-section)] rounded-lg flex items-center justify-center">
          <Target size={24} className="text-[var(--foreground)]" />
        </div>
        <Badge 
          className={
            roadmap.difficulty === "beginner" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
            roadmap.difficulty === "intermediate" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
            "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
          }
        >
          {roadmap.difficulty}
        </Badge>
      </div>
      
      <h3 className="font-bold text-xl text-[var(--foreground)] mb-2 group-hover:text-[#2563EB] transition-colors">{roadmap.title}</h3>
      
      <p className="text-[var(--text-secondary)] text-sm mb-6 flex-1 line-clamp-3">
        {roadmap.description}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-color)]">
        <span className="flex items-center text-sm font-medium text-[var(--text-muted)]">
          <Clock size={16} className="mr-1.5" /> {roadmap.estimatedTime}
        </span>
        <Button variant="ghost" className="p-0 hover:bg-transparent h-auto text-[var(--foreground)]">
          View <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Link>
  );
}
