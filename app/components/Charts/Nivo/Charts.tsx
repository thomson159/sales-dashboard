// import { memo, useMemo, useState } from 'react';
// import { ResponsiveLine } from '@nivo/line';
// import { ResponsiveBar } from '@nivo/bar';
// import { useIsMobileCharts } from '~/hooks/useIsMobile';
// import type { BarData, BarOption, DashboardChartsProps, LineOption, LineSeries } from './charts.types';
// import { BLUE } from '~/consts';
// import { BarTooltip, LineTooltip } from './Tooltip';
// import { aggregateBarData, aggregateLineData, buildChannelColorMap, buildLineTicks } from './charts.utils';
// import { LINE_OPTIONS, BAR_OPTIONS, LINE_COMMON_PROPS, BAR_COMMON_PROPS } from './charts.const';

// const ChartsComponent = ({ salesData }: DashboardChartsProps) => {
//   const isMobile: boolean = useIsMobileCharts();
//   const [lineOption, setLineOption] = useState<LineOption>(LINE_OPTIONS[0]);
//   const [barOption, setBarOption] = useState<BarOption>(BAR_OPTIONS[0]);

//   const toggleLineOption = () =>
//     setLineOption((prev) => (prev.id === LINE_OPTIONS[0].id ? LINE_OPTIONS[1] : LINE_OPTIONS[0]));

//   const toggleBarOption = () =>
//     setBarOption((prev) => (prev.label === BAR_OPTIONS[0].label ? BAR_OPTIONS[1] : BAR_OPTIONS[0]));

//   const hasData: boolean = salesData.length > 0;

//   const aggregatedLineData: LineSeries[] = useMemo(
//     () => aggregateLineData(salesData, lineOption.key, lineOption.id),
//     [salesData, lineOption],
//   );

//   const aggregatedBarData: BarData[] = useMemo(
//     () => aggregateBarData(salesData, barOption.key, barOption.label),
//     [salesData, barOption],
//   );

//   const sanitizedLineData = useMemo(
//     () =>
//       hasData
//         ? aggregatedLineData.map((series) => ({
//           ...series,
//           data: series.data.map((point) => ({
//             x: point.x,
//             y: typeof point.y === 'number' && !isNaN(point.y) ? point.y : 0,
//           })),
//         }))
//         : [],
//     [aggregatedLineData, hasData],
//   );

//   const sanitizedBarData = useMemo(
//     () =>
//       hasData
//         ? aggregatedBarData.map((item) => {
//           const key = barOption.label as keyof BarData;
//           const value = item[key];
//           return {
//             ...item,
//             [key]: typeof value === 'number' && !isNaN(value) ? value : 0,
//             channel: item.channel ?? 'Unknown',
//           };
//         })
//         : [],
//     [aggregatedBarData, barOption, hasData],
//   );

//   if (!hasData) return null;

//   const channelColorMap = buildChannelColorMap(sanitizedBarData);

//   const lineTicks = (() => {
//     const ticks = buildLineTicks(sanitizedLineData, isMobile);
//     return ticks.length ? ticks : ['0'];
//   })();

//   return (
//     <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       <div className="h-100">
//         <div className="mb-2">
//           <button
//             type="button"
//             onClick={toggleLineOption}
//             className="w-full flex justify-between items-center text-lg font-semibold bg-transparent cursor-pointer outline-none focus:outline-none"
//           >
//             <span className="ml-3">{lineOption.id}</span>
//             <span className="mr-10">⬌</span>
//           </button>
//         </div>
//         <ResponsiveLine
//           {...LINE_COMMON_PROPS}
//           data={sanitizedLineData}
//           colors={[BLUE]}
//           axisBottom={{ tickValues: lineTicks }}
//           tooltip={LineTooltip}
//         />
//       </div>
//       <div className="h-100">
//         <div className="mb-2">
//           <button
//             type="button"
//             onClick={toggleBarOption}
//             className="w-full flex justify-between items-center text-lg font-semibold bg-transparent cursor-pointer outline-none focus:outline-none"
//           >
//             <span className="ml-3">{barOption.label}</span>
//             <span className="mr-10">⬌</span>
//           </button>
//         </div>
//         <ResponsiveBar
//           {...BAR_COMMON_PROPS}
//           data={sanitizedBarData}
//           keys={[barOption.label as keyof BarData]}
//           indexBy="channel"
//           colors={({ indexValue }: { indexValue: string }) => channelColorMap[indexValue] ?? '#000'}
//           axisBottom={isMobile ? null : undefined}
//           tooltip={BarTooltip}
//         />
//       </div>
//     </section>
//   );
// };

// const Charts = memo(ChartsComponent);
// export default Charts;
