import { useMemo } from 'react';
import { applyFilters } from '~/utils/filters.utils';
import type { Filters, SaleArray } from '~/types/types';

export const useFilters = (data: SaleArray, filters: Filters): SaleArray =>
  useMemo(() => applyFilters(data, filters), [data, filters]);
