import { useMemo } from 'react';
import { applyPagination } from '~/utils/pagination.utils';
import type { SaleArray } from '~/types/types';
import type { UsePaginationResult } from '~/types/hooks.types';

export const usePagination = (
  data: SaleArray,
  page: number,
  pageSize: number,
): UsePaginationResult => {
  const total = data.length;

  const totalPages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

  const pagedData: SaleArray = useMemo(
    () => applyPagination(data, page, pageSize),
    [data, page, pageSize],
  );

  return { pagedData, total, totalPages };
};
