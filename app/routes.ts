import { type RouteConfig, index, route } from '@react-router/dev/routes';

// When there is no appropriate route for a given path.
// The console error can be easily removed by adding an appropriate error route, e.g. a 404 page.

// Error: No route matches URL "/robots.txt"
// ...
// No routes matched location "/robots.txt"

// Important: if we add such a route, performance and SEO scores in Lighthouse may drop significantly — for example, from 100% to around 70%.

export default [
  route('/', 'routes/_layout.tsx', [
    index('routes/home.tsx'),   
    route('charts', 'routes/charts.tsx'), 
  ]),
  // route('*', 'routes/notFound.tsx'),
] satisfies RouteConfig;
