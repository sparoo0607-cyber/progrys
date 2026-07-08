"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";
import { useKnowledgeStore } from "@/lib/store/useKnowledgeStore";

export default function KnowledgeHubPage() {
  const { topics } = useKnowledgeStore();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <AnimatedSection>
        <div className="mb-12">
          <Badge className="mb-4 bg-[#2563EB]/10 text-[#2563EB] border-transparent hover:bg-[#2563EB]/20">Interactive</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4 tracking-tight">Knowledge Hub</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Learn core concepts quickly. Read bite-sized lessons, copy snippets, and try code right in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map(topic => (
            <Link
              key={topic.id}
              href={`/knowledge-hub/${topic.slug}`}
              className="group bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-start"
            >
              <div className="w-12 h-12 bg-[var(--alt-section)] rounded-xl flex items-center justify-center mb-6 text-[var(--foreground)] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                <span className="font-bold text-lg">{topic.title.charAt(0)}</span>
              </div>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[#2563EB] transition-colors">{topic.title}</h2>
              <p className="text-[var(--text-secondary)] mb-8 flex-1">
                {topic.description}
              </p>

              <div className="flex items-center text-sm font-medium text-[var(--text-muted)] mt-auto pt-4 border-t border-[var(--border-color)] w-full">
                {topic.lessons.length} Lessons
                <ArrowRight size={16} className="ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {topics.length === 0 && (
          <div className="text-center py-24 bg-[var(--alt-section)] border border-[var(--border-color)] rounded-2xl">
            <p className="text-[var(--text-muted)]">No topics available yet. Check back soon!</p>
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
