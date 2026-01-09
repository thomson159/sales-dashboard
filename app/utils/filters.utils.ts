import type { Filters, Sale, SaleArray } from '~/types/types';

export const applyFilters = (data: SaleArray, filters: Filters): SaleArray => {
  const channelName: string | undefined = filters.channelName?.toLowerCase();
  const channelNames: string[] | undefined = filters.channelNames?.map((n) => n.toLowerCase());

  const minDate: string | undefined = filters.minDate;
  const maxDate: string | undefined = filters.maxDate;
  const channelNamesSet: Set<string> | null =
    channelNames && channelNames.length > 0 ? new Set(channelNames) : null;

  return data.filter((s) => {
    const name: string =
      (s as Sale & { _lcName?: string })._lcName ??
      ((s as Sale & { _lcName?: string })._lcName = s.channel_name.toLowerCase());

    if (channelName && !name.includes(channelName)) return false;

    if (channelNamesSet) {
      let match = false;

      for (const n of channelNamesSet) {
        if (name.includes(n)) {
          match = true;
          break;
        }
      }

      if (!match) return false;
    }

    if (minDate && s.date < minDate) return false;

    if (maxDate && s.date > maxDate) return false;

    return true;
  });
};

export const sanitizePageSizeInput = (value: string, maxLength: number = 3): number | null => {
  if (value.length > maxLength) {
    value = value.slice(0, maxLength);
  }

  const numberValue = Number(value);
  const response: number | null = Number.isNaN(numberValue) ? null : numberValue;

  return response;
};

export const validatePageSize = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const applyFiltersLazy = (data: SaleArray, filters: Filters): SaleArray => {
  const channelName = filters.channelName?.toLowerCase();
  const channelNames = filters.channelNames?.map((n) => n.toLowerCase()) ?? null;
  const minDate = filters.minDate;
  const maxDate = filters.maxDate;

  return data.filter((s) => {
    const name = s.channel_name.toLowerCase();
    if (channelName && !name.includes(channelName)) return false;
    if (channelNames && !channelNames.some((n) => name.includes(n))) return false;
    if (minDate && s.date < minDate) return false;
    if (maxDate && s.date > maxDate) return false;

    return true;
  });
};
