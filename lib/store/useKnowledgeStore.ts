import { create } from "zustand";
import { persist } from "zustand/middleware";
import { KnowledgeTopic, KnowledgeLesson, MOCK_TOPICS } from "@/lib/data/knowledge";

interface KnowledgeStore {
  topics: KnowledgeTopic[];
  addTopic: (topic: Omit<KnowledgeTopic, "id">) => void;
  updateTopic: (id: string, fields: Partial<KnowledgeTopic>) => void;
  deleteTopic: (id: string) => void;
  addLesson: (topicId: string, lesson: Omit<KnowledgeLesson, "id">) => void;
  updateLesson: (topicId: string, lessonId: string, fields: Partial<KnowledgeLesson>) => void;
  deleteLesson: (topicId: string, lessonId: string) => void;
  getTopicBySlug: (slug: string) => KnowledgeTopic | undefined;
  getLessonBySlug: (topicSlug: string, lessonSlug: string) => KnowledgeLesson | undefined;
}

export const useKnowledgeStore = create<KnowledgeStore>()(
  persist(
    (set, get) => ({
      topics: MOCK_TOPICS,

      addTopic: (newTopic) =>
        set((s) => ({
          topics: [{ ...newTopic, id: `t${Date.now()}` }, ...s.topics],
        })),

      updateTopic: (id, fields) =>
        set((s) => ({
          topics: s.topics.map((t) => (t.id === id ? { ...t, ...fields } : t)),
        })),

      deleteTopic: (id) =>
        set((s) => ({ topics: s.topics.filter((t) => t.id !== id) })),

      addLesson: (topicId, newLesson) =>
        set((s) => ({
          topics: s.topics.map((t) =>
            t.id === topicId
              ? { ...t, lessons: [...t.lessons, { ...newLesson, id: `l${Date.now()}` }] }
              : t
          ),
        })),

      updateLesson: (topicId, lessonId, fields) =>
        set((s) => ({
          topics: s.topics.map((t) =>
            t.id === topicId
              ? {
                  ...t,
                  lessons: t.lessons.map((l) => (l.id === lessonId ? { ...l, ...fields } : l)),
                }
              : t
          ),
        })),

      deleteLesson: (topicId, lessonId) =>
        set((s) => ({
          topics: s.topics.map((t) =>
            t.id === topicId
              ? { ...t, lessons: t.lessons.filter((l) => l.id !== lessonId) }
              : t
          ),
        })),

      getTopicBySlug: (slug) => get().topics.find((t) => t.slug === slug),

      getLessonBySlug: (topicSlug, lessonSlug) => {
        const topic = get().topics.find((t) => t.slug === topicSlug);
        return topic?.lessons.find((l) => l.slug === lessonSlug);
      },
    }),
    { name: "progrys-knowledge-hub" }
  )
);
