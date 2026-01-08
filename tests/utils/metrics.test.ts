import type { Sale, Metrics } from '~/types/types';
import { calculateMetrics } from '~/utils/metrics.utils';

describe('calculateMetrics', () => {
  it('should calculate metrics correctly for normal data', () => {
    const data: Sale[] = [
      {
        sum_sales: 100,
        count_orders: 2,
        date: '',
        channel_name: '',
        order_status_id: 0,
      },
      {
        sum_sales: 200,
        count_orders: 4,
        date: '',
        channel_name: '',
        order_status_id: 0,
      },
    ];

    const result: Metrics = calculateMetrics(data);

    expect(result.totalRevenue).toBe(300);
    expect(result.totalOrders).toBe(6);
    expect(result.avgOrderValue).toBeCloseTo(50);
  });

  it('should return zero metrics for empty array', () => {
    const data: Sale[] = [];

    const result: Metrics = calculateMetrics(data);

    expect(result.totalRevenue).toBe(0);
    expect(result.totalOrders).toBe(0);
    expect(result.avgOrderValue).toBe(0);
  });

  it('should handle case with zero orders but some sales', () => {
    const data: Sale[] = [
      {
        sum_sales: 100,
        count_orders: 0,
        date: '',
        channel_name: '',
        order_status_id: 0,
      },
      {
        sum_sales: 50,
        count_orders: 0,
        date: '',
        channel_name: '',
        order_status_id: 0,
      },
    ];

    const result: Metrics = calculateMetrics(data);

    expect(result.totalRevenue).toBe(150);
    expect(result.totalOrders).toBe(0);
    expect(result.avgOrderValue).toBe(0);
  });

  it('should handle negative sales and orders', () => {
    const data: Sale[] = [
      {
        sum_sales: -100,
        count_orders: -2,
        date: '',
        channel_name: '',
        order_status_id: 0,
      },
      {
        sum_sales: 50,
        count_orders: 1,
        date: '',
        channel_name: '',
        order_status_id: 0,
      },
    ];

    const result: Metrics = calculateMetrics(data);

    expect(result.totalRevenue).toBe(-50);
    expect(result.totalOrders).toBe(-1);
    expect(result.avgOrderValue).toBe(50);
  });

  it('should handle large numbers', () => {
    const data: Sale[] = [
      {
        sum_sales: 1e9,
        count_orders: 1e6,
        date: '',
        channel_name: '',
        order_status_id: 0,
      },
      {
        sum_sales: 2e9,
        count_orders: 2e6,
        date: '',
        channel_name: '',
        order_status_id: 0,
      },
    ];

    const result: Metrics = calculateMetrics(data);

    expect(result.totalRevenue).toBe(3e9);
    expect(result.totalOrders).toBe(3e6);
    expect(result.avgOrderValue).toBeCloseTo(1000);
  });
});
