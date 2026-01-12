import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import type { Filters } from '~/types/types';

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = useMemo(() => {
    return {
      channelName: searchParams.get('channelName') ?? undefined,
      minDate: searchParams.get('minDate') ?? undefined,
      maxDate: searchParams.get('maxDate') ?? undefined,
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (next: Filters) => {
      const params = new URLSearchParams();

      Object.entries(next).forEach(([key, value]) => {
        if (value) {
          params.set(key, String(value));
        }
      });

      setSearchParams(params, { replace: true });
    },
    [setSearchParams],
  );

  return { filters, setFilters };
};
