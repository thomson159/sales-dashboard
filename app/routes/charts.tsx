import { DashboardCharts } from '~/components/Dashboard/DashboardCharts';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Dashboard' }];
}

export default function Charts() {
  return <DashboardCharts />;
}
