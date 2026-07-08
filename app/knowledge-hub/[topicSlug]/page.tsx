"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookOpen, Code2 } from "lucide-react";
import { useKnowledgeStore } from "@/lib/store/useKnowledgeStore";

export default function TopicPage(props: { params: Promise<{ topicSlug: string }> }) {
  const params = React.use(props.params);
  const router = useRouter();
  const { getTopicBySlug } = useKnowledgeStore();
  const topic = getTopicBySlug(params.topicSlug);

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">Topic not found</h1>
        <Button onClick={() => router.push("/knowledge-hub")} variant="primary">Browse Knowledge Hub</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
      <AnimatedSection>
        <button onClick={() => router.push("/knowledge-hub")} className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors mb-8">
          <ArrowLeft size={16} /> Knowledge Hub
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="w-16 h-16 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-3xl font-bold text-[#2563EB]">{topic.title.charAt(0)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4 tracking-tight">{topic.title}</h1>
          <p className="text-xl text-[var(--text-secondary)]">{topic.description}</p>
          <p className="mt-3 text-sm text-[var(--text-muted)]">{topic.lessons.length} lessons</p>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {topic.lessons.map((lesson, idx) => (
            <Link
              key={lesson.id}
              href={`/knowledge-hub/${topic.slug}/${lesson.slug}`}
              className="group flex items-center gap-5 bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 hover:border-[#2563EB]/40 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--alt-section)] flex items-center justify-center text-sm font-bold text-[var(--text-muted)] group-hover:bg-[#2563EB] group-hover:text-white transition-colors shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[var(--foreground)] group-hover:text-[#2563EB] transition-colors">
                  {lesson.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <BookOpen size={12} /> Lesson
                  </span>
                  {lesson.codeExample && (
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Code2 size={12} /> Code example
                    </span>
                  )}
                  {lesson.tryItDefault && (
                    <Badge className="text-[10px] px-1.5 py-0 h-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-transparent">
                      Try it
                    </Badge>
                  )}
                </div>
              </div>
              <ArrowRight size={18} className="text-[var(--text-muted)] group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ))}

          {topic.lessons.length === 0 && (
            <div className="text-center py-16 bg-[var(--alt-section)] border border-[var(--border-color)] rounded-2xl">
              <p className="text-[var(--text-muted)]">No lessons in this topic yet.</p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
