import { Route } from '@tanstack/react-router';
import { z } from 'zod';

import { rootRoute } from '../../main';
import Main from './Main';
import { PRODUCT_LIST_ORDER } from './constants';

const productSearchSchema = z.object({
  page: z.number().catch(1),
  order: z.enum(PRODUCT_LIST_ORDER).catch(PRODUCT_LIST_ORDER['0']).optional(),
});

export type ProductListSearch = z.infer<typeof productSearchSchema>;

export const productsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'pokedex/list',
  component: Main,
  validateSearch: productSearchSchema,
});
