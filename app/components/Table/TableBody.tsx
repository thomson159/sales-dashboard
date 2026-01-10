import { memo, useMemo } from 'react';
import { index } from '~/consts';
import type { TableBodyProps } from '~/types/components.types';
import type { ColumnKey } from '~/types/types';
import { formatDate, formatNumber, normalizeChannelName } from '~/utils/utils';

const classes = 'px-3 py-2 whitespace-nowrap text-left';

const TableBodyComponent = ({ data, visibleColumns }: TableBodyProps) => {
  const visibleSet: Set<ColumnKey> = useMemo(() => new Set(visibleColumns), [visibleColumns]);

  return (
    <tbody>
      {data.map((s, i) => (
        <tr key={i} className={`${i % 2 === 0 ? 'odd' : 'even'}`}>
          {visibleSet.has(index) && <td className={classes}>{i + 1}</td>}
          {visibleSet.has('date') && <td className={classes}>{formatDate(s.date) || '-'}</td>}
          {visibleSet.has('channel_name') && (
            <td className={classes}>{normalizeChannelName(s.channel_name) || ''}</td>
          )}
          {visibleSet.has('order_status_id') && (
            <td className={classes}>{s.order_status_id || '-'}</td>
          )}
          {visibleSet.has('sum_sales') && (
            <td className={classes}>{formatNumber(s.sum_sales) || '-'}</td>
          )}
          {visibleSet.has('count_orders') && <td className={classes}>{s.count_orders || '-'}</td>}
        </tr>
      ))}
    </tbody>
  );
};

export const TableBody = memo(TableBodyComponent);
