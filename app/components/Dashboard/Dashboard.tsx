import { lazy, Suspense, useCallback, useMemo } from 'react';
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
import Filters from '../Filters/Filters';

const Table = lazy(() => import('../Table/Table'));

export const Dashboard = () => {
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

  const handleSort = useCallback((value?: SortType) => setSort(value), [setSort]);
  const handleFilters = useCallback((value: FiltersType) => setFilters(value), [setFilters]);

  const summaryProps: Metrics = useMemo(
    () => ({ totalRevenue, totalOrders, avgOrderValue }),
    [totalRevenue, totalOrders, avgOrderValue],
  );

  return (
    <>
      <Navbar loading={loading}>
        <Filters data={chartData} {...filters} onChange={handleFilters} />
        <Sort sort={sort} onChange={handleSort} />
      </Navbar>
      <Container>
        <Summary {...summaryProps} />
        <Charts data={chartData} />
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
