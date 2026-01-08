import { renderHook } from '@testing-library/react';
import { calculateMetrics } from '~/utils/metrics.utils';
import type { Sale, Metrics } from '~/types/types';
import type { MockedFunction } from 'vitest';
import { useMetrics } from '~/hooks/Data/useMetrics';

vi.mock('~/utils/metrics.utils');

describe('useMetrics', () => {
  const mockedCalculateMetrics = calculateMetrics as MockedFunction<typeof calculateMetrics>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns metrics for empty data', () => {
    const metrics: Metrics = {
      totalRevenue: 0,
      totalOrders: 0,
      avgOrderValue: 0,
    };
    mockedCalculateMetrics.mockReturnValue(metrics);

    const { result } = renderHook(() => useMetrics([]));

    expect(result.current).toEqual(metrics);
    expect(mockedCalculateMetrics).toHaveBeenCalledWith([]);
  });

  it('returns metrics for non-empty data', () => {
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
    const metrics: Metrics = {
      totalRevenue: 80,
      totalOrders: 8,
      avgOrderValue: 10,
    };
    mockedCalculateMetrics.mockReturnValue(metrics);

    const { result } = renderHook(() => useMetrics(data));

    expect(result.current).toEqual(metrics);
    expect(mockedCalculateMetrics).toHaveBeenCalledWith(data);
  });

  it('does not recalculate metrics if data reference does not change', () => {
    const data: Sale[] = [
      {
        date: '2025-01-01',
        channel_name: 'A',
        order_status_id: 1,
        sum_sales: 50,
        count_orders: 5,
      },
    ];
    const metrics: Metrics = {
      totalRevenue: 50,
      totalOrders: 5,
      avgOrderValue: 10,
    };
    mockedCalculateMetrics.mockReturnValue(metrics);

    const { result, rerender } = renderHook(({ sales }) => useMetrics(sales), {
      initialProps: { sales: data },
    });

    expect(result.current).toEqual(metrics);
    expect(mockedCalculateMetrics).toHaveBeenCalledTimes(1);

    rerender({ sales: data });
    expect(result.current).toEqual(metrics);
    expect(mockedCalculateMetrics).toHaveBeenCalledTimes(1);
  });

  it('recalculates metrics if data reference changes', () => {
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
    const metrics1: Metrics = {
      totalRevenue: 50,
      totalOrders: 5,
      avgOrderValue: 10,
    };
    const metrics2: Metrics = {
      totalRevenue: 30,
      totalOrders: 3,
      avgOrderValue: 10,
    };

    mockedCalculateMetrics.mockReturnValueOnce(metrics1).mockReturnValueOnce(metrics2);

    const { result, rerender } = renderHook(({ sales }) => useMetrics(sales), {
      initialProps: { sales: data1 },
    });

    expect(result.current).toEqual(metrics1);
    expect(mockedCalculateMetrics).toHaveBeenCalledTimes(1);

    rerender({ sales: data2 });
    expect(result.current).toEqual(metrics2);
    expect(mockedCalculateMetrics).toHaveBeenCalledTimes(2);
  });
});
