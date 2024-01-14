import { Link, useMatchRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';

import PokemonLogo from './assets/International_Pokemon_logo.svg?react';
import { favoritesRoute } from './pages/FavoriteList/route';
import { indexRoute } from './pages/Index/route';
import { productsRoute } from './pages/ProductList/route';

export default function Header() {
  const matchRoute = useMatchRoute();

  return (
    <section className="container mx-auto px-4">
      <nav className="flex flex-wrap items-center py-7 bg-blueGray-900">
        <Link className="inline-block text-lg font-bold" to={indexRoute.to}>
          <PokemonLogo />
        </Link>
        <ul className="flex w-auto space-x-12 ml-auto">
          <li>
            <Link
              to={indexRoute.to}
              className="inline-flex items-center font-medium"
              inactiveProps={{
                className: 'text-sky-700',
              }}
              activeProps={{
                className: 'text-yellow-500',
              }}
              activeOptions={{
                includeSearch: false,
              }}
            >
              <span className="ml-3">Search</span>
            </Link>
          </li>
          <li></li>
        </ul>
      </nav>
      <nav className="grid grid-cols-2 text-center py-4">
        <Link
          to={productsRoute.to}
          className="items-center font-medium"
          search={{ page: 1, order: 'ascending' }}
          inactiveProps={{
            className: 'text-sky-700',
          }}
          activeProps={{
            className: 'text-yellow-500',
          }}
          activeOptions={{
            includeSearch: false,
          }}
        >
          <span className="ml-3">Pokémon</span>
          {matchRoute({ to: productsRoute.path }) ? (
            <motion.div
              className="underline h-1 bg-yellow-500 mt-2"
              layoutId="underline"
            />
          ) : null}
        </Link>
        <Link
          to={favoritesRoute.to}
          className="items-center font-medium"
          inactiveProps={{
            className: 'text-sky-700',
          }}
          activeProps={{
            className: 'text-yellow-500',
          }}
        >
          <span className="ml-3">Favorite</span>
          {matchRoute({ to: favoritesRoute.path }) ? (
            <motion.div
              className="underline h-1 bg-yellow-500 mt-2"
              layoutId="underline"
            />
          ) : null}
        </Link>
      </nav>
    </section>
  );
}
