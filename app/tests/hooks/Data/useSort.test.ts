import { renderHook } from '@testing-library/react';
import type { Sale, Sort } from '~/types/types';
import { asc } from '~/consts';
import { useSort } from '~/hooks/Data/useSort';

describe('useSort', () => {
  const data: Sale[] = [
    {
      date: '2025-01-02',
      channel_name: 'B',
      order_status_id: 2,
      sum_sales: 30,
      count_orders: 3,
    },
    {
      date: '2025-01-01',
      channel_name: 'A',
      order_status_id: 1,
      sum_sales: 50,
      count_orders: 5,
    },
    {
      date: '2025-01-03',
      channel_name: 'C',
      order_status_id: 3,
      sum_sales: 40,
      count_orders: 2,
    },
    {
      date: '2025-01-04',
      channel_name: 'D',
      order_status_id: 4,
      sum_sales: 20,
      count_orders: 1,
    },
  ];

  it('returns original data if sort is undefined', () => {
    const { result } = renderHook(() => useSort(data));
    expect(result.current).toEqual(data);
  });

  it('sorts by number field ascending', () => {
    const sort: Sort = { field: 'sum_sales', order: asc };
    const { result } = renderHook(() => useSort(data, sort));
    expect(result.current.map((d) => d.sum_sales)).toEqual([20, 30, 40, 50]);
  });

  it('sorts by number field descending', () => {
    const sort: Sort = { field: 'sum_sales', order: 'desc' };
    const { result } = renderHook(() => useSort(data, sort));
    expect(result.current.map((d) => d.sum_sales)).toEqual([50, 40, 30, 20]);
  });

  it('sorts by string field ascending', () => {
    const sort: Sort = { field: 'channel_name', order: asc };
    const { result } = renderHook(() => useSort(data, sort));
    expect(result.current.map((d) => d.channel_name)).toEqual(['A', 'B', 'C', 'D']);
  });

  it('sorts by string field descending', () => {
    const sort: Sort = { field: 'channel_name', order: 'desc' };
    const { result } = renderHook(() => useSort(data, sort));
    expect(result.current.map((d) => d.channel_name)).toEqual(['D', 'C', 'B', 'A']);
  });

  it('sorts by date ascending', () => {
    const sort: Sort = { field: 'date', order: asc };
    const { result } = renderHook(() => useSort(data, sort));
    expect(result.current.map((d) => d.date)).toEqual([
      '2025-01-01',
      '2025-01-02',
      '2025-01-03',
      '2025-01-04',
    ]);
  });

  it('sorts by date descending', () => {
    const sort: Sort = { field: 'date', order: 'desc' };
    const { result } = renderHook(() => useSort(data, sort));
    expect(result.current.map((d) => d.date)).toEqual([
      '2025-01-04',
      '2025-01-03',
      '2025-01-02',
      '2025-01-01',
    ]);
  });
});
