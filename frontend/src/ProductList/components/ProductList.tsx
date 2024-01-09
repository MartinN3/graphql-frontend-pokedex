import { gql } from '@apollo/client';
import { useEffect } from 'react';

import { useGetPaginatedPokemonQuery } from '../../__generated__/graphql';
import { PRODUCTS_PER_PAGE } from '../../constants';
import { productsRoute } from '../route';
import Product from './Product';

// @ts-expect-error TODO move to .graphql? no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GET_POKEMON_LIST = gql`
  query getPaginatedPokemon($offset: Int, $limit: Int, $reverse: Boolean) {
    getAllPokemon(offset: $offset, take: $limit, reverse: $reverse) {
      weight
      species
      sprite
      baseStats {
        attack
        defense
        hp
        speed
      }
    }
  }
`;

export default function ProductList() {
  const { page, order } = productsRoute.useSearch();
  const { loading, error, data, fetchMore } = useGetPaginatedPokemonQuery({
    variables: {
      offset: page * PRODUCTS_PER_PAGE,
      limit: PRODUCTS_PER_PAGE,
      reverse: order === 'ascending',
    },
  });

  useEffect(() => {
    fetchMore({
      variables: {
        offset: page * PRODUCTS_PER_PAGE,
        limit: PRODUCTS_PER_PAGE,
        reverse: order === 'ascending',
      },
    });
  }, [fetchMore, order, page]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20 gap-4">
      {data?.getAllPokemon.map((pokemon) => <Product data={pokemon} />)}
    </div>
  );
}
