import { useState, useEffect, useCallback, type ChangeEvent } from 'react';
import type { UsePageSizeParams, UsePageSizeResult } from '~/types/hooks.types';
import { sanitizePageSizeInput, validatePageSize } from '~/utils/filters.utils';

export const usePageSize = ({
  pageSize,
  min,
  totalItems,
  onPageSizeChange,
}: UsePageSizeParams): UsePageSizeResult => {
  const [localPageSize, setLocalPageSize] = useState<number>(pageSize);

  useEffect(() => {
    setLocalPageSize(pageSize);
  }, [pageSize]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const parsed: number | null = sanitizePageSizeInput(e.target.value);
    if (parsed === null) return;

    setLocalPageSize(parsed);
  }, []);

  const applyPageSize = useCallback(() => {
    const validated: number = validatePageSize(localPageSize, min, totalItems);

    if (validated !== pageSize) {
      setLocalPageSize(validated);
      onPageSizeChange(validated);
    }
  }, [localPageSize, min, totalItems, pageSize, onPageSizeChange]);

  return {
    localPageSize,
    handleChange,
    applyPageSize,
  };
};
