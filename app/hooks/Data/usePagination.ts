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
  const totalPages: number = useMemo(() => {
    // VERY IMPORTANT TO HANDLE edge cases
    if (pageSize <= 0 || dataLength <= 0) return 0;

    return Math.ceil(dataLength / pageSize);
  }, [dataLength, pageSize]);

  const pagedData: SaleArray = useMemo(
    () => applyPagination(data, currentPage, pageSize),
    [data, currentPage, pageSize],
  );

  return { pagedData, dataLength, totalPages };
};
