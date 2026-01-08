import type { Column, Fields } from './types/types';

export const slogan =
  'text-3xl font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse';

export const STORAGE_KEY = 'sales-table-columns';
export const ROWS_INCREMENT = 10;
export const asc = 'asc';
export const desc = 'desc';
export const index = 'index';

export const COLUMNS: Column[] = [
  { key: index, label: 'Nr', sortable: false },
  { key: 'date', label: '📅 Date', sortable: true },
  { key: 'channel_name', label: '🏷️ Name', sortable: true },
  { key: 'order_status_id', label: '📌 Status', sortable: true },
  { key: 'sum_sales', label: '💰 Sales', sortable: true },
  { key: 'count_orders', label: '📦 Orders', sortable: true },
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

export const BLUE = '#2563eb';

export const CHARTS_COLORS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  BLUE,
  '#7c3aed',
  '#db2777',
];
