import type { SaleArray } from '~/types/types';
import {
  getRevenuePerChannel,
  getSalesOverTime,
  type RevenuePerChannelItem,
  type SalesOverTimeItem,
} from './charts.utils';
import { lazy, Suspense, useMemo } from 'react';
import { Spinner } from '~/components/small/Spinner';
import { useIsMobileCharts } from '~/hooks/useIsMobile';

const RevenuePerChannel = lazy(() => import('./RevenuePerChannel'));
const SalesOverTime = lazy(() => import('./SalesOverTime'));
const Legend = lazy(() => import('./Legend'));

type Props = {
  data: SaleArray;
};

export const Chart = ({ data }: Props) => {
  const salesOverTimeArray: SalesOverTimeItem[] = useMemo(() => getSalesOverTime(data), [data]);
  const channelArray: RevenuePerChannelItem[] = useMemo(() => getRevenuePerChannel(data), [data]);
  const isMobile: boolean = useIsMobileCharts();

  return (
    <div className={`flex gap-8 mb-8 ${isMobile ? 'flex-col' : 'flex-row'}`}>
      <div className="bg-color flex-1 p-4 rounded-lg shadow-sm min-h-[376px]">
        <h3 className="mb-4 text-lg font-medium">Sales Over Time</h3>
        {salesOverTimeArray.length > 0 && (
          <Suspense fallback={<Spinner />}>
            <SalesOverTime data={salesOverTimeArray} />
          </Suspense>
        )}
      </div>
      <div className="bg-color flex-1 p-4 rounded-lg shadow-sm min-h-[376px]">
        <h3 className="mb-4 text-lg font-medium">Revenue per Channel</h3>
        {channelArray.length > 0 && (
          <>
            <Suspense fallback={<Spinner />}>
              <RevenuePerChannel data={channelArray} />
            </Suspense>
            {isMobile && (
              <Suspense>
                <Legend data={channelArray} />
              </Suspense>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Chart;
