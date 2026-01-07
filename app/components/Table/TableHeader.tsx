import { memo } from 'react';
import { COLUMNS, index as indexKey } from '~/consts';
import type { SortKey, Sale } from '~/types/types';
import { isSortKey } from '~/utils/sort.utils';
import type { TableHeaderProps } from '~/types/components.types';

const TableHeaderComponent = ({ visibleColumns, sortKey, sortOrder, onSort }: TableHeaderProps) => {
  const getSortArrow = (key: keyof Sale) =>
    sortKey === key ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : '';

  return (
    <thead className="sticky top-0 bg-white z-20">
      <tr>
        {COLUMNS.filter((c) => visibleColumns.includes(c.key)).map((col) => {
          const isSortable = col.sortable && col.key !== indexKey && isSortKey(col.key);
          return (
            <th
              key={col.key}
              onClick={isSortable ? () => onSort(col.key as SortKey) : undefined}
              className={`
                  px-3 py-2
                  whitespace-nowrap
                  text-left
                  font-semibold
                  select-none
                  ${isSortable ? 'cursor-pointer' : ''}
                `}
            >
              {col.label}
              {isSortable && getSortArrow(col.key as keyof Sale)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export const TableHeader = memo(TableHeaderComponent);
