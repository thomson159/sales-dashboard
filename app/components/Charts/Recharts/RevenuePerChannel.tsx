import { memo } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import { CHARTS_COLORS as COLORS } from '~/consts';
import { useIsMobileCharts } from '~/hooks/useIsMobile';
import type { RevenueProps } from '~/types/components.types';
import { formatNumber } from '~/utils/utils';

const RevenuePerChannel = ({ data }: RevenueProps) => {
  const isMobile: boolean = useIsMobileCharts();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          fontSize={12}
          stroke="black"
          dataKey="channel"
          interval={0}
          minTickGap={20}
          hide={isMobile}
        />
        <YAxis
          fontSize={12}
          stroke="black"
          tickFormatter={(value) => (value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value)}
        />
        <Tooltip
          content={({ payload, label }) => {
            if (!payload || payload.length === 0) return null;

            return (
              <div className="tooltip px-2 py-1">
                <div>{label}</div>
                {payload.map((p) => (
                  <div key={p.dataKey}>{formatNumber(Number(p.value))}</div>
                ))}
              </div>
            );
          }}
        />
        <Bar dataKey="revenue">
          {data.map((entry, index) => (
            <Cell key={entry.channel} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default memo(RevenuePerChannel);
