import { useMemo } from 'react';
import { calculateMetrics } from '~/utils/metrics.utils';
import type { Metrics, SaleArray } from '~/types/types';

export const useMetrics = (data: SaleArray): Metrics =>
  useMemo(() => calculateMetrics(data), [data]);
