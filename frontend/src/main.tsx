import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
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

// TODO decompose to configs
const client = new ApolloClient({
  uri: import.meta.env.VITE_GQL_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllPokemon: {
            ...offsetLimitPagination(),
            keyArgs: ['reverse'],
            // @ts-expect-error TODO type args somehow
            read(existing, { args: { offset, limit = PRODUCTS_PER_PAGE } }) {
              return existing && existing.slice(offset, offset + limit);
            },
          },
        },
      },
      Pokemon: {
        keyFields: ['key'],
        // @ts-expect-error TODO type client only somehow
        isInFavorites: {
          // @ts-expect-error TODO type args somehow
          read(_, { variables }) {
            // The read function for the isInCart field
            return localStorage?.getItem('FAVORITES')?.includes(variables.key);
          },
        },
      },
    },
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
