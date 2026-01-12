import { lazy, Suspense, useCallback, useState } from 'react';
import type { SaleArray, SaleData, Sort as SortType } from '~/types/types';
import { Spinner } from '../small/Spinner';
import { PageSizeFilter } from '../PageSizeFilter';
import Pagination from '../Pagination';
import { useNavigate, useOutletContext } from 'react-router';
import { usePagination } from '~/hooks/Data/usePagination';
import type { UsePaginationResult } from '~/types/hooks.types';
import { useSort } from '~/hooks/Data/useSort';
import Sort from '../Sort';
import { Button } from '../small/Button';
import { useSortStore, type SortState } from '~/store/useSortStore';

const Table = lazy(() => import('../Table/Table'));

export const DashboardTable = () => {
  const { data } = useOutletContext<SaleData>();
  const { sort, setSort }: SortState = useSortStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(40);
  const navigate = useNavigate();
  const sortedData: SaleArray = useSort(data, sort);
  const { pagedData, dataLength, totalPages }: UsePaginationResult = usePagination(
    sortedData,
    currentPage,
    pageSize,
  );

  const handleSort = useCallback((value?: SortType) => setSort(value), [setSort]);

  return (
    <>
      <div className="flex justify-center">
        <Button onClick={() => navigate('/charts')}>Show Charts</Button>
      </div>
      <Sort sort={sort} onChange={handleSort} />
      <PageSizeFilter pageSize={pageSize} onChange={setPageSize} dataLength={dataLength} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages > 1 ? totalPages : 1}
        onChange={setCurrentPage}
      />
      <Suspense fallback={<Spinner />}>
        <Table data={pagedData} />
      </Suspense>
    </>
  );
};
