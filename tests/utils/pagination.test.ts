import type { Sale } from '~/types/types';
import { applyPagination } from '~/utils/pagination.utils';

describe('applyPagination', () => {
  const sampleData: Sale[] = [
    {
      sum_sales: 10,
      count_orders: 1,
      date: '',
      channel_name: '',
      order_status_id: 0,
    },
    {
      sum_sales: 20,
      count_orders: 2,
      date: '',
      channel_name: '',
      order_status_id: 0,
    },
    {
      sum_sales: 30,
      count_orders: 3,
      date: '',
      channel_name: '',
      order_status_id: 0,
    },
    {
      sum_sales: 40,
      count_orders: 4,
      date: '',
      channel_name: '',
      order_status_id: 0,
    },
    {
      sum_sales: 50,
      count_orders: 5,
      date: '',
      channel_name: '',
      order_status_id: 0,
    },
  ];

  it('should return the first page correctly', () => {
    const result = applyPagination(sampleData, 1, 2).map(({ sum_sales, count_orders }) => ({
      sum_sales,
      count_orders,
    }));
    expect(result).toEqual([
      { sum_sales: 10, count_orders: 1 },
      { sum_sales: 20, count_orders: 2 },
    ]);
  });

  it('should return the second page correctly', () => {
    const result = applyPagination(sampleData, 2, 2).map(({ sum_sales, count_orders }) => ({
      sum_sales,
      count_orders,
    }));
    expect(result).toEqual([
      { sum_sales: 30, count_orders: 3 },
      { sum_sales: 40, count_orders: 4 },
    ]);
  });

  it('should return remaining items if last page is not full', () => {
    const result = applyPagination(sampleData, 3, 2).map(({ sum_sales, count_orders }) => ({
      sum_sales,
      count_orders,
    }));
    expect(result).toEqual([{ sum_sales: 50, count_orders: 5 }]);
  });

  it('should return empty array if page is beyond data', () => {
    const result = applyPagination(sampleData, 4, 2);
    expect(result).toEqual([]);
  });

  it('should treat negative page and pageSize as 1', () => {
    const result = applyPagination(sampleData, -1, -5).map(({ sum_sales, count_orders }) => ({
      sum_sales,
      count_orders,
    }));
    expect(result).toEqual([{ sum_sales: 10, count_orders: 1 }]);
  });

  it('should handle pageSize larger than data length', () => {
    const result = applyPagination(sampleData, 1, 10).map(({ sum_sales, count_orders }) => ({
      sum_sales,
      count_orders,
    }));
    expect(result).toEqual([
      { sum_sales: 10, count_orders: 1 },
      { sum_sales: 20, count_orders: 2 },
      { sum_sales: 30, count_orders: 3 },
      { sum_sales: 40, count_orders: 4 },
      { sum_sales: 50, count_orders: 5 },
    ]);
  });

  it('should return empty array for empty data', () => {
    const result = applyPagination([], 1, 2);
    expect(result).toEqual([]);
  });
});
