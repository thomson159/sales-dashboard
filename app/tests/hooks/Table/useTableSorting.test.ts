import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTableSorting } from '~/hooks/Table/useTableSorting';
import { asc, desc } from '~/consts';
import type { Sale, ColumnKey, SortKey } from '~/types/types';
import * as tableUtils from '~/utils/table.utils';
import { act, renderHook } from '@testing-library/react';

describe('useTableSorting', () => {
  let data: Sale[];
  let visibleColumns: ColumnKey[];

  beforeEach(() => {
    data = [
      { date: '2025-01-01', channel_name: 'A', order_status_id: 1, sum_sales: 50, count_orders: 5 },
      { date: '2025-01-02', channel_name: 'B', order_status_id: 2, sum_sales: 30, count_orders: 3 },
      { date: '2025-01-03', channel_name: 'C', order_status_id: 1, sum_sales: 40, count_orders: 4 },
    ];
    visibleColumns = ['date', 'channel_name', 'order_status_id', 'sum_sales', 'count_orders'];
  });

  it('initializes with null sortKey and asc order', () => {
    const { result } = renderHook(() => useTableSorting(data, visibleColumns));
    expect(result.current.sortKey).toBeNull();
    expect(result.current.sortOrder).toBe(asc);
    expect(result.current.sortedData).toEqual(data);
  });

  it('calls sortTableData with correct parameters', () => {
    const spy = vi.spyOn(tableUtils, 'sortTableData');
    renderHook(() => useTableSorting(data, visibleColumns));
    expect(spy).toHaveBeenCalledWith(data, null, asc, visibleColumns);
  });

  it('sorts data by a new key ascending', () => {
    const { result } = renderHook(() => useTableSorting(data, visibleColumns));
    const key: SortKey = 'sum_sales';
    act(() => result.current.onSort(key));
    expect(result.current.sortKey).toBe(key);
    expect(result.current.sortOrder).toBe(asc);
    expect(result.current.sortedData.map((d) => d.sum_sales)).toEqual([30, 40, 50]);
  });

  it('toggles sortOrder when same key is clicked again', () => {
    const { result } = renderHook(() => useTableSorting(data, visibleColumns));
    const key: SortKey = 'sum_sales';
    act(() => result.current.onSort(key));
    act(() => result.current.onSort(key));
    expect(result.current.sortOrder).toBe(desc);
    expect(result.current.sortedData.map((d) => d.sum_sales)).toEqual([50, 40, 30]);
  });

  it('toggles sort order and resets on third click', () => {
    const { result } = renderHook(() => useTableSorting(data, visibleColumns));
    const key: SortKey = 'sum_sales';

    act(() => result.current.onSort(key));
    expect(result.current.sortKey).toBe(key);
    expect(result.current.sortOrder).toBe('asc');
    expect(result.current.sortedData).toEqual([...data].sort((a, b) => a.sum_sales - b.sum_sales));

    act(() => result.current.onSort(key));
    expect(result.current.sortKey).toBe(key);
    expect(result.current.sortOrder).toBe('desc');
    expect(result.current.sortedData).toEqual([...data].sort((a, b) => b.sum_sales - a.sum_sales));

    act(() => result.current.onSort(key));
    expect(result.current.sortKey).toBeNull();
    expect(result.current.sortOrder).toBe('asc');
    expect(result.current.sortedData).toEqual(data);
  });

  it('resets sortOrder to asc when new key is selected', () => {
    const { result } = renderHook(() => useTableSorting(data, visibleColumns));
    const key1: SortKey = 'sum_sales';
    const key2: SortKey = 'count_orders';
    act(() => result.current.onSort(key1));
    act(() => result.current.onSort(key1));
    act(() => result.current.onSort(key2));
    expect(result.current.sortKey).toBe(key2);
    expect(result.current.sortOrder).toBe(asc);
  });

  it('updates sortedData when sortKey or sortOrder changes', () => {
    const { result, rerender } = renderHook(({ d, cols }) => useTableSorting(d, cols), {
      initialProps: { d: data, cols: visibleColumns },
    });
    const key: SortKey = 'sum_sales';
    act(() => result.current.onSort(key));
    rerender({ d: data, cols: visibleColumns });
    expect(result.current.sortedData).toBeDefined();
  });

  it('reacts to changes in visibleColumns', () => {
    const { result, rerender } = renderHook(({ d, cols }) => useTableSorting(d, cols), {
      initialProps: { d: data, cols: visibleColumns },
    });
    const newColumns: ColumnKey[] = ['date', 'sum_sales'];
    rerender({ d: data, cols: newColumns });
    expect(result.current.sortedData).toBeDefined();
  });

  it('reacts to changes in data', () => {
    const { result, rerender } = renderHook(({ d, cols }) => useTableSorting(d, cols), {
      initialProps: { d: data, cols: visibleColumns },
    });
    const newData: Sale[] = [
      ...data,
      { date: '2025-01-04', channel_name: 'D', order_status_id: 2, sum_sales: 60, count_orders: 6 },
    ];
    rerender({ d: newData, cols: visibleColumns });
    expect(result.current.sortedData).toBeDefined();
    expect(result.current.sortedData.length).toBe(newData.length);
  });
});
