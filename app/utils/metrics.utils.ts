import type { Metrics, SaleArray } from '~/types/types';

export const calculateMetrics = (data: SaleArray): Metrics => {
  let totalRevenue = 0;
  let totalOrders = 0;

  for (const s of data) {
    totalRevenue += s.sum_sales;
    totalOrders += s.count_orders;
  }

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue: totalOrders ? totalRevenue / totalOrders : 0,
  };
};
