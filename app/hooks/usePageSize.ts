import { useState, useEffect, useCallback } from 'react';
import type { PageSizeFilterProps } from '~/types/components.types';
import type { UsePageSizeResult } from '~/types/hooks.types';
import type { Change } from '~/types/types';
import { sanitizePageSizeInput, validatePageSize } from '~/utils/filters.utils';

export const usePageSize = ({
  pageSize,
  min = 1,
  dataLength,
  onChange,
}: PageSizeFilterProps): UsePageSizeResult => {
  const [localPageSize, setLocalPageSize] = useState<number>(pageSize);

  useEffect(() => {
    setLocalPageSize(pageSize);
  }, [pageSize]);

  const handleChange = useCallback((e: Change) => {
    const parsed: number | null = sanitizePageSizeInput(e.target.value);
    if (parsed === null) return;

    setLocalPageSize(parsed);
  }, []);

  const apply = useCallback(() => {
    const validated: number = validatePageSize(localPageSize, min, dataLength);

    if (validated !== pageSize) {
      setLocalPageSize(validated);
      onChange(validated);
    }
  }, [localPageSize, min, dataLength, pageSize, onChange]);

  return {
    localPageSize,
    handleChange,
    apply,
  };
};
