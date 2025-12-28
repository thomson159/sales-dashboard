import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { parseISO, format } from 'date-fns';
import { BLUE } from '~/consts';
import { memo } from 'react';

type Props = {
  data: { date: string; revenue: number }[];
};

const SalesOverTime = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={300} style={{ outline: 'none' }}>
      <LineChart data={data} style={{ outline: 'none' }}>
        <XAxis
          dataKey="date"
          interval={Math.ceil(data.length / 5)}
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
