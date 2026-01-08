import { asc, desc, index } from '~/consts';
import type { ColumnKey, KeyOfSale, SortOr } from '~/types/types';

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
