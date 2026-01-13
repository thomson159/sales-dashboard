import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PageSizeState {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

export const usePageSizeStore = create<PageSizeState>()(
  persist(
    (set) => ({
      pageSize: 40,
      setPageSize: (pageSize) => set({ pageSize }),
    }),
    {
      name: 'dashboard-page-size',
    },
  ),
);
