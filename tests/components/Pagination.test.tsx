import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Pagination, { PaginationComponent } from '~/components/Pagination';
import type { PaginationProps } from '~/types/components.types';

describe('PaginationComponent', () => {
  let onChangeMock: PaginationProps['onChange'];

  beforeEach(() => {
    onChangeMock = vi.fn();
  });

  it('renders pages correctly with windowSize 1', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onChange={onChangeMock} />);
    const buttons = screen.getAllByRole('button', { name: /\d+/ });
    expect(buttons.map((b) => b.textContent)).toEqual(['1', '2', '3', '4', '5']);
  });

  it('renders dots when pages are truncated', () => {
    render(
      <PaginationComponent
        currentPage={5}
        totalPages={10}
        onChange={onChangeMock}
        windowSize={1}
      />,
    );
    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
  });

  it('highlights active page', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onChange={onChangeMock} />);
    const activeBtn = screen.getByText('3');
    expect(activeBtn).toHaveClass('sort-active');
  });

  it('calls onChange when clicking a page number', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onChange={onChangeMock} />);
    const btn = screen.getByText('4');
    fireEvent.click(btn);
    expect(onChangeMock).toHaveBeenCalledWith(4);
  });

  it('does not call onChange when clicking the current page', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onChange={onChangeMock} />);
    const btn = screen.getByText('3');
    fireEvent.click(btn);
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('calls onChange when clicking Prev button', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onChange={onChangeMock} />);
    const btn = screen.getByText('Prev');
    fireEvent.click(btn);
    expect(onChangeMock).toHaveBeenCalledWith(2);
  });

  it('does not call onChange when Prev is disabled', () => {
    render(<PaginationComponent currentPage={1} totalPages={5} onChange={onChangeMock} />);
    const btn = screen.getByText('Prev');
    fireEvent.click(btn);
    expect(onChangeMock).not.toHaveBeenCalled();
    expect(btn).toBeDisabled();
  });

  it('calls onChange when clicking Next button', () => {
    render(<PaginationComponent currentPage={3} totalPages={5} onChange={onChangeMock} />);
    const btn = screen.getByText('Next');
    fireEvent.click(btn);
    expect(onChangeMock).toHaveBeenCalledWith(4);
  });

  it('does not call onChange when Next is disabled', () => {
    render(<PaginationComponent currentPage={5} totalPages={5} onChange={onChangeMock} />);
    const btn = screen.getByText('Next');
    fireEvent.click(btn);
    expect(onChangeMock).not.toHaveBeenCalled();
    expect(btn).toBeDisabled();
  });

  it('matches snapshot with middle page', () => {
    const { asFragment } = render(
      <PaginationComponent currentPage={3} totalPages={5} onChange={onChangeMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with first page', () => {
    const { asFragment } = render(
      <PaginationComponent currentPage={1} totalPages={5} onChange={onChangeMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with last page', () => {
    const { asFragment } = render(
      <PaginationComponent currentPage={5} totalPages={5} onChange={onChangeMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Pagination memo', () => {
  it('renders memoized Pagination correctly', () => {
    const onChangeMock = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onChange={onChangeMock} />);
    const btn = screen.getByText('3');
    expect(btn).toHaveClass('sort-active');
  });

  it('matches snapshot for memoized Pagination', () => {
    const onChangeMock = vi.fn();
    const { asFragment } = render(
      <Pagination currentPage={3} totalPages={5} onChange={onChangeMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
