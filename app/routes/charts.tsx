import { Dashboard } from '~/components/Dashboard/Dashboard';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Charts' }, { name: 'description', content: 'Charts' }];
}

export default function Charts() {
  return <Dashboard chartsAreVisible={true} />;
}
