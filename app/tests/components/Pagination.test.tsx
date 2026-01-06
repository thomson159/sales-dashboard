import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Pagination, { PaginationComponent } from '~/components/Pagination';
import type { PaginationProps } from '~/types/components.types';

describe('PaginationComponent', () => {
  let onPageChangeMock: PaginationProps['onPageChange'];

  beforeEach(() => {
    onPageChangeMock = vi.fn();
  });

  it('renders pages correctly with windowSize 1', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />);
    const buttons = screen.getAllByRole('button', { name: /\d+/ });
    expect(buttons.map((b) => b.textContent)).toEqual(['1', '2', '3', '4', '5']);
  });

  it('renders dots when pages are truncated', () => {
    render(
      <PaginationComponent
        currentPage={5}
        totalPages={10}
        onPageChange={onPageChangeMock}
        windowSize={1}
      />,
    );
    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
  });

  it('highlights active page', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />);
    const activeBtn = screen.getByText('3');
    expect(activeBtn).toHaveClass('sortButtonActive');
  });

  it('calls onPageChange when clicking a page number', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />);
    const btn = screen.getByText('4');
    fireEvent.click(btn);
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it('does not call onPageChange when clicking the current page', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />);
    const btn = screen.getByText('3');
    fireEvent.click(btn);
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it('calls onPageChange when clicking Prev button', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />);
    const btn = screen.getByText('Prev');
    fireEvent.click(btn);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('does not call onPageChange when Prev is disabled', () => {
    render(<PaginationComponent currentPage={1} totalPages={5} onPageChange={onPageChangeMock} />);
    const btn = screen.getByText('Prev');
    fireEvent.click(btn);
    expect(onPageChangeMock).not.toHaveBeenCalled();
    expect(btn).toBeDisabled();
  });

  it('calls onPageChange when clicking Next button', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />);
    const btn = screen.getByText('Next');
    fireEvent.click(btn);
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it('does not call onPageChange when Next is disabled', () => {
    render(<PaginationComponent currentPage={5} totalPages={5} onPageChange={onPageChangeMock} />);
    const btn = screen.getByText('Next');
    fireEvent.click(btn);
    expect(onPageChangeMock).not.toHaveBeenCalled();
    expect(btn).toBeDisabled();
  });

  it('matches snapshot with middle page', () => {
    const { asFragment } = render(
      <PaginationComponent currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with first page', () => {
    const { asFragment } = render(
      <PaginationComponent currentPage={1} totalPages={5} onPageChange={onPageChangeMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with last page', () => {
    const { asFragment } = render(
      <PaginationComponent currentPage={5} totalPages={5} onPageChange={onPageChangeMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Pagination memo', () => {
  it('renders memoized Pagination correctly', () => {
    const onPageChangeMock = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />);
    const btn = screen.getByText('3');
    expect(btn).toHaveClass('sortButtonActive');
  });

  it('matches snapshot for memoized Pagination', () => {
    const onPageChangeMock = vi.fn();
    const { asFragment } = render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
