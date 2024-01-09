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
import { indexRoute } from './Index/route.ts';
import { productsRoute } from './ProductList/route.ts';
import { PRODUCTS_PER_PAGE } from './constants.ts';
import './main.css';

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

const routeTree = rootRoute.addChildren([indexRoute, productsRoute]);

const router = new Router({ routeTree });

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
            keyArgs: ['order'],
            // @ts-expect-error TODO type args somehow
            read(existing, { args: { offset, limit = PRODUCTS_PER_PAGE } }) {
              return existing && existing.slice(offset, offset + limit);
            },
          },
        },
      },
    },
  }),
  name: 'graphql-pokemon-client',
  version: '1.0',
  queryDeduplication: false,
  connectToDevTools: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ApolloProvider>,
);