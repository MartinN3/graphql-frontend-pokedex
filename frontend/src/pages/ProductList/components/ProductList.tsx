import { AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

import { useGetPaginatedPokemonCardQuery } from '../../../__generated__/graphql.ts';
import PokemonCardWithAnimation from '../../../components/PokemonCard/PokemonCardWithAnimation.tsx';
import { PRODUCTS_PER_PAGE } from '../constants.ts';
import { productsRoute } from '../route.ts';

const calculatePageOffset = (page: number) => (page - 1) * PRODUCTS_PER_PAGE;

export default function ProductList() {
  const searchParams = productsRoute.useSearch();
  const offset = useMemo(
    () => calculatePageOffset(searchParams.page),
    [searchParams.page],
  );

  const { data } = useGetPaginatedPokemonCardQuery({
    variables: {
      offset,
      limit: PRODUCTS_PER_PAGE,
      reverse: searchParams.order === 'ascending',
    },
  });

  return (
    <div>
      <div className="text-xl">List with animations, cache merge and abort</div>
      <div className="pokemon-cards-grid my-5 lg:my-20">
        <AnimatePresence>
          {[...Array(PRODUCTS_PER_PAGE).keys()].map((_, i) => (
            <PokemonCardWithAnimation data={data?.getAllPokemon[i]} key={i} />
          ))}
          {/* {data?.getAllPokemon.map((pokemon) => (
            <Product data={pokemon} key={pokemon.key} />
          ))} */}
        </AnimatePresence>
      </div>
    </div>
  );
}
