import { useCallback, useMemo, useState } from 'react';
import type { SortOrder, SaleArray, ColumnKeyArray, KeyOfSale } from '~/types/types';
import { asc, desc } from '~/consts';
import { sortTableData } from '~/utils/table.utils';

export type UseTableSortingResult = Readonly<{
  key: SortKey;
  order: SortOrder;
  sortedData: SaleArray;
  onChange: (key: SortKey) => void;
}>;

export type SortKey = KeyOfSale | null;

export const useTableSorting = (
  data: SaleArray,
  visibleColumns: ColumnKeyArray,
): UseTableSortingResult => {
  const [key, setKey] = useState<SortKey>(null);
  const [order, setOrder] = useState<SortOrder>(asc);

  const sortedData: SaleArray = useMemo(
    () => sortTableData(data, key, order, visibleColumns),
    [data, key, order, visibleColumns],
  );

  const onChange = useCallback(
    (k: SortKey) => {
      if (key !== k) {
        setKey(k);
        setOrder(asc);
      } else if (order === asc) {
        setOrder(desc);
      } else if (order === desc) {
        setKey(null);
        setOrder(asc);
      }
    },
    [key, order],
  );

  return {
    key,
    order,
    sortedData,
    onChange,
  };
};
