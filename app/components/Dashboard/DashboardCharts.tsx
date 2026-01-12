import type { SaleData } from '~/types/types';
import Charts from '../Charts/Recharts/Charts';
import { useOutletContext } from 'react-router';
import { Button } from '../small/Button';
import { useNavigateWithFilters } from '~/hooks/useNavigateWithFilters';

export const DashboardCharts = () => {
  const { data } = useOutletContext<SaleData>();

  const navigate = useNavigateWithFilters();

  return (
    <>
      <Charts data={data} />
      <div className="flex justify-center">
        <Button onClick={() => navigate('/')}>Show Table</Button>
      </div>
    </>
  );
};
