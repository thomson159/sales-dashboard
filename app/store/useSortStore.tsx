import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SortOr, Sort } from '~/types/types';

export interface SortState {
  sort: SortOr;
  setSort: (sort?: Sort) => void;
}

export const useSortStore = create<SortState>()(
  persist(
    (set) => ({
      sort: undefined,
      setSort: (sort) => set({ sort }),
    }),
    {
      name: 'dashboard-sort',
    },
  ),
);
