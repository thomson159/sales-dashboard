import { useEffect, useState } from 'react';
import { fetchSales } from '~/api/fetchSales';
import type { UseSourceResult } from '~/types/hooks.types';
import type { SaleArray } from '~/types/types';

export const useSource = (): UseSourceResult => {
  const [data, setData] = useState<SaleArray>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      const result = await fetchSales();
      if (!active) return;

      setData(result);
      setLoading(false);
    };

    loadData();

    return () => {
      active = false;
    };
  }, []);

  return { data, loading };
};
