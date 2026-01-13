import { DashboardHome } from '~/components/Dashboard/DashboardHome';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Dashboard' }];
}

export default function Home() {
  return <DashboardHome />;
}
