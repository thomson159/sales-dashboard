import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { parseISO, format } from 'date-fns';
import { BLUE } from '~/consts';
import { memo } from 'react';
import type { SalesProps } from '~/types/components.types';

const SalesOverTime = ({ data }: SalesProps) => {
  const interval = data.length > 0 ? Math.ceil(data.length / 5) : 0;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          interval={interval}
          tickFormatter={(date) => format(parseISO(date), 'MMM dd')}
          minTickGap={20}
          stroke="black"
          fontSize={12}
        />
        <YAxis stroke="black" fontSize={12} />
        <Tooltip
          content={({ payload, label }) => {
            if (!payload || payload.length === 0) return null;

            return (
              <div className="tooltip px-2 py-1">
                <div>{label}</div>
                {payload.map((p) => (
                  <div key={p.dataKey}>{p.value.toFixed(2)}</div>
                ))}
              </div>
            );
          }}
        />
        <Line type="monotone" dataKey="revenue" stroke={BLUE} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default memo(SalesOverTime);
