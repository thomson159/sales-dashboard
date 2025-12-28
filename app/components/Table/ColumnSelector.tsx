import { memo } from 'react';
import type { ColumnSelectorProps } from '~/types/components.types';

const ColumnSelectorComponent = ({
  columns,
  visibleColumns,
  toggleColumn,
}: ColumnSelectorProps) => (
  <div className="column-selector mb-2 flex flex-wrap p-3 gap-4">
    {columns.map((col) => {
      const inputId = `column-${col.key}`;

      return (
        <div key={col.key} className="flex items-center justify-center">
          <label htmlFor={inputId} className="flex items-center gap-2 cursor-pointer select-none">
            <input
              id={inputId}
              name={col.key}
              type="checkbox"
              checked={visibleColumns.includes(col.key)}
              onChange={() => toggleColumn(col.key)}
              className="column-selector__input"
            />
            <span className="column-selector__checkbox" />
            <span>{col.label}</span>
          </label>
        </div>
      );
    })}
  </div>
);

export const ColumnSelector = memo(ColumnSelectorComponent);
