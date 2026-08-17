import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  productIds: string[];
  blogIds: string[];
  roadmapIds: string[];
  lessonIds: string[];
  toggleProduct: (id: string) => void;
  toggleBlog: (id: string) => void;
  toggleRoadmap: (id: string) => void;
  toggleLesson: (id: string) => void;
  hasProduct: (id: string) => boolean;
  hasBlog: (id: string) => boolean;
  hasRoadmap: (id: string) => boolean;
  hasLesson: (id: string) => boolean;
}

const toggle = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: [],
      blogIds: [],
      roadmapIds: [],
      lessonIds: [],
      toggleProduct: (id) => set({ productIds: toggle(get().productIds, id) }),
      toggleBlog: (id) => set({ blogIds: toggle(get().blogIds, id) }),
      toggleRoadmap: (id) => set({ roadmapIds: toggle(get().roadmapIds, id) }),
      toggleLesson: (id) => set({ lessonIds: toggle(get().lessonIds, id) }),
      hasProduct: (id) => get().productIds.includes(id),
      hasBlog: (id) => get().blogIds.includes(id),
      hasRoadmap: (id) => get().roadmapIds.includes(id),
      hasLesson: (id) => get().lessonIds.includes(id),
    }),
    { name: "progrys-wishlist" }
  )
);
