import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TableBody } from '~/components/Table/TableBody';
import { index } from '~/consts';
import type { SaleArray } from '~/types/types';
import * as utils from '~/utils/utils';

const normalizeChannelNameMock = vi.spyOn(utils, 'normalizeChannelName');

const data: SaleArray = [
  {
    date: '2025-01-01',
    channel_name: 'chan1',
    order_status_id: 1,
    sum_sales: 100.5,
    count_orders: 2,
  },
  {
    date: '',
    channel_name: '',
    order_status_id: 0,
    sum_sales: 50,
    count_orders: 1,
  },
];

describe('TableBody', () => {
  beforeEach(() => {
    normalizeChannelNameMock.mockImplementation((name) => name || '-');
  });

  it('renders index column', () => {
    render(
      <table>
        <TableBody data={data} visibleColumns={[index]} />
      </table>,
    );
    expect(screen.getByText('1')).toBeDefined();
    expect(screen.getByText('2')).toBeDefined();
  });

  it('renders date column with fallback', () => {
    render(
      <table>
        <TableBody data={data} visibleColumns={['date']} />
      </table>,
    );

    expect(screen.getByText('2025-01-01')).toBeDefined();
    const fallbacks = screen.getAllByText((content) => content === '-' || content.trim() === '');
    expect(fallbacks.length).toBeGreaterThan(0);
  });

  it('renders channel_name column with normalization', () => {
    render(
      <table>
        <TableBody data={data} visibleColumns={['channel_name']} />
      </table>,
    );
    expect(screen.getByText('chan1')).toBeDefined();
    expect(screen.getByText('-')).toBeDefined();
  });

  it('renders order_status_id column with fallback', () => {
    render(
      <table>
        <TableBody data={data} visibleColumns={['order_status_id']} />
      </table>,
    );
    expect(screen.getByText('1')).toBeDefined();
    expect(screen.getByText('0')).toBeDefined();
  });

  it('renders sum_sales column with 2 decimals', () => {
    render(
      <table>
        <TableBody data={data} visibleColumns={['sum_sales']} />
      </table>,
    );
    expect(screen.getByText('100.50')).toBeDefined();
    expect(screen.getByText('50.00')).toBeDefined();
  });

  it('renders count_orders column', () => {
    render(
      <table>
        <TableBody data={data} visibleColumns={['count_orders']} />
      </table>,
    );
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('1')).toBeDefined();
  });

  it('applies odd/even row classes', () => {
    render(
      <table>
        <TableBody data={data} visibleColumns={[]} />
      </table>,
    );
    const rows = screen.getAllByRole('row');
    expect(rows[0].className).toContain('odd');
    expect(rows[1].className).toContain('even');
  });

  it('matches snapshot for all columns', () => {
    const { container } = render(
      <table>
        <TableBody
          data={data}
          visibleColumns={[
            'index',
            'date',
            'channel_name',
            'order_status_id',
            'sum_sales',
            'count_orders',
          ]}
        />
      </table>,
    );
    expect(container).toMatchSnapshot();
  });
});
