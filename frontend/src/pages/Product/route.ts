import { Route } from '@tanstack/react-router';
import { z } from 'zod';

import { PokemonEnum } from '../../__generated__/graphql';
import { rootRoute } from '../../main';
import Main from './Main';

const productParamsSchema = z.object({
  pokemon: z.nativeEnum(PokemonEnum),
});

export const productRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'pokemon/$pokemon',
  component: Main,
  parseParams: (params) => {
    const parsedParams = productParamsSchema.safeParse({
      pokemon: params.pokemon,
    });
    if (parsedParams.success) return parsedParams.data;
    // Router is programed to show error page if you throw here. I know routes beforehand thanks to enum.
    else throw parsedParams.error;
  },
  stringifyParams: (params) => ({
    ...params,
    pokemon: params.pokemon as string,
  }),
});
