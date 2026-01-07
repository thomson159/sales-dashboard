import { memo, useCallback, useMemo } from 'react';
import type { PaginationProps } from '~/types/components.types';
import type { Mouse } from '~/types/types';

export const PaginationComponent = ({
  currentPage,
  totalPages,
  onChange,
  windowSize = 1,
}: PaginationProps) => {
  const handlePageClick = useCallback(
    (p: number) => (e: Mouse) => {
      e.preventDefault();
      if (p !== currentPage) onChange(p);
    },
    [currentPage, onChange],
  );

  const handlePrevClick = useCallback(
    (e: Mouse) => {
      e.preventDefault();
      if (currentPage > 1) onChange(currentPage - 1);
    },
    [currentPage, onChange],
  );

  const handleNextClick = useCallback(
    (e: Mouse) => {
      e.preventDefault();
      if (currentPage < totalPages) onChange(currentPage + 1);
    },
    [currentPage, totalPages, onChange],
  );

  const visiblePages: number[] = useMemo(() => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - windowSize);
    const end = Math.min(totalPages, currentPage + windowSize);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push(-1);

    for (let p = start; p <= end; p++) pages.push(p);

    if (end < totalPages - 1) pages.push(-1);
    if (end < totalPages) pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages, windowSize]);

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
              disabled={p === currentPage}
              key={p}
              className={`sort ${p === currentPage ? 'sort-active' : 'sort-in-active'}`}
              onClick={handlePageClick(p)}
            >
              {p}
            </button>
          ),
        )}
      </div>
      <div className="flex gap-2 mt-1">
        <button disabled={currentPage === 1} className="sort-next" onClick={handlePrevClick}>
          Prev
        </button>
        <button
          disabled={currentPage === totalPages || totalPages < 2}
          className="sort-next"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const Pagination = memo(PaginationComponent);
export default Pagination;
