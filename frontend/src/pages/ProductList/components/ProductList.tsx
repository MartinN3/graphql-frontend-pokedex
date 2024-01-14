import { useMemo } from 'react';

import { useGetPaginatedPokemonCardQuery } from '../../../__generated__/graphql.ts';
import { PRODUCTS_PER_PAGE } from '../constants.ts';
import { productsRoute } from '../route.ts';
import Product from './Product.tsx';

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
        {[...Array(PRODUCTS_PER_PAGE).keys()].map((_, i) => (
          <Product data={data?.getAllPokemon[i]} key={i} />
        ))}
      </div>
    </div>
  );
}
