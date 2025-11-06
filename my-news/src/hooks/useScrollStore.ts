import { create } from "zustand";

interface ScrollStore {
  positions: Record<string, number>;
  savePosition: (path: string, pos: number) => void;
  getPosition: (path: string) => number;
}

export const useScrollStore = create<ScrollStore>((set, get) => ({
  positions: {},
  savePosition: (path, pos) =>
    set((state) => ({ positions: { ...state.positions, [path]: pos } })),
  getPosition: (path) => get().positions[path] || 0,
}));