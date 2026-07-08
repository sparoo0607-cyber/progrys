import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Roadmap, MOCK_ROADMAPS } from "@/lib/data/roadmaps";

interface RoadmapStore {
  roadmaps: Roadmap[];
  addRoadmap: (r: Omit<Roadmap, "id">) => void;
  updateRoadmap: (id: string, r: Partial<Roadmap>) => void;
  deleteRoadmap: (id: string) => void;
  getRoadmapBySlug: (slug: string) => Roadmap | undefined;
}

export const useRoadmapStore = create<RoadmapStore>()(
  persist(
    (set, get) => ({
      roadmaps: MOCK_ROADMAPS,
      
      addRoadmap: (newR) =>
        set((s) => ({ roadmaps: [{ ...newR, id: `r${Date.now()}` }, ...s.roadmaps] })),
        
      updateRoadmap: (id, fields) =>
        set((s) => ({
          roadmaps: s.roadmaps.map((r) => (r.id === id ? { ...r, ...fields } : r)),
        })),
        
      deleteRoadmap: (id) =>
        set((s) => ({ roadmaps: s.roadmaps.filter((r) => r.id !== id) })),
        
      getRoadmapBySlug: (slug) => {
        return get().roadmaps.find((r) => r.slug === slug);
      },
    }),
    { name: "progrys-roadmaps-store" }
  )
);
