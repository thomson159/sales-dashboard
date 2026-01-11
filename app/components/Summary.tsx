import { memo } from 'react';
import type { SummaryItemProps } from '~/types/components.types';
import type { Metrics } from '~/types/types';
import { formatNumber } from '~/utils/utils';

const SummaryItem = ({ label, value }: SummaryItemProps) => (
  <div className="flex-1 min-w-[200px] rounded-lg panel px-6 py-3 flex flex-col items-center">
    <p className="text-sm font-semibold text-white">{label}</p>
    <div className="text-xl font-bold text-white flex items-center justify-center h-[38px]">
      {value}
    </div>
  </div>
);

export const SalesSummaryComponent = ({ totalRevenue, totalOrders, avgOrderValue }: Metrics) => {
  const summaryData = [
    { label: '🏆 Total Revenue', value: `${formatNumber(totalRevenue)} $` },
    { label: '📊 Total Orders', value: totalOrders },
    { label: '💰 Average Order Value', value: `${formatNumber(avgOrderValue)} $` },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {summaryData.map((item) => (
        <SummaryItem key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export const Summary = memo(SalesSummaryComponent);
