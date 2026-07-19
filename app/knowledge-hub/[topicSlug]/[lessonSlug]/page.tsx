"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Copy, Check, Play } from "lucide-react";
import { useKnowledgeStore } from "@/lib/store/useKnowledgeStore";

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative rounded-xl overflow-hidden border border-[var(--border-color)]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#111111] border-b border-[#27272A]">
        <span className="text-xs text-[#71717A] font-mono">code example</span>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs text-[#71717A] hover:text-white transition-colors">
          {copied ? <><Check size={12} className="text-green-400" /> Copied!</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <pre className="bg-[#0A0A0A] text-green-400 text-sm font-mono p-5 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function LessonPage(props: { params: Promise<{ topicSlug: string; lessonSlug: string }> }) {
  const params = React.use(props.params);
  const router = useRouter();
  const { getTopicBySlug, getLessonBySlug, fetchTopics } = useKnowledgeStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    fetchTopics();
    setMounted(true);
  }, [fetchTopics]);

  const topic = getTopicBySlug(params.topicSlug);
  const lesson = getLessonBySlug(params.topicSlug, params.lessonSlug);

  if (!mounted) return null;

  if (!topic || !lesson) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">Lesson not found</h1>
        <Button onClick={() => router.push("/knowledge-hub")} variant="primary">Browse Knowledge Hub</Button>
      </div>
    );
  }

  const lessonIndex = topic.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = topic.lessons[lessonIndex - 1];
  const nextLesson = topic.lessons[lessonIndex + 1];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <AnimatedSection>
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-10">
            <Link href="/knowledge-hub" className="hover:text-[var(--foreground)] transition-colors">Knowledge Hub</Link>
            <span>/</span>
            <Link href={`/knowledge-hub/${topic.slug}`} className="hover:text-[var(--foreground)] transition-colors">{topic.title}</Link>
            <span>/</span>
            <span className="text-[var(--foreground)] font-medium">{lesson.title}</span>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex gap-1.5">
              {topic.lessons.map((l, i) => (
                <div
                  key={l.id}
                  className={`h-1.5 rounded-full transition-all ${
                    i === lessonIndex
                      ? "w-8 bg-[var(--foreground)]"
                      : i < lessonIndex
                      ? "w-3 bg-[var(--foreground)]/40"
                      : "w-3 bg-[var(--border-color)]"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[var(--text-muted)]">
              {lessonIndex + 1} / {topic.lessons.length}
            </span>
          </div>

          {/* Lesson Header */}
          <header className="mb-10">
            <Badge className="mb-4 bg-[var(--foreground)]/10 text-[var(--foreground)] border-transparent">{topic.title}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
              {lesson.title}
            </h1>
          </header>

          {/* Explanation */}
          <div
            className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--foreground)] max-w-none mb-10 text-[var(--foreground)] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: lesson.explanationHtml }}
          />

          {/* Code Example */}
          {lesson.codeExample && (
            <div className="mb-10">
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">Code Example</h2>
              <CodeBlock code={lesson.codeExample} />
            </div>
          )}

          {/* Try It */}
          {lesson.tryItDefault && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[var(--foreground)]">Try It Yourself</h2>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-transparent gap-1">
                  <Play size={10} /> Interactive
                </Badge>
              </div>
              <div className="rounded-xl overflow-hidden border border-[var(--border-color)]">
                <div className="flex items-center px-4 py-2 bg-[#111111] border-b border-[#27272A]">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="ml-4 text-xs text-[#71717A] font-mono">editor</span>
                </div>
                <textarea
                  defaultValue={lesson.tryItDefault}
                  rows={8}
                  className="w-full bg-[#0A0A0A] text-green-400 text-sm font-mono p-5 focus:outline-none resize-y"
                />
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Edit the code above and paste it in a live environment (e.g. CodeSandbox, StackBlitz) to see it in action.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between gap-4 pt-8 border-t border-[var(--border-color)]">
            {prevLesson ? (
              <Link
                href={`/knowledge-hub/${topic.slug}/${prevLesson.slug}`}
                className="flex items-center gap-3 px-5 py-3 bg-[var(--card)] border border-[var(--card-border)] rounded-xl hover:border-[var(--foreground)]/40 hover:-translate-x-0.5 transition-all group"
              >
                <ArrowLeft size={16} className="text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition-colors" />
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Previous</p>
                  <p className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors">{prevLesson.title}</p>
                </div>
              </Link>
            ) : (
              <Link
                href={`/knowledge-hub/${topic.slug}`}
                className="flex items-center gap-3 px-5 py-3 bg-[var(--card)] border border-[var(--card-border)] rounded-xl hover:border-[var(--foreground)]/40 transition-all group"
              >
                <ArrowLeft size={16} className="text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition-colors" />
                <p className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors">Back to {topic.title}</p>
              </Link>
            )}

            {nextLesson ? (
              <Link
                href={`/knowledge-hub/${topic.slug}/${nextLesson.slug}`}
                className="flex items-center gap-3 px-5 py-3 bg-[var(--foreground)] text-white rounded-xl hover:bg-[var(--text-secondary)] hover:translate-x-0.5 transition-all group ml-auto"
              >
                <div className="text-right">
                  <p className="text-xs text-white/70">Next lesson</p>
                  <p className="text-sm font-medium">{nextLesson.title}</p>
                </div>
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                href={`/knowledge-hub/${topic.slug}`}
                className="flex items-center gap-3 px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all ml-auto"
              >
                <div className="text-right">
                  <p className="text-xs text-white/80">All done!</p>
                  <p className="text-sm font-medium">Complete Topic</p>
                </div>
                <Check size={16} />
              </Link>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
