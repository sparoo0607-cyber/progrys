import { create } from "zustand";
import type { KnowledgeTopic, KnowledgeLesson } from "@/lib/data/knowledge";

interface KnowledgeStore {
  topics: KnowledgeTopic[];
  isLoading: boolean;
  fetchTopics: () => Promise<void>;
  addTopic: (topic: Omit<KnowledgeTopic, "id">) => Promise<void>;
  updateTopic: (id: string, fields: Partial<KnowledgeTopic>) => Promise<void>;
  deleteTopic: (id: string) => Promise<void>;
  addLesson: (topicId: string, lesson: Omit<KnowledgeLesson, "id">) => Promise<void>;
  updateLesson: (topicId: string, lessonId: string, fields: Partial<KnowledgeLesson>) => Promise<void>;
  deleteLesson: (topicId: string, lessonId: string) => Promise<void>;
  getTopicBySlug: (slug: string) => KnowledgeTopic | undefined;
  getLessonBySlug: (topicSlug: string, lessonSlug: string) => KnowledgeLesson | undefined;
}

export const useKnowledgeStore = create<KnowledgeStore>((set, get) => ({
  topics: [],
  isLoading: false,

  fetchTopics: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/knowledge");
      if (res.ok) {
        const data = await res.json();
        set({ topics: data });
      }
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  addTopic: async (newTopic) => {
    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTopic),
      });
      if (res.ok) {
        const data = await res.json();
        set((s) => ({ topics: [data.topic, ...s.topics] }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  updateTopic: async (id, fields) => {
    try {
      const res = await fetch(`/api/knowledge/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        const data = await res.json();
        set((s) => ({
          topics: s.topics.map((t) => (t.id === id ? data.topic : t)),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  deleteTopic: async (id) => {
    try {
      const res = await fetch(`/api/knowledge/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((s) => ({ topics: s.topics.filter((t) => t.id !== id) }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  addLesson: async (topicId, newLesson) => {
    try {
      const res = await fetch(`/api/knowledge/${topicId}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLesson),
      });
      if (res.ok) {
        const data = await res.json();
        set((s) => ({
          topics: s.topics.map((t) =>
            t.id === topicId
              ? { ...t, lessons: [...t.lessons, data.lesson] }
              : t
          ),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  updateLesson: async (topicId, lessonId, fields) => {
    try {
      const res = await fetch(`/api/knowledge/${topicId}/lessons/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        const data = await res.json();
        set((s) => ({
          topics: s.topics.map((t) =>
            t.id === topicId
              ? {
                  ...t,
                  lessons: t.lessons.map((l) =>
                    l.id === lessonId ? data.lesson : l
                  ),
                }
              : t
          ),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  deleteLesson: async (topicId, lessonId) => {
    try {
      const res = await fetch(`/api/knowledge/${topicId}/lessons/${lessonId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((s) => ({
          topics: s.topics.map((t) =>
            t.id === topicId
              ? { ...t, lessons: t.lessons.filter((l) => l.id !== lessonId) }
              : t
          ),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  getTopicBySlug: (slug) => get().topics.find((t) => t.slug === slug),

  getLessonBySlug: (topicSlug, lessonSlug) => {
    const topic = get().topics.find((t) => t.slug === topicSlug);
    return topic?.lessons.find((l) => l.slug === lessonSlug);
  },
}));
