import { Route } from '@tanstack/react-router';
import { z } from 'zod';

import { rootRoute } from '../../main';
import Main from './Main';

const searchSearchSchema = z.object({
  search: z.string().optional(),
});

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'search',
  component: Main,
  validateSearch: searchSearchSchema,
});
