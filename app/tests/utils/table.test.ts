import type { Sale, SortKey, SortOrder, ColumnKey } from '~/types/types';
import { asc } from '~/consts';
import { sortTableData } from '~/utils/table.utils';

describe('sortTableData', () => {
  const sampleData: Sale[] = [
    {
      sum_sales: 30,
      count_orders: 3,
      date: '2023-12-01',
      channel_name: 'X',
      order_status_id: 0,
    },
    {
      sum_sales: 10,
      count_orders: 1,
      date: '2023-12-03',
      channel_name: 'Y',
      order_status_id: 0,
    },
    {
      sum_sales: 20,
      count_orders: 2,
      date: '2023-12-02',
      channel_name: 'Z',
      order_status_id: 0,
    },
  ];

  it('should return original data if sortKey is not in visibleColumns', () => {
    const result = sortTableData(sampleData, 'sum_sales' as SortKey, asc, [
      'count_orders' as ColumnKey,
    ]);
    expect(result).toEqual(sampleData);
  });

  it('should return original data if sortKey is falsy', () => {
    const result = sortTableData(sampleData, '' as SortKey, asc, ['sum_sales' as ColumnKey]);
    expect(result).toEqual(sampleData);
  });

  it('should sort numeric values ascending', () => {
    const result = sortTableData(sampleData, 'sum_sales' as SortKey, asc, [
      'sum_sales' as ColumnKey,
    ]);
    expect(result.map((r) => r.sum_sales)).toEqual([10, 20, 30]);
  });

  it('should sort numeric values descending', () => {
    const result = sortTableData(sampleData, 'count_orders' as SortKey, 'desc' as SortOrder, [
      'count_orders' as ColumnKey,
    ]);
    expect(result.map((r) => r.count_orders)).toEqual([3, 2, 1]);
  });

  it('should sort string values ascending', () => {
    const result = sortTableData(sampleData, 'channel_name' as SortKey, asc, [
      'channel_name' as ColumnKey,
    ]);
    expect(result.map((r) => r.channel_name)).toEqual(['X', 'Y', 'Z']);
  });

  it('should sort string values descending', () => {
    const result = sortTableData(sampleData, 'date' as SortKey, 'desc' as SortOrder, [
      'date' as ColumnKey,
    ]);
    expect(result.map((r) => r.date)).toEqual(['2023-12-03', '2023-12-02', '2023-12-01']);
  });

  it('should not mutate original array', () => {
    const copy = [...sampleData];
    sortTableData(sampleData, 'sum_sales' as SortKey, asc, ['sum_sales' as ColumnKey]);
    expect(sampleData).toEqual(copy);
  });
});
