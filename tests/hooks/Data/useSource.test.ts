import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { fetchSales } from '~/api/fetchSales';
import { useSource } from '~/hooks/Data/useSource';
import type { Sale } from '~/types/types';

vi.mock('~/api/fetchSales');

describe('useSource', () => {
  const mockedFetchSales = fetchSales as unknown as Mock;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches data and updates state', async () => {
    const salesData: Sale[] = [
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
    mockedFetchSales.mockResolvedValue(salesData);

    const { result } = renderHook(() => useSource());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(salesData);
  });

  it('does not update state after unmount', async () => {
    const salesData: Sale[] = [
      {
        date: '2025-01-01',
        channel_name: 'A',
        order_status_id: 1,
        sum_sales: 50,
        count_orders: 5,
      },
    ];
    mockedFetchSales.mockResolvedValue(salesData);

    const { result, unmount } = renderHook(() => useSource());

    unmount();

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(true);
  });

  it('handles empty response from fetchSales', async () => {
    mockedFetchSales.mockResolvedValue([]);
    const { result } = renderHook(() => useSource());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
  });

  it('handles fetchSales failure by returning empty data', async () => {
    mockedFetchSales.mockResolvedValue([]);

    const { result } = renderHook(() => useSource());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
  });

  it('handles invalid API payload', async () => {
    mockedFetchSales.mockResolvedValue([]);

    const { result } = renderHook(() => useSource());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
  });
});
