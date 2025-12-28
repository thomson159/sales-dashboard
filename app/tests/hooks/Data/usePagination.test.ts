import { renderHook } from '@testing-library/react';
import type { MockedFunction } from 'vitest';
import { usePagination } from '~/hooks/Data/usePagination';
import type { Sale } from '~/types/types';
import { applyPagination } from '~/utils/pagination.utils';

vi.mock('~/utils/pagination.utils');

describe('usePagination', () => {
  const mockedApplyPagination = applyPagination as MockedFunction<typeof applyPagination>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns correct values for empty data', () => {
    mockedApplyPagination.mockReturnValue([]);

    const { result } = renderHook(() => usePagination([], 1, 10));

    expect(result.current.pagedData).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.totalPages).toBe(0);
    expect(mockedApplyPagination).toHaveBeenCalledWith([], 1, 10);
  });

  it('returns all data if data length is less than pageSize', () => {
    const data: Sale[] = [
      {
        date: '2025-01-01',
        channel_name: 'A',
        order_status_id: 1,
        sum_sales: 50,
        count_orders: 5,
      },
    ];
    mockedApplyPagination.mockReturnValue(data);

    const { result } = renderHook(() => usePagination(data, 1, 10));

    expect(result.current.pagedData).toEqual(data);
    expect(result.current.total).toBe(1);
    expect(result.current.totalPages).toBe(1);
  });

  it('calculates correct totalPages when data length > pageSize', () => {
    const data: Sale[] = Array.from({ length: 25 }, (_, i) => ({
      date: `2025-01-${i + 1}`,
      channel_name: `A`,
      order_status_id: 1,
      sum_sales: i * 10,
      count_orders: i,
    }));
    mockedApplyPagination.mockReturnValue(data.slice(0, 10));

    const { result } = renderHook(() => usePagination(data, 1, 10));

    expect(result.current.pagedData).toHaveLength(10);
    expect(result.current.total).toBe(25);
    expect(result.current.totalPages).toBe(3);
  });

  it('returns empty pagedData if page is greater than totalPages', () => {
    const data: Sale[] = Array.from({ length: 5 }, (_, i) => ({
      date: `2025-01-${i + 1}`,
      channel_name: `A`,
      order_status_id: 1,
      sum_sales: i * 10,
      count_orders: i,
    }));
    mockedApplyPagination.mockReturnValue([]);

    const { result } = renderHook(() => usePagination(data, 2, 10));

    expect(result.current.pagedData).toEqual([]);
    expect(result.current.total).toBe(5);
    expect(result.current.totalPages).toBe(1);
  });

  it('calls applyPagination with correct arguments for different page and pageSize', () => {
    const data: Sale[] = Array.from({ length: 15 }, (_, i) => ({
      date: `2025-01-${i + 1}`,
      channel_name: `A`,
      order_status_id: 1,
      sum_sales: i * 10,
      count_orders: i,
    }));
    mockedApplyPagination.mockReturnValue(data.slice(5, 10));

    const { result } = renderHook(() => usePagination(data, 2, 5));

    expect(result.current.pagedData).toHaveLength(5);
    expect(result.current.total).toBe(15);
    expect(result.current.totalPages).toBe(3);
    expect(mockedApplyPagination).toHaveBeenCalledWith(data, 2, 5);
  });
});
