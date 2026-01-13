import { create } from 'zustand';

export interface PageSizeState {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

export const usePageSizeStore = create<PageSizeState>()((set) => ({
  pageSize: 40,
  setPageSize: (pageSize) => set({ pageSize }),
}));
