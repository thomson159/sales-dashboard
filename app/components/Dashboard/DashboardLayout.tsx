import { useCallback, useState } from 'react';
import { Outlet } from 'react-router';
import type { Filters as FiltersType, Metrics, SaleArray } from '~/types/types';
import { Footer } from '../small/Footer';
import { Container } from '../small/Container';
import Filters from '../Filters/Filters';
import { Summary } from '../Summary';
import { useFilters } from '~/hooks/Data/useFilters';
import { useMetrics } from '~/hooks/Data/useMetrics';
import { useSource } from '~/hooks/Data/useSource';
import type { UseSourceResult } from '~/types/hooks.types';
import { Spinner } from '../small/Spinner';

export const DashboardLayout = () => {
  const { data, loading }: UseSourceResult = useSource();
  const [filters, setFilters] = useState<FiltersType>({});
  const filteredData: SaleArray = useFilters(data, filters);
  const metrics: Metrics = useMetrics(filteredData);

  const handleFilters = useCallback((value: FiltersType) => setFilters(value), [setFilters]);

  return (
    <Container>
      {loading && (
        <div className="absolute right-0 top-0 mt-14 mr-4">
          <Spinner />
        </div>
      )}
      <Filters data={data} {...filters} onChange={handleFilters} />
      <Summary {...metrics} />
      <Outlet context={{ data: filteredData }} />
      <Footer />
    </Container>
  );
};
