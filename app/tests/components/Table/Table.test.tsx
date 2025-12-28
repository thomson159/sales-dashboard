import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Table from '~/components/Table/Table';
import type { Sale, ColumnKey } from '~/types/types';

const mockData: Sale[] = [
  {
    date: '2025-01-01',
    channel_name: 'chan1',
    order_status_id: 1,
    sum_sales: 100.5,
    count_orders: 2,
  },
  {
    date: '2025-01-02',
    channel_name: 'chan2',
    order_status_id: 0,
    sum_sales: 50,
    count_orders: 1,
  },
  {
    date: '2025-01-03',
    channel_name: 'chan3',
    order_status_id: 1,
    sum_sales: 200,
    count_orders: 3,
  },
];

const toggleColumnMock = vi.fn();

vi.mock('~/hooks/Table/useTableSorting', () => ({
  useTableSorting: (_data: Sale[], _visible: ColumnKey[]) => ({
    sortKey: null,
    sortOrder: null,
    sortedData: mockData,
    onSort: vi.fn(),
  }),
}));

vi.mock('~/hooks/useIsMobile', () => ({
  useIsMobile: () => false,
}));

vi.mock('~/consts', async () => {
  const actual = await vi.importActual('~/consts');
  return {
    ...actual,
    COLUMNS: [
      { key: 'date', label: 'Date', sortable: true },
      { key: 'channel_name', label: 'Channel', sortable: true },
    ],
    ROWS_INCREMENT: 2,
  };
});

describe('Table', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: query === '(max-width: 494px)' ? false : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });
  });

  const renderTable = () =>
    render(
      <Table
        data={mockData}
        visibleColumns={['date', 'channel_name']}
        toggleColumn={toggleColumnMock}
      />,
    );

  it('renders table headers', () => {
    renderTable();
    const dateHeader = screen.getByRole('columnheader', { name: 'Date' });
    const channelHeader = screen.getByRole('columnheader', { name: 'Channel' });
    expect(dateHeader).toBeInTheDocument();
    expect(channelHeader).toBeInTheDocument();
  });

  it('renders only initial rows based on ROWS_INCREMENT', () => {
    renderTable();
    const rows = screen.getAllByRole('row').filter((row) => row.closest('tbody'));
    expect(rows.length).toBe(2);
  });

  it('shows "More" button when not all rows are visible', () => {
    renderTable();
    expect(screen.getByRole('button', { name: /more/i })).toBeInTheDocument();
  });

  it('loads more rows after clicking "More"', () => {
    renderTable();
    fireEvent.click(screen.getByRole('button', { name: /more/i }));
    const rows = screen.getAllByRole('row').filter((row) => row.closest('tbody'));
    expect(rows.length).toBe(3);
  });

  it('calls toggleColumn when column selector is used', () => {
    renderTable();
    toggleColumnMock('date');
    expect(toggleColumnMock).toHaveBeenCalledWith('date');
  });

  it('matches snapshot', () => {
    const { container } = renderTable();
    expect(container).toMatchSnapshot();
  });
});
