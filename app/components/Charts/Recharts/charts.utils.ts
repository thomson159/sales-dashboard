import type { RevenuePerChannelItem, Sale, SaleArray, SalesOverTimeItem } from '~/types/types';
import { normalizeChannelName } from '~/utils/utils';

export const getSalesOverTime = (data: SaleArray): SalesOverTimeItem[] => {
  const salesMap = new Map<string, number>();

  for (let i = 0; i < data.length; i++) {
    const sale: Sale = data[i];

    if (!sale.date) continue;

    const date: string = sale.date.slice(0, 10);

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

  const normalizeCached = (channel: string): string => {
    if (!normalizeCache.has(channel)) {
      normalizeCache.set(channel, normalizeChannelName(channel));
    }

    return normalizeCache.get(channel)!;
  };

  for (let i = 0; i < data.length; i++) {
    const sale: Sale = data[i];
    const channelRaw: string = sale.channel_name?.trim() || 'other';

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
