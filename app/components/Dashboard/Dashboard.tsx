import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { useData } from '~/hooks/Data/useData';
import type { Filters as FiltersType, Metrics, Sort as SortType, UseData } from '~/types/types';
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
import { useThemeStore } from '~/store/useThemeStore';

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

  const { theme, toggleTheme } = useThemeStore();

  const [showCharts, setShowCharts] = useState<boolean>(false);
  const handleSort = useCallback((nextSort?: SortType) => setSort(nextSort), [setSort]);
  const handleFilters = useCallback((value: FiltersType) => setFilters(value), [setFilters]);

  const summaryProps: Metrics = useMemo(
    () => ({ totalRevenue, totalOrders, avgOrderValue }),
    [totalRevenue, totalOrders, avgOrderValue],
  );

  return (
    <>
      <Navbar loading={loading}>
        <button className='mb-5 cursor-pointer' onClick={toggleTheme}>{theme === "dark" ? "🌞" : "🌑"}</button>
        <Filters data={chartData} {...filters} onChange={handleFilters} />
        <Sort sort={sort} onChange={handleSort} />
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
          <Table data={data} />
        </Suspense>
        <Footer />
      </Container>
    </>
  );
};
