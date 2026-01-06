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
import Charts from '../Charts/Recharts/Charts';
import { Button } from '../small/Button';
import Filters from '../Filters/Filters';
// import { ThemeProvider } from '../ThemeContext';

const Table = lazy(() => import('../Table/Table'));

type Props = { chartsAreVisible?: boolean };

export const Dashboard = ({ chartsAreVisible = false }: Props) => {
  const {
    data,
    chartData,
    loading,
    currentPage,
    pageSize,
    dataLength,
    totalPages,
    filters,
    sort,
    totalRevenue,
    totalOrders,
    avgOrderValue,
    setCurrentPage,
    setPageSize,
    setFilters,
    setSort,
  }: UseData = useData();
  const { visibleColumns, toggleColumn }: UseTableColumnsResult = useTableColumns();

  const [navbarToggle, setNavbarToggle] = useState<boolean>(true);
  const onToggleNavbar = useCallback(() => setNavbarToggle((prev: boolean) => !prev), []);

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
    // <ThemeProvider>
    <div>
      <Navbar expanded={navbarToggle} onToggle={onToggleNavbar} loading={loading}>
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
        <PageSizeFilter pageSize={pageSize} onChange={setPageSize} dataLength={dataLength} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages > 1 ? totalPages : 1}
          onChange={setCurrentPage}
        />
        <Suspense fallback={<Spinner />}>
          <Table data={data} visibleColumns={visibleColumns} toggleColumn={toggleColumn} />
        </Suspense>
        <Footer />
      </Container>
    </div>
    // </ThemeProvider>
  );
};
