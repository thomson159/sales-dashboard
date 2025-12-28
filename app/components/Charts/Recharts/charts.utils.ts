import type { SaleArray } from '~/types/types';
import { normalizeChannelName } from '~/utils/utils';

export type SalesOverTimeItem = {
  date: string;
  revenue: number;
};

export type RevenuePerChannelItem = {
  channel: string;
  revenue: number;
};

export const getSalesOverTime = (data: SaleArray): SalesOverTimeItem[] => {
  const salesMap = new Map<string, number>();

  for (let i = 0; i < data.length; i++) {
    const sale = data[i];
    if (!sale.date) continue;
    const date = sale.date.slice(0, 10);
    salesMap.set(date, (salesMap.get(date) || 0) + sale.sum_sales);
  }

  const result: SalesOverTimeItem[] = [];
  salesMap.forEach((revenue, date) => {
    result.push({ date, revenue });
  });

  result.sort((a, b) => a.date.localeCompare(b.date));

  return result;
};

export const getRevenuePerChannel = (data: SaleArray): RevenuePerChannelItem[] => {
  const channelsMap = new Map<string, number>();
  const normalizeCache = new Map<string, string>();

  const normalizeCached = (channel: string) => {
    if (!normalizeCache.has(channel)) {
      normalizeCache.set(channel, normalizeChannelName(channel));
    }
    return normalizeCache.get(channel)!;
  };

  for (let i = 0; i < data.length; i++) {
    const sale = data[i];
    const channelRaw = sale.channel_name?.trim() || 'other';
    channelsMap.set(channelRaw, (channelsMap.get(channelRaw) || 0) + sale.sum_sales);
  }

  const result: RevenuePerChannelItem[] = [];
  channelsMap.forEach((revenue, channelRaw) => {
    result.push({
      channel: normalizeCached(channelRaw),
      revenue,
    });
  });

  result.sort((a, b) => b.revenue - a.revenue);

  return result;
};
