import { memo, useCallback } from 'react';
import type { Sale } from '~/types/types';
import { asc, desc, FIELDS } from '~/consts';
import type { SortProps } from '~/types/components.types';

export const SortComponent = ({ sort, onChange }: SortProps) => {
  const handleClick = useCallback(
    (field: keyof Sale) => {
      if (!sort || sort.field !== field) {
        onChange({ field, order: asc });
      } else if (sort.field === field && sort.order === asc) {
        onChange({ field, order: desc });
      } else {
        onChange(undefined);
      }
    },
    [sort, onChange],
  );

  const getArrow = (field: keyof Sale) => {
    if (!sort || sort.field !== field) return null;

    return sort.order === asc ? '↑' : '↓';
  };

  return (
    <div>
      <div className="flex mt-5 ">Sort By</div>
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
