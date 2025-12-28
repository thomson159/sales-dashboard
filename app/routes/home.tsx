import type { Route } from './+types/home';
import { Dashboard } from '~/components/Dashboard/Dashboard';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Dashboard' }];
}

export default function Home() {
  return <Dashboard />;
}
