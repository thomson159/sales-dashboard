import { useMemo } from 'react';
import { applyPagination } from '~/utils/pagination.utils';
import type { SaleArray } from '~/types/types';
import type { UsePaginationResult } from '~/types/hooks.types';

export const usePagination = (
  data: SaleArray,
  page: number,
  pageSize: number,
): UsePaginationResult => {
  const total: number = data.length;
  const totalPages: number = useMemo(() => {
    // VERY IMPORTANT TO HANDLE edge cases
    if (pageSize <= 0 || total <= 0) return 0;

    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const safePage: number = Math.max(1, page);

  const pagedData: SaleArray = useMemo(
    () => applyPagination(data, safePage, pageSize),
    [data, safePage, pageSize],
  );

  return { pagedData, total, totalPages };
};
