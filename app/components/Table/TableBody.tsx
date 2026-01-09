import { memo, useMemo } from 'react';
import { index } from '~/consts';
import type { TableBodyProps } from '~/types/components.types';
import type { ColumnKey } from '~/types/types';
import { formatNumber, normalizeChannelName } from '~/utils/utils';

const TableBodyComponent = ({ data, visibleColumns }: TableBodyProps) => {
  const visibleSet: Set<ColumnKey> = useMemo(() => new Set(visibleColumns), [visibleColumns]);

  return (
    <tbody>
      {data.map((s, i) => (
        <tr key={i} className={`${i % 2 === 0 ? 'odd' : 'even'}`}>
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
            <td className={`px-3 py-2 whitespace-nowrap text-left`}>{formatNumber(s.sum_sales)}</td>
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
