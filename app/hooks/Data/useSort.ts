import type { SaleArray, Sort } from '~/types/types';

export const useSort = (data: SaleArray, sort?: Sort): SaleArray => {
  if (!sort) return data;

  const { field, order } = sort;
  const direction = order === 'asc' ? 1 : -1;

  return data
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const aValue = a.item[field];
      const bValue = b.item[field];

      if (aValue == null && bValue == null) return a.index - b.index;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const diff = aValue - bValue;
        return diff !== 0 ? diff * direction : a.index - b.index;
      }

      const aStr = String(aValue);
      const bStr = String(bValue);

      if (aStr < bStr) return -1 * direction;
      if (aStr > bStr) return 1 * direction;

      return a.index - b.index;
    })
    .map(({ item }) => item);
};
