import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TableHeader } from '~/components/Table/TableHeader';
import { asc, COLUMNS, desc, index as indexKey } from '~/consts';
import type { Column, ColumnKey } from '~/types/types';

const columns: Column[] = [
  { key: indexKey, label: 'Index', sortable: false },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'channel_name', label: 'Channel', sortable: true },
  { key: 'sum_sales', label: 'Sales', sortable: true },
];

const visibleColumns: ColumnKey[] = ['date', 'channel_name', 'sum_sales', indexKey];

describe('TableHeader', () => {
  it('renders only visible columns', () => {
    render(
      <table>
        <TableHeader
          columns={columns}
          visibleColumns={['date', 'sum_sales', indexKey]}
          sortKey={null}
          sortOrder={null}
          onSort={vi.fn()}
        />
      </table>,
    );

    expect(screen.getByText('Date')).toBeDefined();
    expect(screen.getByText('Sales')).toBeDefined();
    expect(screen.queryByText('Channel')).toBeNull();
    expect(screen.getByText('Index')).toBeDefined();
  });

  it('adds cursor-pointer class for sortable columns except index', () => {
    render(
      <table>
        <TableHeader
          columns={columns}
          visibleColumns={visibleColumns}
          sortKey={null}
          sortOrder={null}
          onSort={vi.fn()}
        />
      </table>,
    );
    const dateHeader = screen.getByText((content) => content.includes('Date')).closest('th');
    const indexHeader = screen.getByText((content) => content.includes('Index')).closest('th');
    expect(dateHeader?.className).toContain('cursor-pointer');
    expect(indexHeader?.className).not.toContain('cursor-pointer');
  });

  it('renders sort arrow for active sorted column', () => {
    const { rerender } = render(
      <table>
        <TableHeader
          columns={columns}
          visibleColumns={visibleColumns}
          sortKey="date"
          sortOrder={asc}
          onSort={vi.fn()}
        />
      </table>,
    );
    expect(screen.getByText((content) => content.includes('Date'))?.textContent).toContain('▲');

    rerender(
      <table>
        <TableHeader
          columns={columns}
          visibleColumns={visibleColumns}
          sortKey="date"
          sortOrder={desc}
          onSort={vi.fn()}
        />
      </table>,
    );
    expect(screen.getByText((content) => content.includes('Date'))?.textContent).toContain('▼');
  });

  it('does not render sort arrow for non-sorted columns', () => {
    render(
      <table>
        <TableHeader
          columns={columns}
          visibleColumns={visibleColumns}
          sortKey="channel_name"
          sortOrder={asc}
          onSort={vi.fn()}
        />
      </table>,
    );
    expect(screen.getByText((content) => content.includes('Date'))?.textContent).not.toContain('▲');
    expect(screen.getByText((content) => content.includes('Date'))?.textContent).not.toContain('▼');
  });

  it('calls onSort correctly on successive clicks', () => {
    const onSortMock = vi.fn();
    const visibleColumns = COLUMNS.map((c) => c.key);
    const { getByText, rerender } = render(
      <table>
        <TableHeader
          columns={COLUMNS}
          visibleColumns={visibleColumns}
          sortKey={null}
          sortOrder="asc"
          onSort={onSortMock}
        />
      </table>,
    );

    const dateHeader = getByText('Date');

    fireEvent.click(dateHeader);
    expect(onSortMock).toHaveBeenLastCalledWith('date');

    rerender(
      <table>
        <TableHeader
          columns={COLUMNS}
          visibleColumns={visibleColumns}
          sortKey="date"
          sortOrder="asc"
          onSort={onSortMock}
        />
      </table>,
    );
    fireEvent.click(dateHeader);
    expect(onSortMock).toHaveBeenLastCalledWith('date');

    rerender(
      <table>
        <TableHeader
          columns={COLUMNS}
          visibleColumns={visibleColumns}
          sortKey="date"
          sortOrder="desc"
          onSort={onSortMock}
        />
      </table>,
    );
    fireEvent.click(dateHeader);
    expect(onSortMock).toHaveBeenLastCalledWith('date');
  });

  it('does nothing when clicking non-sortable column', () => {
    const onSortMock = vi.fn();
    render(
      <table>
        <TableHeader
          columns={columns}
          visibleColumns={visibleColumns}
          sortKey={null}
          sortOrder={asc}
          onSort={onSortMock}
        />
      </table>,
    );
    const indexHeader = screen.getByText((content) => content.includes('Index')).closest('th');
    if (!indexHeader) throw new Error('Index header not found');

    fireEvent.click(indexHeader);
    expect(onSortMock).not.toHaveBeenCalled();
  });

  it('handles empty visibleColumns gracefully', () => {
    render(
      <table>
        <TableHeader
          columns={columns}
          visibleColumns={[]}
          sortKey={null}
          sortOrder={asc}
          onSort={vi.fn()}
        />
      </table>,
    );
    columns.forEach((col) => {
      expect(screen.queryByText(col.label)).toBeNull();
    });
  });

  it('matches snapshot', () => {
    const { container } = render(
      <table>
        <TableHeader
          columns={columns}
          visibleColumns={visibleColumns}
          sortKey="date"
          sortOrder={asc}
          onSort={vi.fn()}
        />
      </table>,
    );
    expect(container).toMatchSnapshot();
  });
});
