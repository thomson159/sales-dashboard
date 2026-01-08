import { renderHook } from '@testing-library/react';
import { applyFilters } from '~/utils/filters.utils';
import type { Sale, Filters } from '~/types/types';
import type { MockedFunction } from 'vitest';
import { useFilters } from '~/hooks/Data/useFilters';

vi.mock('~/utils/filters.utils');

describe('useFilters', () => {
  const mockedApplyFilters = applyFilters as MockedFunction<typeof applyFilters>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns empty array for empty data', () => {
    mockedApplyFilters.mockReturnValue([]);
    const filters: Filters = {};
    const { result } = renderHook(() => useFilters([], filters));
    expect(result.current).toEqual([]);
    expect(mockedApplyFilters).toHaveBeenCalledWith([], filters);
  });

  it('returns all data if filters are empty', () => {
    const data: Sale[] = [
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
    ];
    mockedApplyFilters.mockReturnValue(data);
    const filters: Filters = {};
    const { result } = renderHook(() => useFilters(data, filters));
    expect(result.current).toEqual(data);
    expect(mockedApplyFilters).toHaveBeenCalledWith(data, filters);
  });

  it('applies channelName filter correctly', () => {
    const data: Sale[] = [
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
    ];
    const filteredData: Sale[] = [data[0]];
    const filters: Filters = { channelName: 'A' };
    mockedApplyFilters.mockReturnValue(filteredData);

    const { result } = renderHook(() => useFilters(data, filters));
    expect(result.current).toEqual(filteredData);
    expect(mockedApplyFilters).toHaveBeenCalledWith(data, filters);
  });

  it('does not recalculate if data and filters references do not change', () => {
    const data: Sale[] = [
      {
        date: '2025-01-01',
        channel_name: 'A',
        order_status_id: 1,
        sum_sales: 50,
        count_orders: 5,
      },
    ];
    const filters: Filters = {};
    mockedApplyFilters.mockReturnValue(data);

    const { result, rerender } = renderHook(({ sales, f }) => useFilters(sales, f), {
      initialProps: { sales: data, f: filters },
    });

    expect(result.current).toEqual(data);
    expect(mockedApplyFilters).toHaveBeenCalledTimes(1);

    rerender({ sales: data, f: filters });
    expect(result.current).toEqual(data);
    expect(mockedApplyFilters).toHaveBeenCalledTimes(1);
  });

  it('recalculates if data or filters reference changes', () => {
    const data1: Sale[] = [
      {
        date: '2025-01-01',
        channel_name: 'A',
        order_status_id: 1,
        sum_sales: 50,
        count_orders: 5,
      },
    ];
    const data2: Sale[] = [
      {
        date: '2025-01-02',
        channel_name: 'B',
        order_status_id: 2,
        sum_sales: 30,
        count_orders: 3,
      },
    ];
    const filters1: Filters = {};
    const filters2: Filters = { channelName: 'B' };

    mockedApplyFilters.mockReturnValueOnce(data1).mockReturnValueOnce(data2);

    const { result, rerender } = renderHook(({ sales, f }) => useFilters(sales, f), {
      initialProps: { sales: data1, f: filters1 },
    });

    expect(result.current).toEqual(data1);
    expect(mockedApplyFilters).toHaveBeenCalledTimes(1);

    rerender({ sales: data2, f: filters2 });
    expect(result.current).toEqual(data2);
    expect(mockedApplyFilters).toHaveBeenCalledTimes(2);
  });
});
