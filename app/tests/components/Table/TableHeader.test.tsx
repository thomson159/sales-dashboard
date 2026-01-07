import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TableHeader } from '~/components/Table/TableHeader';
import type { ColumnKey } from '~/types/types';

vi.mock('~/utils/sort.utils', () => ({
  isSortKey: () => true,
}));

vi.mock('~/consts', () => ({
  asc: 'asc',
  desc: 'desc',
  index: 'index',
  COLUMNS: [
    { key: 'index', label: 'Index', sortable: false },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'channel_name', label: 'Channel', sortable: true },
    { key: 'sum_sales', label: 'Sales', sortable: true },
  ],
}));

describe('TableHeader', () => {
  const onSort = vi.fn();
  const visibleColumns: ColumnKey[] = ['index', 'date', 'channel_name', 'sum_sales'];

  beforeEach(() => {
    onSort.mockClear();
  });

  const getHeaderByLabel = (label: string) =>
    screen.getAllByRole('columnheader').find((th) => th.textContent?.includes(label));

  it('renders only visible columns', () => {
    render(
      <table>
        <TableHeader
          visibleColumns={['date', 'sum_sales', 'index']}
          sortKey={null}
          sortOrder={null}
          onChange={onSort}
        />
      </table>,
    );

    expect(getHeaderByLabel('Date')).toBeDefined();
    expect(getHeaderByLabel('Sales')).toBeDefined();
    expect(getHeaderByLabel('Index')).toBeDefined();
    expect(getHeaderByLabel('Channel')).toBeUndefined();
  });

  it('adds cursor-pointer class only to sortable columns', () => {
    render(
      <table>
        <TableHeader
          visibleColumns={visibleColumns}
          sortKey={null}
          sortOrder={null}
          onChange={onSort}
        />
      </table>,
    );

    const dateHeader = getHeaderByLabel('Date');
    const indexHeader = getHeaderByLabel('Index');

    expect(dateHeader?.className).toContain('cursor-pointer');
    expect(indexHeader?.className).not.toContain('cursor-pointer');
  });

  it('renders ascending and descending sort arrows for active column', () => {
    const { rerender } = render(
      <table>
        <TableHeader
          visibleColumns={visibleColumns}
          sortKey="date"
          sortOrder="asc"
          onChange={onSort}
        />
      </table>,
    );

    expect(getHeaderByLabel('Date')?.textContent).toContain('▲');

    rerender(
      <table>
        <TableHeader
          visibleColumns={visibleColumns}
          sortKey="date"
          sortOrder="desc"
          onChange={onSort}
        />
      </table>,
    );

    expect(getHeaderByLabel('Date')?.textContent).toContain('▼');
  });

  it('does not render sort arrow for non-active columns', () => {
    render(
      <table>
        <TableHeader
          visibleColumns={visibleColumns}
          sortKey="channel_name"
          sortOrder="asc"
          onChange={onSort}
        />
      </table>,
    );

    const dateText = getHeaderByLabel('Date')?.textContent ?? '';
    expect(dateText.includes('▲')).toBe(false);
    expect(dateText.includes('▼')).toBe(false);
  });

  it('calls onSort when clicking sortable column', () => {
    render(
      <table>
        <TableHeader
          visibleColumns={visibleColumns}
          sortKey={null}
          sortOrder="asc"
          onChange={onSort}
        />
      </table>,
    );

    fireEvent.click(getHeaderByLabel('Date')!);

    expect(onSort).toHaveBeenCalledTimes(1);
    expect(onSort).toHaveBeenCalledWith('date');
  });

  it('does not call onSort when clicking non-sortable column', () => {
    render(
      <table>
        <TableHeader
          visibleColumns={visibleColumns}
          sortKey={null}
          sortOrder="asc"
          onChange={onSort}
        />
      </table>,
    );

    fireEvent.click(getHeaderByLabel('Index')!);

    expect(onSort).not.toHaveBeenCalled();
  });

  it('handles empty visibleColumns without rendering headers', () => {
    render(
      <table>
        <TableHeader visibleColumns={[]} sortKey={null} sortOrder="asc" onChange={onSort} />
      </table>,
    );

    expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
  });

  it('matches snapshot for sorted state', () => {
    const { container } = render(
      <table>
        <TableHeader
          visibleColumns={visibleColumns}
          sortKey="date"
          sortOrder="asc"
          onChange={onSort}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
