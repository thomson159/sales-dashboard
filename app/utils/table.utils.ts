import type { ColumnKey, Sale, SaleArray, SortKey, SortOrder } from '~/types/types';
import { asc } from '~/consts';

export const sortTableData = (
  data: SaleArray,
  sortKey: SortKey,
  sortOrder: SortOrder,
  visibleColumns: readonly ColumnKey[],
): SaleArray => {
  if (!sortKey || !visibleColumns.includes(sortKey)) {
    return data;
  }

  return [...data].sort((a: Sale, b: Sale) => {
    const aValue: string | number = a[sortKey];
    const bValue: string | number = b[sortKey];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === asc ? aValue - bValue : bValue - aValue;
    }

    return sortOrder === asc
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
};
