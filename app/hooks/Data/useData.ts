import { useCallback, useState } from 'react';
import type { Filters, Metrics, SaleArray, Sort, UseData } from '~/types/types';
import { useSource } from './useSource';
import { useFilters } from './useFilters';
import { useMetrics } from './useMetrics';
import { usePagination } from './usePagination';
import { useSort } from './useSort';
import type { UseSourceResult, UsePaginationResult } from '~/types/hooks.types';

export const useData = (): UseData => {
  const { data, loading }: UseSourceResult = useSource();
  const [filters, setFiltersState] = useState<Filters>({});
  const [sort, setSortState] = useState<Sort | undefined>(undefined);
  const [page, setPageState] = useState<number>(1);
  const [pageSize, setPageSizeState] = useState<number>(40);
  const filteredData: SaleArray = useFilters(data, filters);
  const sortedData: SaleArray = useSort(filteredData, sort);
  const metrics: Metrics = useMetrics(sortedData);
  const { pagedData, total, totalPages }: UsePaginationResult = usePagination(
    sortedData,
    page,
    pageSize,
  );

  const setPage = useCallback((p: number) => setPageState(p), []);
  const setPageSize = useCallback((s: number) => {
    setPageSizeState(s);
    setPageState(1);
  }, []);
  const setSort = useCallback((next?: Sort) => {
    setSortState(next);
    setPageState(1);
  }, []);
  const setFilters = useCallback((next: Filters) => {
    setFiltersState((prev) => ({ ...prev, ...next }));
    setPageState(1);
  }, []);

  return {
    data: pagedData,
    chartData: filteredData,
    loading,
    page,
    pageSize,
    total,
    totalPages,
    filters,
    setFilters,
    sort,
    setSort,
    setPage,
    setPageSize,
    ...metrics,
  };
};
