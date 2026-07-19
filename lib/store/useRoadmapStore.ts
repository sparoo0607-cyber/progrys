import { create } from "zustand";
import type { Roadmap } from "@/lib/data/roadmaps";

interface RoadmapStore {
  roadmaps: Roadmap[];
  isLoading: boolean;
  fetchRoadmaps: () => Promise<void>;
  addRoadmap: (r: Omit<Roadmap, "id">) => Promise<void>;
  updateRoadmap: (id: string, r: Partial<Roadmap>) => Promise<void>;
  deleteRoadmap: (id: string) => Promise<void>;
  getRoadmapBySlug: (slug: string) => Roadmap | undefined;
}

export const useRoadmapStore = create<RoadmapStore>((set, get) => ({
  roadmaps: [],
  isLoading: false,

  fetchRoadmaps: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/roadmaps");
      if (res.ok) {
        const data = await res.json();
        set({ roadmaps: data });
      }
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  addRoadmap: async (newR) => {
    try {
      const res = await fetch("/api/roadmaps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newR),
      });
      if (res.ok) {
        const data = await res.json();
        set((s) => ({ roadmaps: [data.roadmap, ...s.roadmaps] }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  updateRoadmap: async (id, fields) => {
    try {
      const res = await fetch(`/api/roadmaps/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        const data = await res.json();
        set((s) => ({
          roadmaps: s.roadmaps.map((r) => (r.id === id ? data.roadmap : r)),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  deleteRoadmap: async (id) => {
    try {
      const res = await fetch(`/api/roadmaps/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((s) => ({ roadmaps: s.roadmaps.filter((r) => r.id !== id) }));
      }
    } catch (err) {
      console.error(err);
    }
  },

  getRoadmapBySlug: (slug) => {
    return get().roadmaps.find((r) => r.slug === slug);
  },
}));
