import type { Sale, SaleArray } from '~/types/types';

export const applyPagination = (data: SaleArray, currentPage: number, pageSize: number): Sale[] => {
  const safePage: number = Math.max(1, currentPage);
  const safePageSize: number = Math.max(1, pageSize);
  const start: number = (safePage - 1) * safePageSize;

  return data.slice(start, start + safePageSize);
};
