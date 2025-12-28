import { CHANNEL_MAP } from '~/consts';

export const normalizeChannelName = (value: string): string => {
  return CHANNEL_MAP[value.toLowerCase()] ?? value;
};

export const areNumbers = (aValue: unknown, bValue: unknown): boolean => {
  return typeof aValue === 'number' && typeof bValue === 'number';
};
