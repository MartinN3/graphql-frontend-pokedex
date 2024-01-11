import { Route } from '@tanstack/react-router';

import { rootRoute } from '../../main';
import Main from './Main';

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Main,
});
