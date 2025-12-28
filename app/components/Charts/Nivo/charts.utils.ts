// import type { BarData, LineSeries, LineDataPoint, MetricKey } from '~/components/Charts/Nivo/charts.types';
// import type { SaleArray } from '~/types/types';
// import { normalizeChannelName } from '../../../utils/utils';
// import { COLORS } from '~/consts';

// export const aggregateLineData = (
//   salesData: SaleArray,
//   key: MetricKey,
//   id: string,
// ): LineSeries[] => {
//   if (!salesData.length) return [];

//   const map = new Map<string, number>();
//   salesData.forEach((sale) => {
//     const day = sale.date.split('T')[0];
//     map.set(day, (map.get(day) || 0) + sale[key]);
//   });

//   return [
//     {
//       id,
//       data: Array.from(map.entries())
//         .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
//         .map(([x, y]) => ({ x, y })),
//     },
//   ];
// };

// export const aggregateBarData = (
//   salesData: SaleArray,
//   key: MetricKey,
//   label: string,
// ): BarData[] => {
//   if (!salesData.length) return [];

//   const map = new Map<string, number>();
//   salesData.forEach((sale) => {
//     const channel = normalizeChannelName(sale.channel_name) || 'Unknown';
//     map.set(channel, (map.get(channel) || 0) + sale[key]);
//   });

//   return Array.from(map.entries())
//     .map(([channel, value]) => ({
//       channel,
//       [label]: value,
//     }))
//     .sort((a, b) => Number(b[label]) - Number(a[label]));
// };

// export const buildChannelColorMap = (barData: readonly BarData[]): Record<string, string> => {
//   return barData.reduce<Record<string, string>>((acc, item, index) => {
//     acc[item.channel] = COLORS[index % COLORS.length];
//     return acc;
//   }, {});
// };

// export const buildLineTicks = (data: LineSeries[], isMobile: boolean): readonly string[] => {
//   const points: readonly LineDataPoint[] = data[0]?.data ?? [];
//   if (!points.length) return [];

//   if (isMobile) {
//     return [String(points[0].x), String(points[points.length - 1].x)];
//   }

//   const step = Math.max(1, Math.floor(points.length / 4));
//   return points.filter((_, i) => i % step === 0).map((p) => String(p.x));
// };
