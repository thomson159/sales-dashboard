import { create } from 'zustand';

export interface CurrentPageState {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

export const useCurrentPageStore = create<CurrentPageState>()((set) => ({
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),
}));
