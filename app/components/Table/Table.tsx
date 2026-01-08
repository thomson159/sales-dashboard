import { useState, useMemo, useCallback, memo } from 'react';
import { ColumnSelector } from './ColumnSelector';
import { Button } from '../small/Button';
import { ROWS_INCREMENT } from '~/consts';
import type { UseTableColumnsResult } from '~/types/hooks.types';
import type { KeyOfSale, SaleArray, SaleData, SortOr } from '~/types/types';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { useTableColumns } from '~/hooks/Table/useTableColumns';
import { useSortMemo } from '~/hooks/Data/useSort';
import { getNextSortState } from '~/utils/sort.utils';

const SalesTableComponent = ({ data }: SaleData) => {
  const [sort, setSort] = useState<SortOr>(undefined);
  const [visibleRowsCount, setVisibleRowsCount] = useState<number>(ROWS_INCREMENT);
  const { visibleColumns, onToggle }: UseTableColumnsResult = useTableColumns();
  const sortedData: SaleArray = useSortMemo(data, sort);

  const displayedData: SaleArray = useMemo(
    () => sortedData.slice(0, visibleRowsCount),
    [sortedData, visibleRowsCount],
  );

  const loadMore = useCallback(
    () => setVisibleRowsCount((prev: number) => prev + ROWS_INCREMENT),
    [],
  );
  const handleClick = useCallback((field: KeyOfSale) => {
    setSort((prev: SortOr) => getNextSortState(prev, field));
  }, []);

  if (data.length === 0) {
    return null;
  }

  return (
    <div>
      <ColumnSelector visibleColumns={visibleColumns} onToggle={onToggle} />
      <div className="relative w-full overflow-x-auto">
        <table className={`w-full sales-table border-collapse font-inter text-sm rounded-lg`}>
          <TableHeader
            visibleColumns={visibleColumns}
            field={sort?.field}
            order={sort?.order}
            onChange={handleClick}
          />
          <TableBody data={displayedData} visibleColumns={visibleColumns} />
        </table>
      </div>
      {visibleRowsCount < sortedData.length && (
        <div className="flex pt-5">
          <Button className="mx-auto" onClick={loadMore}>
            More
          </Button>
        </div>
      )}
    </div>
  );
};

const Table = memo(SalesTableComponent);
export default Table;
