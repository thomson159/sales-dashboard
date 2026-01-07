import { memo } from 'react';
import { Button } from './small/Button';
import type { PageSizeFilterProps } from '~/types/components.types';
import { usePageSize } from '~/hooks/usePageSize';
import type { UsePageSizeResult } from '~/types/hooks.types';

const PageSizeFilterComponent = ({
  pageSize,
  min = 1,
  dataLength,
  onChange,
}: PageSizeFilterProps) => {
  const { localPageSize, handleChange, apply }: UsePageSizeResult = usePageSize({
    pageSize,
    min,
    dataLength,
    onChange,
  });

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-wrap gap-4 items-end justify-center">
        <div className="flex flex-col">
          <label htmlFor="page-size">Per Page</label>
          <input
            id="page-size"
            type="number"
            min={min}
            max={dataLength}
            value={localPageSize}
            onChange={handleChange}
            className={'filter-input'}
            style={{ width: 90 }}
          />
        </div>
        <Button onClick={apply}>Apply</Button>
      </div>
    </div>
  );
};

export const PageSizeFilter = memo(PageSizeFilterComponent);
