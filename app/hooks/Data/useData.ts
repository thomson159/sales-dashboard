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
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<Sort | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(40);
  const filteredData: SaleArray = useFilters(data, filters);
  const sortedData: SaleArray = useSort(filteredData, sort);
  const metrics: Metrics = useMetrics(sortedData);
  const { pagedData, dataLength, totalPages }: UsePaginationResult = usePagination(
    sortedData,
    currentPage,
    pageSize,
  );

  const setCurrentPageCB = useCallback((p: number) => setCurrentPage(p), []);

  const setPageSizeCB = useCallback((s: number) => {
    setPageSize(s);
    setCurrentPage(1);
  }, []);

  const setSortCB = useCallback((next?: Sort) => {
    setSort(next);
    setCurrentPage(1);
  }, []);

  const setFiltersCB = useCallback((next: Filters) => {
    setFilters((prev) => ({ ...prev, ...next }));
    setCurrentPage(1);
  }, []);

  return {
    data: pagedData,
    chartData: filteredData,
    loading,
    currentPage,
    pageSize,
    dataLength,
    totalPages,
    filters,
    sort,
    setFilters: setFiltersCB,
    setSort: setSortCB,
    setCurrentPage: setCurrentPageCB,
    setPageSize: setPageSizeCB,
    ...metrics,
  };
};
