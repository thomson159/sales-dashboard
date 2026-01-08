import { useMemo } from 'react';
import type { SaleArray, Sort } from '~/types/types';
import { sortData } from '~/utils/sort.utils';

export const useSortMemo = (data: SaleArray, sort?: Sort): SaleArray =>
  useMemo(() => sortData(data, sort), [data, sort]);

export const useSort = (data: SaleArray, sort?: Sort): SaleArray => sortData(data, sort);
