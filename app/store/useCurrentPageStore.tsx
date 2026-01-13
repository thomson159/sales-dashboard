import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CurrentPageState {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

export const useCurrentPageStore = create<CurrentPageState>()(
  persist(
    (set) => ({
      currentPage: 1,
      setCurrentPage: (currentPage) => set({ currentPage }),
    }),
    {
      name: 'dashboard-current-page',
    },
  ),
);
