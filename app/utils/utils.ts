import { CHANNEL_MAP } from '~/consts';

export const normalizeChannelName = (value: string): string =>
  CHANNEL_MAP[value.toLowerCase()] ?? value;

export const formatNumber = (value: number): string =>
  value
    .toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
    .replace(/,/g, ' ');

export const areNumbers = (aValue: unknown, bValue: unknown): boolean =>
  typeof aValue === 'number' && typeof bValue === 'number';
