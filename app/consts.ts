import type { Column, Fields } from './types/types';

export const STORAGE_KEY = 'sales-table-columns';
export const ROWS_INCREMENT = 10;
export const asc = 'asc';
export const desc = 'desc';
export const index = 'index';

export const COLUMNS: Column[] = [
  { key: index, label: 'Nr', sortable: false },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'channel_name', label: 'Name', sortable: true },
  { key: 'order_status_id', label: 'Status', sortable: true },
  { key: 'sum_sales', label: 'Sales', sortable: true },
  { key: 'count_orders', label: 'Orders', sortable: true },
];

export const FIELDS: Fields[] = [
  { label: 'Date', value: 'date' },
  { label: 'Name', value: 'channel_name' },
  { label: 'Status', value: 'order_status_id' },
  { label: 'Sales', value: 'sum_sales' },
  { label: 'Orders', value: 'count_orders' },
];

export const CHANNEL_MAP: Record<string, string> = {
  '[allegro-pl]': 'Allegro',
  '[shoper_rest]': 'Shoper',
  '[shopify_v2]': 'Shopify',
  '[presta]': 'Presta',
  '[ebay de]': 'eBay',
};

export const BLUE = '#3b82f6';

export const CHARTS_COLORS = [
  '#1e3a8a', // dark blue
  '#2563eb', // blue-600
  BLUE, // blue-500
  '#6366f1', // indigo-500
  '#ec4899', // pink-500
  '#fbbf24', // amber-400
  '#60a5fa', // blue-400
  '#93c5fd', // blue-300
];
