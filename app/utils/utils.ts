import { CHANNEL_MAP } from '~/consts';

export const normalizeChannelName = (value: string): string =>
  CHANNEL_MAP[value.toLowerCase()] ?? value;

export const areNumbers = (aValue: unknown, bValue: unknown): boolean =>
  typeof aValue === 'number' && typeof bValue === 'number';
