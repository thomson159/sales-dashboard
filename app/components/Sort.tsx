import { memo, useCallback } from 'react';
import type { KeyOfSale } from '~/types/types';
import { asc, FIELDS } from '~/consts';
import type { SortProps } from '~/types/components.types';
import { getNextSortState } from '~/utils/sort.utils';

export const SortComponent = ({ sort, onChange }: SortProps) => {
  const handleClick = useCallback(
    (field: KeyOfSale) => {
      onChange(getNextSortState(sort, field));
    },
    [sort, onChange],
  );

  const getArrow = (field: KeyOfSale) =>
    sort?.field === field ? (sort.order === asc ? '↑' : '↓') : null;

  return (
    <div>
      <div className="flex mt-5 ">↕️ Sort By</div>
      <div className={'sort-container'}>
        {FIELDS.map(({ label, value }) => {
          const isActive = sort?.field === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => handleClick(value)}
              className={`${'sort'} ${isActive ? 'sort-active' : 'sort-in-active'}`}
            >
              <span>{label}</span>
              {isActive && <span className={'sort-arrow'}>{getArrow(value)}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Sort = memo(SortComponent);
export default Sort;
