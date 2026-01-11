import type { SaleData } from '~/types/types';
import Charts from '../Charts/Recharts/Charts';
import { useNavigate, useOutletContext } from 'react-router';
import { Button } from '../small/Button';

export const DashboardCharts = () => {
  const { data } = useOutletContext<SaleData>();

  const navigate = useNavigate();

  return (
    <>
      <Charts data={data} />
      <div className="flex justify-center">
        <Button onClick={() => navigate("/")}>Show Table</Button>
      </div>
    </>
  );
};
