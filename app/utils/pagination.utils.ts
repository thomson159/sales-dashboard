import type { SaleArray } from '~/types/types';

export const applyPagination = (
  data: SaleArray,
  currentPage: number,
  pageSize: number,
): SaleArray => {
  const safePage: number = Math.max(1, currentPage);
  const safePageSize: number = Math.max(1, pageSize);
  const start: number = (safePage - 1) * safePageSize;

  return data.slice(start, start + safePageSize);
};

export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  windowSize: number = 1,
): number[] => {
  const pages: number[] = [];
  const start = Math.max(1, currentPage - windowSize);
  const end = Math.min(totalPages, currentPage + windowSize);

  if (start > 1) pages.push(1);
  if (start > 2) pages.push(-1);

  for (let p = start; p <= end; p++) pages.push(p);

  if (end < totalPages - 1) pages.push(-1);
  if (end < totalPages) pages.push(totalPages);

  return pages;
};
