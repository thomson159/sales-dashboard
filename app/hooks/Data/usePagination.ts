import { useMemo } from 'react';
import { applyPagination } from '~/utils/pagination.utils';
import type { SaleArray } from '~/types/types';
import type { UsePaginationResult } from '~/types/hooks.types';

export const usePagination = (
  data: SaleArray,
  currentPage: number,
  pageSize: number,
): UsePaginationResult => {
  const dataLength: number = data.length;
  const totalPages: number = pageSize > 0 && dataLength > 0 ? Math.ceil(dataLength / pageSize) : 0;

  const pagedData: SaleArray = useMemo(
    () => applyPagination(data, currentPage, pageSize),
    [data, currentPage, pageSize],
  );

  return { pagedData, dataLength, totalPages };
};
