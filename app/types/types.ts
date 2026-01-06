import type { index } from '../consts';
import type { State } from './state.types';
import { type ChangeEvent, type MouseEvent } from 'react';

export type SaleArray = readonly Sale[];
export type SaleData = { data: SaleArray };

export type Sale = Readonly<{
  date: string;
  channel_name: string;
  order_status_id: number;
  sum_sales: number;
  count_orders: number;
}>;

export type SaleJson = Readonly<{
  channel_type: string;
}> &
  Sale;

export type Filters = Partial<State>;

export type Sort = Readonly<{
  field: keyof Sale;
  order: SortOrder;
}>;

export type Metrics = Readonly<{
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
}>;

export type UseData = Readonly<{
  data: SaleArray;
  chartData: SaleArray;
  loading: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  filters: Filters;
  sort?: Sort;
  setFilters: (next: Filters) => void;
  setSort: (next?: Sort) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}> &
  Metrics;

export type Column = Readonly<{ key: ColumnKey; label: string; sortable?: boolean }>;
export type Fields = Readonly<{ label: string; value: keyof Sale }>;

export type ColumnKey = keyof Sale | typeof index;
export type SortKey = keyof Sale | null;
export type SortOrder = 'asc' | 'desc';
export type Mouse = MouseEvent<HTMLButtonElement>;
export type Change = ChangeEvent<HTMLInputElement>;

export type SalesOverTimeItem = {
  date: string;
  revenue: number;
};

export type RevenuePerChannelItem = {
  channel: string;
  revenue: number;
};
