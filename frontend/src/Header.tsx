import { Link } from '@tanstack/react-router';

import PokemonLogo from './assets/International_Pokemon_logo.svg?react';
import { indexRoute } from './pages/Index/route';
import { productsRoute } from './pages/ProductList/route';

export default function Header() {
  return (
    <section className="container mx-auto px-4">
      <nav className="flex flex-wrap items-center py-7 bg-blueGray-900">
        <Link className="inline-block text-lg font-bold" to={indexRoute.to}>
          <PokemonLogo />
        </Link>
        <ul className="flex w-auto space-x-12 ml-auto">
          <li>
            <Link
              to={productsRoute.to}
              className="inline-flex items-center font-medium"
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
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
