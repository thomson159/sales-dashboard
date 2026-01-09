import { CHANNEL_MAP } from '~/consts';

export const normalizeChannelName = (value: string): string =>
  CHANNEL_MAP[value.toLowerCase()] ?? value;

export const formatNumber = (value: number) => value.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });

export const areNumbers = (aValue: unknown, bValue: unknown): boolean =>
  typeof aValue === 'number' && typeof bValue === 'number';
