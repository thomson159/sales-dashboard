import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { useData } from '~/hooks/Data/useData';
import { useTableColumns } from '~/hooks/Table/useTableColumns';
import type { Filters as FiltersType, Metrics, Sort as SortType, UseData } from '~/types/types';
import type { UseTableColumnsResult } from '~/types/hooks.types';
import { Navbar } from '../Navbar';
import { Footer } from '../small/Footer';
import { Container } from '../small/Container';
import { Summary } from '../Summary';
import { Spinner } from '../small/Spinner';
import { PageSizeFilter } from '../PageSizeFilter';
import Pagination from '../Pagination';
import Sort from '../Sort';
import Filters from '../Filters/Filters';
import Charts from '../Charts/Recharts/Charts';
import { Button } from '../small/Button';

const Table = lazy(() => import('../Table/Table'));

type Props = { chartsAreVisible?: boolean };
export const Dashboard = ({ chartsAreVisible = false }: Props) => {
  const {
    data,
    chartData,
    loading,
    page,
    setPage,
    pageSize,
    setPageSize,
    total,
    totalPages,
    filters,
    setFilters,
    sort,
    setSort,
    totalRevenue,
    totalOrders,
    avgOrderValue,
  }: UseData = useData();

  const { visibleColumns, toggleColumn }: UseTableColumnsResult = useTableColumns();
  const [filtersVisible, setFiltersVisible] = useState<boolean>(true);
  const toggleFilters = useCallback(() => setFiltersVisible((prev: boolean) => !prev), []);
  const handleSortChange = useCallback((nextSort?: SortType) => setSort(nextSort), [setSort]);

  const handleFiltersChange = useCallback(
    (nextFilters: FiltersType) => setFilters(nextFilters),
    [setFilters],
  );

  const summaryProps: Metrics = useMemo(
    () => ({ totalRevenue, totalOrders, avgOrderValue }),
    [totalRevenue, totalOrders, avgOrderValue],
  );

  const [showCharts, setShowCharts] = useState<boolean>(false);

  return (
    <div>
      <Navbar expanded={filtersVisible} onToggle={toggleFilters} loading={loading}>
        <Filters data={chartData} {...filters} onChange={handleFiltersChange} />
        <Sort sort={sort} onChange={handleSortChange} />
      </Navbar>
      <Container>
        <Summary {...summaryProps} />
        {showCharts || chartsAreVisible ? (
          <Charts data={chartData} />
        ) : (
          <div className="flex justify-center mb-15 mt-5">
            <Button onClick={() => setShowCharts((prev) => !prev)}>Show Charts</Button>
          </div>
        )}
        <PageSizeFilter
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalItems={total}
          disabled={false}
        />
        <Pagination
          page={page}
          totalPages={totalPages > 1 ? totalPages : 1}
          onPageChange={setPage}
        />
        <Suspense fallback={<Spinner />}>
          <Table data={data} visibleColumns={visibleColumns} toggleColumn={toggleColumn} />
        </Suspense>
        <Footer />
      </Container>
    </div>
  );
};
