import { memo, useCallback } from 'react';
import type { PaginationProps } from '~/types/components.types';
import type { Mouse } from '~/types/types';
import { getVisiblePages } from '~/utils/pagination.utils';

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

  const visiblePages: number[] = getVisiblePages(currentPage, totalPages, windowSize);

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
