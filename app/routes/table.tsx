// import { DashboardTable } from '~/components/Dashboard/DashboardTable';
import type { Route } from './+types/home';

export function meta({ }: Route.MetaArgs) {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Dashboard' }];
}

export default function Table() {
  return <div>dummy</div>;
}
