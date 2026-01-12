import { Dashboard } from '~/components/Dashboard/Dashboard';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Dashboard' }];
}

export default function All() {
  return <Dashboard />;
}
