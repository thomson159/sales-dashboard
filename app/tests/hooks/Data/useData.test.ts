import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach, describe, it, expect } from 'vitest';
import * as SourceHook from '~/hooks/Data/useSource';
import * as FiltersHook from '~/hooks/Data/useFilters';
import * as SortHook from '~/hooks/Data/useSort';
import * as MetricsHook from '~/hooks/Data/useMetrics';
import * as PaginationHook from '~/hooks/Data/usePagination';
import { useData } from '~/hooks/Data/useData';
import type { Sale } from '~/types/types';
import { asc, desc } from '~/consts';

describe('useData full coverage', () => {
  const sampleData: Sale[] = [
    {
      date: '2025-01-01',
      channel_name: 'A',
      order_status_id: 1,
      sum_sales: 50,
      count_orders: 5,
    },
    {
      date: '2025-01-02',
      channel_name: 'B',
      order_status_id: 2,
      sum_sales: 30,
      count_orders: 3,
    },
    {
      date: '2025-01-03',
      channel_name: 'C',
      order_status_id: 3,
      sum_sales: 40,
      count_orders: 2,
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();

    vi.spyOn(SourceHook, 'useSource').mockReturnValue({
      data: sampleData,
      loading: false,
    });

    vi.spyOn(FiltersHook, 'useFilters').mockImplementation((data, filters) => {
      if (!filters.channelName) return data;
      return data.filter((d) => d.channel_name === filters.channelName);
    });

    vi.spyOn(SortHook, 'useSort').mockImplementation((data, sort) => {
      if (!sort) return data;
      const sorted = [...data].sort((a, b) => {
        const aValue = a[sort.field];
        const bValue = b[sort.field];

        if (aValue == null) return 1;
        if (bValue == null) return -1;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue;
        }

        return String(aValue).localeCompare(String(bValue));
      });
      return sort.order === asc ? sorted : sorted.reverse();
    });

    vi.spyOn(MetricsHook, 'useMetrics').mockImplementation((data) => {
      const totalRevenue = data.reduce((sum, d) => sum + d.sum_sales, 0);
      const totalOrders = data.reduce((sum, d) => sum + d.count_orders, 0);
      const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;
      return { totalRevenue, totalOrders, avgOrderValue };
    });

    vi.spyOn(PaginationHook, 'usePagination').mockImplementation((data, page, pageSize) => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const pagedData = data.slice(start, end);
      const total = data.length;
      const totalPages = Math.ceil(total / pageSize);
      return { pagedData, total, totalPages };
    });
  });

  it('initial state', () => {
    const { result } = renderHook(() => useData());
    expect(result.current.data).toEqual(sampleData);
    expect(result.current.chartData).toEqual(sampleData);
    expect(result.current.loading).toBe(false);
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(40);
    expect(result.current.filters).toEqual({});
    expect(result.current.sort).toBeUndefined();
    expect(result.current.total).toBe(3);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.totalRevenue).toBe(120);
    expect(result.current.totalOrders).toBe(10);
    expect(result.current.avgOrderValue).toBe(12);
  });

  it('setFilters updates correctly', () => {
    const { result } = renderHook(() => useData());
    act(() =>
      result.current.setFilters({
        channelName: 'A',
        minDate: '2024-09-01',
        maxDate: '2024-09-29',
        channelNames: [],
      }),
    );
    expect(result.current.filters).toEqual({
      channelName: 'A',
      minDate: '2024-09-01',
      maxDate: '2024-09-29',
      channelNames: [],
    });
    expect(result.current.data).toEqual([{ ...sampleData[0] }]);
    expect(result.current.page).toBe(1);
    expect(result.current.totalRevenue).toBe(50);
  });

  it('multiple filters merge', () => {
    const { result } = renderHook(() => useData());
    act(() =>
      result.current.setFilters({
        channelName: 'A',
        minDate: '2024-09-01',
        maxDate: '2024-09-29',
        channelNames: [],
      }),
    );
    act(() => result.current.setFilters({ minDate: '2025-01-01' }));
    expect(result.current.filters).toEqual({
      channelName: 'A',
      minDate: '2025-01-01',
      maxDate: '2024-09-29',
      channelNames: [],
    });
  });

  it('setSort ascending and descending', () => {
    const { result } = renderHook(() => useData());
    act(() => result.current.setSort({ field: 'sum_sales', order: asc }));
    expect(result.current.data.map((d) => d.sum_sales)).toEqual([30, 40, 50]);

    act(() => result.current.setSort({ field: 'sum_sales', order: desc }));
    expect(result.current.data.map((d) => d.sum_sales)).toEqual([50, 40, 30]);
  });

  it('pagination works', () => {
    const { result } = renderHook(() => useData());
    act(() => result.current.setPageSize(2));
    expect(result.current.data.length).toBe(2);
    expect(result.current.totalPages).toBe(2);

    act(() => result.current.setPage(2));
    expect(result.current.data.length).toBe(1);
  });

  it('empty dataset', () => {
    vi.spyOn(SourceHook, 'useSource').mockReturnValue({
      data: [],
      loading: false,
    });
    const { result } = renderHook(() => useData());
    expect(result.current.data).toEqual([]);
    expect(result.current.totalRevenue).toBe(0);
    expect(result.current.totalOrders).toBe(0);
    expect(result.current.avgOrderValue).toBe(0);
    expect(result.current.totalPages).toBe(0);
  });

  it('loading state propagates', () => {
    vi.spyOn(SourceHook, 'useSource').mockReturnValue({
      data: sampleData,
      loading: true,
    });
    const { result } = renderHook(() => useData());
    expect(result.current.loading).toBe(true);
  });
});
