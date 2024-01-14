import { Route } from '@tanstack/react-router';

import { rootRoute } from '../../main';
import Main from './Main';

export const favoritesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'pokedex/favorites',
  component: Main,
});
