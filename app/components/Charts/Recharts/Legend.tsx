import { CHARTS_COLORS as COLORS } from '~/consts';
import type { RevenueProps } from '~/types/components.types';
import type { RevenuePerChannelItem } from '~/types/types';

const Legend = ({ data }: RevenueProps) => (
  <div className="w-full flex flex-wrap justify-end gap-3 mt-3">
    {data.map((entry: RevenuePerChannelItem, index: number) => (
      <div key={entry.channel} className="flex items-center gap-1.5 text-sm max-w-full">
        <span
          className="w-3 h-3 rounded-sm flex-shrink-0"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        />
        <span className="break-words">{entry.channel}</span>
      </div>
    ))}
  </div>
);

export default Legend;
