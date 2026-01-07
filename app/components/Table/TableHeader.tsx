import { memo } from 'react';
import { asc, COLUMNS } from '~/consts';
import type { Column, KeyOfSale } from '~/types/types';
import { isSortKey } from '~/utils/sort.utils';
import type { TableHeaderProps } from '~/types/components.types';

const TableHeaderComponent = ({ visibleColumns, field, order, onChange }: TableHeaderProps) => {
  const getArrow = (k: KeyOfSale) => (field === k ? (order === asc ? '▲' : '▼') : null);

  return (
    <thead className="sticky top-0 bg-white z-20">
      <tr>
        {COLUMNS.filter((c) => visibleColumns.includes(c.key)).map((col: Column) => {
          const isSortable: boolean = col.sortable && isSortKey(col.key);

          return (
            <th
              key={col.key}
              onClick={isSortable ? () => onChange(col.key as KeyOfSale) : undefined}
              className={`px-3 py-2 whitespace-nowrap text-left font-semibold select-none ${isSortable ? 'cursor-pointer' : ''}`}
            >
              {col.label}
              <span className='absolute'>
                {isSortable && getArrow(col.key as KeyOfSale)}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export const TableHeader = memo(TableHeaderComponent);
