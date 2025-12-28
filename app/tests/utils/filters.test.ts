import type { Sale, Filters } from '~/types/types';
import { applyFilters, sanitizePageSizeInput, validatePageSize } from '~/utils/filters.utils';

describe('applyFilters', () => {
  const sales: Sale[] = [
    {
      channel_name: 'Amazon',
      date: '2025-01-01',
      order_status_id: 0,
      sum_sales: 0,
      count_orders: 0,
    },
    {
      channel_name: 'eBay',
      date: '2025-02-01',
      order_status_id: 0,
      sum_sales: 0,
      count_orders: 0,
    },
    {
      channel_name: 'Shopify',
      date: '2025-03-01',
      order_status_id: 0,
      sum_sales: 0,
      count_orders: 0,
    },
  ];

  it('filters by single channelName string', () => {
    const filters: Filters = { channelName: 'am' };
    const result = applyFilters(sales, filters);
    expect(result).toHaveLength(1);
    expect(result[0].channel_name).toBe('Amazon');
  });

  it('filters by multiple channelNames array', () => {
    const filters: Filters = { channelNames: ['ebay', 'shopify'] };
    const result = applyFilters(sales, filters);
    expect(result).toHaveLength(2);
    expect(result.map((s) => s.channel_name)).toEqual(expect.arrayContaining(['eBay', 'Shopify']));
  });

  it('filters by minDate', () => {
    const filters: Filters = { minDate: '2025-02-01' };
    const result = applyFilters(sales, filters);
    expect(result).toHaveLength(2);
    expect(result.every((s) => new Date(s.date) >= new Date(filters.minDate!))).toBe(true);
  });

  it('filters by maxDate', () => {
    const filters: Filters = { maxDate: '2025-02-01' };
    const result = applyFilters(sales, filters);
    expect(result).toHaveLength(2);
    expect(result.every((s) => new Date(s.date) <= new Date(filters.maxDate!))).toBe(true);
  });

  it('returns all if no filters are provided', () => {
    const filters: Filters = {};
    const result = applyFilters(sales, filters);
    expect(result).toHaveLength(3);
  });

  it('returns empty array if no sale matches', () => {
    const filters: Filters = { channelName: 'nonexistent' };
    const result = applyFilters(sales, filters);
    expect(result).toHaveLength(0);
  });
});

describe('sanitizePageSizeInput', () => {
  it('returns null for non-numeric input', () => {
    expect(sanitizePageSizeInput('abc')).toBeNull();
  });

  it('trims input exceeding maxLength', () => {
    expect(sanitizePageSizeInput('1234', 3)).toBe(123);
  });

  it('returns number for valid input', () => {
    expect(sanitizePageSizeInput('42')).toBe(42);
  });

  it('uses default maxLength 3 if not provided', () => {
    expect(sanitizePageSizeInput('1234')).toBe(123);
  });
});

describe('validatePageSize', () => {
  it('returns min if value is below min', () => {
    expect(validatePageSize(2, 5, 10)).toBe(5);
  });

  it('returns max if value is above max', () => {
    expect(validatePageSize(20, 5, 10)).toBe(10);
  });

  it('returns value if within range', () => {
    expect(validatePageSize(7, 5, 10)).toBe(7);
  });

  it('returns value equal to min or max correctly', () => {
    expect(validatePageSize(5, 5, 10)).toBe(5);
    expect(validatePageSize(10, 5, 10)).toBe(10);
  });
});
