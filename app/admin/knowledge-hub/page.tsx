"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  Plus, Search, Edit2, Trash2, Lightbulb, ChevronDown, ChevronRight,
  BookOpen, Code2, X, GripVertical
} from "lucide-react";
import { useKnowledgeStore } from "@/lib/store/useKnowledgeStore";
import { KnowledgeTopic, KnowledgeLesson } from "@/lib/data/knowledge";
import { toast } from "sonner";

type ModalMode = "add-topic" | "edit-topic" | "add-lesson" | "edit-lesson";

export default function KnowledgeHubAdminPage() {
  const {
    topics, addTopic, updateTopic, deleteTopic,
    addLesson, updateLesson, deleteLesson,
  } = useKnowledgeStore();

  const [search, setSearch] = React.useState("");
  const [expandedTopics, setExpandedTopics] = React.useState<Set<string>>(new Set());
  const [modalMode, setModalMode] = React.useState<ModalMode | null>(null);
  const [activeTopic, setActiveTopic] = React.useState<KnowledgeTopic | null>(null);
  const [activeLesson, setActiveLesson] = React.useState<KnowledgeLesson | null>(null);

  const [topicForm, setTopicForm] = React.useState({ title: "", description: "", slug: "", iconName: "Lightbulb" });
  const [lessonForm, setLessonForm] = React.useState({ title: "", slug: "", explanationHtml: "", codeExample: "", tryItDefault: "" });

  const filtered = topics.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  const toggleExpand = (id: string) =>
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // ── Topic handlers ──
  const openAddTopic = () => {
    setTopicForm({ title: "", description: "", slug: "", iconName: "Lightbulb" });
    setModalMode("add-topic");
  };
  const openEditTopic = (topic: KnowledgeTopic) => {
    setActiveTopic(topic);
    setTopicForm({ title: topic.title, description: topic.description, slug: topic.slug, iconName: topic.iconName });
    setModalMode("edit-topic");
  };
  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = topicForm.slug || topicForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    if (modalMode === "add-topic") {
      addTopic({ ...topicForm, slug, lessons: [] });
      toast.success("Topic created!");
    } else if (activeTopic) {
      updateTopic(activeTopic.id, { ...topicForm, slug });
      toast.success("Topic updated!");
    }
    setModalMode(null);
  };

  // ── Lesson handlers ──
  const openAddLesson = (topic: KnowledgeTopic) => {
    setActiveTopic(topic);
    setLessonForm({ title: "", slug: "", explanationHtml: "", codeExample: "", tryItDefault: "" });
    setModalMode("add-lesson");
  };
  const openEditLesson = (topic: KnowledgeTopic, lesson: KnowledgeLesson) => {
    setActiveTopic(topic);
    setActiveLesson(lesson);
    setLessonForm({ title: lesson.title, slug: lesson.slug, explanationHtml: lesson.explanationHtml, codeExample: lesson.codeExample, tryItDefault: lesson.tryItDefault || "" });
    setModalMode("edit-lesson");
  };
  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTopic) return;
    const slug = lessonForm.slug || lessonForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    if (modalMode === "add-lesson") {
      addLesson(activeTopic.id, { ...lessonForm, slug });
      toast.success("Lesson added!");
    } else if (activeLesson) {
      updateLesson(activeTopic.id, activeLesson.id, { ...lessonForm, slug });
      toast.success("Lesson updated!");
    }
    setModalMode(null);
  };

  return (
    <AnimatedSection>
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Knowledge Hub</h1>
          <p className="text-[var(--text-secondary)]">Manage topics, lessons, and code snippets.</p>
        </div>
        <Button variant="primary" className="gap-2 h-10" onClick={openAddTopic}>
          <Plus size={16} /> Add Topic
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search topics..."
          className="w-full pl-9 pr-3 py-2 bg-[var(--card)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
        />
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-16 text-center text-[var(--text-muted)]">
            No topics found.
          </div>
        )}

        {filtered.map((topic) => {
          const isExpanded = expandedTopics.has(topic.id);
          return (
            <div key={topic.id} className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl shadow-sm overflow-hidden">
              {/* Topic Row */}
              <div className="flex items-center gap-4 px-6 py-4 group">
                <button onClick={() => toggleExpand(topic.id)} className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">
                  {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
                <div className="w-10 h-10 rounded-xl bg-[var(--alt-section)] border border-[var(--border-color)] flex items-center justify-center shrink-0">
                  <Lightbulb size={18} className="text-[#2563EB]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[var(--foreground)]">{topic.title}</p>
                  <p className="text-sm text-[var(--text-muted)] truncate">{topic.description}</p>
                </div>
                <Badge className="bg-[var(--alt-section)] text-[var(--foreground)] border-transparent shrink-0">
                  {topic.lessons.length} lessons
                </Badge>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openAddLesson(topic)} className="p-1.5 text-[var(--text-secondary)] hover:text-[#2563EB] bg-[var(--alt-section)] rounded-md border border-[var(--border-color)]" title="Add Lesson">
                    <Plus size={14} />
                  </button>
                  <button onClick={() => openEditTopic(topic)} className="p-1.5 text-[var(--text-secondary)] hover:text-[#2563EB] bg-[var(--alt-section)] rounded-md border border-[var(--border-color)]">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => { if (window.confirm(`Delete topic "${topic.title}" and all its lessons?`)) { deleteTopic(topic.id); toast.success("Topic deleted."); } }}
                    className="p-1.5 text-[var(--text-secondary)] hover:text-red-500 bg-[var(--alt-section)] rounded-md border border-[var(--border-color)]">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Lessons */}
              {isExpanded && (
                <div className="border-t border-[var(--border-color)] bg-[var(--alt-section)]">
                  {topic.lessons.length === 0 ? (
                    <div className="px-6 py-6 text-center text-sm text-[var(--text-muted)]">
                      No lessons yet.{" "}
                      <button onClick={() => openAddLesson(topic)} className="text-[#2563EB] hover:underline font-medium">Add the first lesson →</button>
                    </div>
                  ) : (
                    <div className="divide-y divide-[var(--border-color)]">
                      {topic.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center gap-4 px-8 py-3 group/lesson hover:bg-[var(--card)] transition-colors">
                          <GripVertical size={14} className="text-[var(--text-muted)] opacity-40 shrink-0" />
                          <BookOpen size={14} className="text-[var(--text-muted)] shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[var(--foreground)]">{lesson.title}</p>
                            <p className="text-xs text-[var(--text-muted)]">/{lesson.slug}</p>
                          </div>
                          {lesson.codeExample && (
                            <span title="Has code example" className="shrink-0 flex">
                              <Code2 size={14} className="text-[var(--text-muted)]" />
                            </span>
                          )}
                          <div className="flex gap-2 opacity-0 group-hover/lesson:opacity-100 transition-opacity">
                            <button onClick={() => openEditLesson(topic, lesson)} className="p-1.5 text-[var(--text-secondary)] hover:text-[#2563EB] bg-[var(--card)] rounded-md border border-[var(--border-color)]">
                              <Edit2 size={12} />
                            </button>
                            <button onClick={() => { if (window.confirm(`Delete lesson "${lesson.title}"?`)) { deleteLesson(topic.id, lesson.id); toast.success("Lesson deleted."); } }}
                              className="p-1.5 text-[var(--text-secondary)] hover:text-red-500 bg-[var(--card)] rounded-md border border-[var(--border-color)]">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="px-8 py-3 border-t border-[var(--border-color)]">
                    <button onClick={() => openAddLesson(topic)} className="flex items-center gap-2 text-sm text-[#2563EB] hover:text-[#1d4ed8] font-medium transition-colors">
                      <Plus size={14} /> Add Lesson
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Topic Modal ── */}
      <Modal isOpen={modalMode === "add-topic" || modalMode === "edit-topic"} onClose={() => setModalMode(null)}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
            {modalMode === "add-topic" ? "New Topic" : "Edit Topic"}
          </h2>
          <form onSubmit={handleTopicSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Title</label>
              <Input required value={topicForm.title} onChange={(e) => setTopicForm({ ...topicForm, title: e.target.value })} placeholder="e.g. React Basics" className="w-full bg-[var(--input-bg)]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Description</label>
              <textarea required rows={2} value={topicForm.description} onChange={(e) => setTopicForm({ ...topicForm, description: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[#2563EB] resize-none" placeholder="Short description..." />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
              <Button type="button" variant="ghost" onClick={() => setModalMode(null)}>Cancel</Button>
              <Button type="submit" variant="primary">{modalMode === "add-topic" ? "Create Topic" : "Save Changes"}</Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* ── Lesson Modal ── */}
      <Modal isOpen={modalMode === "add-lesson" || modalMode === "edit-lesson"} onClose={() => setModalMode(null)}>
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wider mb-1">
              {activeTopic?.title}
            </p>
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              {modalMode === "add-lesson" ? "New Lesson" : "Edit Lesson"}
            </h2>
          </div>

          <form onSubmit={handleLessonSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Lesson Title</label>
              <Input required value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} placeholder="e.g. What are Components?" className="w-full bg-[var(--input-bg)]" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Explanation (HTML supported)</label>
              <textarea required rows={5} value={lessonForm.explanationHtml} onChange={(e) => setLessonForm({ ...lessonForm, explanationHtml: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-sm font-mono text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[#2563EB] resize-y"
                placeholder="<p>Components are the building blocks...</p>" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Code Example</label>
              <textarea rows={5} value={lessonForm.codeExample} onChange={(e) => setLessonForm({ ...lessonForm, codeExample: e.target.value })}
                className="w-full px-3 py-2 bg-[#0A0A0A] text-green-400 border border-[var(--border-color)] rounded-md text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#2563EB] resize-y"
                placeholder="function Welcome(props) { ... }" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Try-It Default (optional)</label>
              <textarea rows={3} value={lessonForm.tryItDefault} onChange={(e) => setLessonForm({ ...lessonForm, tryItDefault: e.target.value })}
                className="w-full px-3 py-2 bg-[#0A0A0A] text-green-400 border border-[var(--border-color)] rounded-md text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#2563EB] resize-y"
                placeholder="export default function App() { ... }" />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)] sticky bottom-0 bg-[var(--card)] -mx-6 -mb-6 p-6">
              <Button type="button" variant="ghost" onClick={() => setModalMode(null)}>Cancel</Button>
              <Button type="submit" variant="primary">{modalMode === "add-lesson" ? "Add Lesson" : "Save Changes"}</Button>
            </div>
          </form>
        </div>
      </Modal>
    </AnimatedSection>
  );
}
