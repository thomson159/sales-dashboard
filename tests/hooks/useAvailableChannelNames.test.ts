import { renderHook } from '@testing-library/react';
import { useAvailableChannelNames } from '~/hooks/useAvailableChannelNames';
import { normalizeChannelName } from '~/utils/utils';
import type { Sale } from '~/types/types';
import { describe, it, expect } from 'vitest';

describe('useAvailableChannelNames', () => {
  it('returns empty array when data is undefined', () => {
    const { result } = renderHook(() => useAvailableChannelNames([]));
    expect(result.current).toEqual([]);
  });

  it('returns empty array when data is empty', () => {
    const { result } = renderHook(() => useAvailableChannelNames([]));
    expect(result.current).toEqual([]);
  });

  it('returns unique normalized channel names', () => {
    const data: Sale[] = [
      {
        channel_name: 'A',
        sum_sales: 0,
        count_orders: 0,
        date: '',
        order_status_id: 0,
      },
      {
        channel_name: 'B',
        sum_sales: 0,
        count_orders: 0,
        date: '',
        order_status_id: 0,
      },
      {
        channel_name: 'A',
        sum_sales: 0,
        count_orders: 0,
        date: '',
        order_status_id: 0,
      },
    ];

    const { result } = renderHook(() => useAvailableChannelNames(data));
    expect(result.current).toEqual(['A', 'B']);
  });

  it('filters out empty channel names after normalization', () => {
    const data: Sale[] = [
      {
        channel_name: '',
        sum_sales: 0,
        count_orders: 0,
        date: '',
        order_status_id: 0,
      },
      {
        channel_name: 'B',
        sum_sales: 0,
        count_orders: 0,
        date: '',
        order_status_id: 0,
      },
    ];

    const { result } = renderHook(() => useAvailableChannelNames(data));
    expect(result.current).toEqual(['B']);
  });

  it('returns memoized value on subsequent renders', () => {
    const data: Sale[] = [
      {
        channel_name: 'X',
        sum_sales: 0,
        count_orders: 0,
        date: '',
        order_status_id: 0,
      },
    ];

    const { result, rerender } = renderHook(({ data }) => useAvailableChannelNames(data), {
      initialProps: { data },
    });

    const firstResult = result.current;

    rerender({ data });
    expect(result.current).toBe(firstResult);
  });

  it('normalizes all names correctly using real implementation', () => {
    const data: Sale[] = [
      {
        channel_name: '[ALLEGRO-PL]',
        sum_sales: 0,
        count_orders: 0,
        date: '',
        order_status_id: 0,
      },
      {
        channel_name: '[SHOPIFY_V2]',
        sum_sales: 0,
        count_orders: 0,
        date: '',
        order_status_id: 0,
      },
    ];

    const expected = data.map((d) => normalizeChannelName(d.channel_name));

    const { result } = renderHook(() => useAvailableChannelNames(data));
    expect(result.current).toEqual(expected);
  });
});
