import { memo, useMemo } from 'react';
import { index } from '~/consts';
import type { TableBodyProps } from '~/types/components.types';
import type { ColumnKey } from '~/types/types';
import { normalizeChannelName } from '~/utils/utils';

const TableBodyComponent = ({ data, visibleColumns }: TableBodyProps) => {
  const visibleSet: Set<ColumnKey> = useMemo(() => new Set(visibleColumns), [visibleColumns]);

  return (
    <tbody>
      {data.map((s, i) => (
        <tr
          key={`${s.date}-${s.channel_name}-${s.order_status_id}-${s.sum_sales}-${s.count_orders}`}
          className={`${i % 2 === 0 ? 'odd' : 'even'}`}
        >
          {visibleSet.has(index) && (
            <td className={`px-3 py-2 whitespace-nowrap text-left`}>{i + 1}</td>
          )}
          {visibleSet.has('date') && (
            <td className={`px-3 py-2 whitespace-nowrap text-left`}>{s.date ?? '-'}</td>
          )}
          {visibleSet.has('channel_name') && (
            <td className={`px-3 py-2 whitespace-nowrap text-left`}>
              {normalizeChannelName(s.channel_name) ?? '-'}
            </td>
          )}
          {visibleSet.has('order_status_id') && (
            <td className={`px-3 py-2 whitespace-nowrap text-left`}>{s.order_status_id ?? '-'}</td>
          )}
          {visibleSet.has('sum_sales') && (
            <td className={`px-3 py-2 whitespace-nowrap text-left`}>{s.sum_sales.toFixed(2)}</td>
          )}
          {visibleSet.has('count_orders') && (
            <td className={`px-3 py-2 whitespace-nowrap text-left`}>{s.count_orders}</td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export const TableBody = memo(TableBodyComponent);
