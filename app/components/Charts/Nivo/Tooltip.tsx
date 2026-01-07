import type { LineTooltipPoint, BarTooltipPropsTyped } from '~/components/Charts/Nivo/charts.types';
import { normalizeChannelName } from '~/utils/utils';

export const LineTooltip = ({ point }: { point: LineTooltipPoint }) => (
  <div className="bg-white px-2 py-1 shadow rounded text-sm" style={{ whiteSpace: 'nowrap' }}>
    <div>{point.data.x}</div>
    <strong>{point.data.y.toFixed(2)}</strong>
  </div>
);

export const BarTooltip = ({ value, indexValue }: BarTooltipPropsTyped) => (
  <div className="bg-white px-2 py-1 shadow rounded text-sm">
    {typeof indexValue === 'string' ? normalizeChannelName(indexValue) : indexValue}
    <br />
    <strong>{value.toFixed(2)}</strong>
  </div>
);
