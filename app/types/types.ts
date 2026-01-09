import type { asc, desc, index } from '../consts';
import type { State } from './state.types';
import { type ChangeEvent, type MouseEvent } from 'react';

export type KeyOfSale = keyof Sale;
export type SaleArray = readonly Sale[];
export type SortOr = Sort | undefined;

export type Sale = Readonly<{
  date: string;
  channel_name: string;
  order_status_id: number;
  sum_sales: number;
  count_orders: number;
}>;

export type SaleData = Readonly<{ data: SaleArray }>;

export type Metrics = Readonly<{
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
}>;

export type OnChange = (value: number) => void;

export type UseData = Readonly<{
  data: SaleArray;
  chartData: SaleArray;
  loading: boolean;
  currentPage: number;
  pageSize: number;
  dataLength: number;
  totalPages: number;
  filters: Filters;
  sort?: Sort;
  setFilters: (next: Filters) => void;
  setSort: (next?: Sort) => void;
  setCurrentPage: OnChange;
  setPageSize: OnChange;
}> &
  Metrics;

export type Filters = Partial<State>;

export type Sort = Readonly<{
  field: KeyOfSale;
  order: SortOrder;
}>;

export type StringArray = readonly string[];
export type ColumnKeyArray = readonly ColumnKey[];
export type ColumnKey = KeyOfSale | typeof index;
export type SortOrder = typeof asc | typeof desc;

export type Column = Readonly<{ key: ColumnKey; label: string; sortable: boolean }>;

export type Mouse = MouseEvent<HTMLButtonElement>;
export type Change = ChangeEvent<HTMLInputElement>;

type Revenue = Readonly<{ revenue: number }>;
export type SalesOverTimeItem = Readonly<{ date: string }> & Revenue;
export type RevenuePerChannelItem = Readonly<{ channel: string }> & Revenue;

export type Fields = Readonly<{ label: string; value: KeyOfSale }>;
