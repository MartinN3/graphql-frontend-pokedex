import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import {
  Outlet,
  RootRoute,
  Router,
  RouterProvider,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Header from './Header.tsx';
import { Pokemon, StrictTypedTypePolicies } from './__generated__/graphql.ts';
import './main.css';
import { indexRoute } from './pages/Index/route.ts';
import { productRoute } from './pages/Product/route.ts';
import { PRODUCTS_PER_PAGE } from './pages/ProductList/constants.ts';
import { productsRoute } from './pages/ProductList/route.ts';

// TODO decompose router to configs
export const rootRoute = new RootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productRoute,
]);

const router = new Router({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const favoritePokemonVar = makeVar<Pokemon['key'][]>([]);

const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      getAllPokemon: {
        ...offsetLimitPagination(['reverse']),
        // @ts-expect-error TODO args are not typed
        read(existing, { args: { offset, limit = PRODUCTS_PER_PAGE } }) {
          const resultArray =
            existing && existing.slice(offset, offset + limit);
          return resultArray?.filter(Boolean).length ? resultArray : undefined;
        },
      },
      getAllFavoritePokemon: {
        read() {
          return favoritePokemonVar();
        },
      },
    },
  },
  Pokemon: {
    keyFields: ['key'],
    fields: {
      isInFavorites: {
        read(_, { variables }) {
          // @ts-expect-error TODO args are not typed
          return favoritePokemonVar().includes(variables.pokemon);
        },
      },
    },
  },
};

// TODO decompose to configs
const client = new ApolloClient({
  uri: import.meta.env.VITE_GQL_URL,
  defaultOptions: {
    query: {
      notifyOnNetworkStatusChange: true,
    },
  },
  cache: new InMemoryCache({
    canonizeResults: true,
    typePolicies,
  }),
  name: 'graphql-pokemon-client',
  version: '1.0',
  connectToDevTools: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ApolloProvider>,
);
