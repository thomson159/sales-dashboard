import { useCallback, useMemo, useState } from 'react';
import type { SortKey, SortOrder, ColumnKey, SaleArray } from '~/types/types';
import { asc, desc } from '~/consts';
import { sortTableData } from '~/utils/table.utils';
import type { UseTableSortingResult } from '~/types/hooks.types';

export const useTableSorting = (
  data: SaleArray,
  visibleColumns: readonly ColumnKey[],
): UseTableSortingResult => {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(asc);
  const sortedData: SaleArray = useMemo(
    () => sortTableData(data, sortKey, sortOrder, visibleColumns),
    [data, sortKey, sortOrder, visibleColumns],
  );

  const onSort = useCallback(
    (key: SortKey) => {
      if (sortKey !== key) {
        setSortKey(key);
        setSortOrder(asc);
      } else if (sortOrder === asc) {
        setSortOrder(desc);
      } else if (sortOrder === desc) {
        setSortKey(null);
        setSortOrder(asc);
      }
    },
    [sortKey, sortOrder],
  );

  return {
    sortKey,
    sortOrder,
    sortedData,
    onSort,
  };
};
