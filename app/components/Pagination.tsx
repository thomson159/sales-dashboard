import { memo, useCallback, useMemo } from 'react';
import type { PaginationProps } from '~/types/components.types';
import type { Mouse } from '~/types/types';

export const PaginationComponent = ({
  page,
  totalPages,
  onPageChange,
  windowSize = 1,
}: PaginationProps) => {
  const handlePageClick = useCallback(
    (p: number) => (e: Mouse) => {
      e.preventDefault();
      if (p !== page) onPageChange(p);
    },
    [page, onPageChange],
  );

  const handlePrevClick = useCallback(
    (e: Mouse) => {
      e.preventDefault();
      if (page > 1) onPageChange(page - 1);
    },
    [page, onPageChange],
  );

  const handleNextClick = useCallback(
    (e: Mouse) => {
      e.preventDefault();
      if (page < totalPages) onPageChange(page + 1);
    },
    [page, totalPages, onPageChange],
  );

  const visiblePages: number[] = useMemo(() => {
    const pages: number[] = [];
    const start = Math.max(1, page - windowSize);
    const end = Math.min(totalPages, page + windowSize);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push(-1);

    for (let p = start; p <= end; p++) pages.push(p);

    if (end < totalPages - 1) pages.push(-1);
    if (end < totalPages) pages.push(totalPages);

    return pages;
  }, [page, totalPages, windowSize]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-wrap justify-center gap-1 overflow-hidden">
        {visiblePages.map((p, idx) =>
          p === -1 ? (
            <span key={`dots-${idx}`} className="pagination-dots">
              …
            </span>
          ) : (
            <button
              key={p}
              className={`sortButton ${p === page ? 'sortButtonActive' : ''}`}
              onClick={handlePageClick(p)}
            >
              {p}
            </button>
          ),
        )}
      </div>
      <div className="flex gap-2 mt-1">
        <button disabled={page === 1} className="sortButton" onClick={handlePrevClick}>
          Prev
        </button>
        <button disabled={page === totalPages} className="sortButton" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

const Pagination = memo(PaginationComponent);
export default Pagination;
