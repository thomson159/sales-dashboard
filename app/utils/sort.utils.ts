import { asc, desc, index } from '~/consts';
import type { ColumnKey, KeyOfSale, SortOr } from '~/types/types';
import type { SaleArray, Sort } from '~/types/types';

type Direction = 1 | -1;

export const sortData = (data: SaleArray, sort?: Sort): SaleArray => {
  if (!sort) return data;

  const { field, order }: Sort = sort;
  const direction: Direction = order === asc ? 1 : -1;

  return data
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const aValue: string | number = a.item[field];
      const bValue: string | number = b.item[field];

      if (aValue == null && bValue == null) return a.index - b.index;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const diff: number = aValue - bValue;

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

export const isSortKey = (key: ColumnKey): key is KeyOfSale => key !== index;

export const getNextSortState = (current: SortOr, field: KeyOfSale): SortOr => {
  if (!current || current.field !== field) {
    return { field, order: asc };
  }

  if (current.order === asc) {
    return { field, order: desc };
  }

  return undefined;
};
