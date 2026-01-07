import { useEffect, useState, useCallback } from 'react';
import { fetchSales } from '~/api/fetchSales';
import type { UseSourceResult } from '~/types/hooks.types';
import type { SaleArray } from '~/types/types';

export const useSource = (): UseSourceResult => {
  const [data, setData] = useState<SaleArray>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData: () => Promise<void> = useCallback(async () => {
    const result: SaleArray = await fetchSales();
    setData(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;

    const run = async () => {
      if (!active) return;

      await loadData();
    };

    run();

    return () => {
      active = false;
    };
  }, [loadData]);

  return { data, loading };
};
