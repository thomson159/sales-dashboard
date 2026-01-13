import { create } from 'zustand';
import type { SortOr, Sort } from '~/types/types';

export interface SortState {
  sort: SortOr;
  setSort: (sort?: Sort) => void;
}

export const useSortStore = create<SortState>()((set) => ({
  sort: undefined,
  setSort: (sort) => set({ sort }),
}));
