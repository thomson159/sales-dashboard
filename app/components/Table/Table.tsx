import { useState, useMemo, useCallback, memo } from 'react';
import { ColumnSelector } from './ColumnSelector';
import { Button } from '../small/Button';
import { ROWS_INCREMENT } from '~/consts';
import { useTableSorting } from '~/hooks/Table/useTableSorting';
import type { SalesTableProps } from '~/types/components.types';
import type { UseTableSortingResult } from '~/types/hooks.types';
import type { SaleArray } from '~/types/types';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

const SalesTableComponent = ({ data, visibleColumns, toggleColumn }: SalesTableProps) => {
  const { key, order, sortedData, onSort }: UseTableSortingResult = useTableSorting(
    data,
    visibleColumns,
  );

  const [visibleRowsCount, setVisibleRowsCount] = useState<number>(ROWS_INCREMENT);

  const displayedData: SaleArray = useMemo(
    () => sortedData.slice(0, visibleRowsCount),
    [sortedData, visibleRowsCount],
  );

  const loadMore = useCallback(() => setVisibleRowsCount((prev) => prev + ROWS_INCREMENT), []);

  if (data.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      <ColumnSelector visibleColumns={visibleColumns} toggleColumn={toggleColumn} />
      <div className="relative w-full overflow-x-auto">
        <table className={`w-full sales-table border-collapse font-inter text-sm rounded-lg`}>
          <TableHeader
            visibleColumns={visibleColumns}
            sortKey={key}
            sortOrder={order}
            onSort={onSort}
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
