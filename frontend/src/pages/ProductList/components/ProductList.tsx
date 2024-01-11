import { gql } from '@apollo/client';
import { useEffect, useMemo } from 'react';

import { useGetPaginatedPokemonQuery } from '../../../__generated__/graphql.ts';
import { PRODUCTS_PER_PAGE } from '../constants.ts';
import { productsRoute } from '../route.ts';
import Product from './Product.tsx';

// @ts-expect-error TODO move to .graphql? no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GET_POKEMON_LIST = gql`
  query getPaginatedPokemon($offset: Int, $limit: Int, $reverse: Boolean) {
    getAllPokemon(offset: $offset, take: $limit, reverse: $reverse) {
      weight
      species
      sprite
      key
      baseStats {
        attack
        defense
        hp
        speed
        specialattack
        specialdefense
      }
    }
  }
`;

const calculatePageOffset = (page: number) => (page - 1) * PRODUCTS_PER_PAGE;

export default function ProductList() {
  const searchParams = productsRoute.useSearch();
  const offset = useMemo(
    () => calculatePageOffset(searchParams.page),
    [searchParams.page],
  );

  const { error, data, fetchMore } = useGetPaginatedPokemonQuery({
    variables: {
      offset,
      limit: PRODUCTS_PER_PAGE,
      reverse: searchParams.order === 'ascending',
    },
  });

  useEffect(() => {
    fetchMore({
      variables: {
        offset,
        limit: PRODUCTS_PER_PAGE,
        reverse: searchParams.order === 'ascending',
      },
    });
  }, [fetchMore, offset, searchParams.order]);

  if (error) return `Error! ${error.message}`;

  return (
    <div className="pokemon-cards-grid my-5 lg:my-20">
      {[...Array(PRODUCTS_PER_PAGE).keys()].map((_, i) => (
        <Product
          data={data?.getAllPokemon[i]}
          key={data?.getAllPokemon[i]?.key ?? i}
        />
      ))}
    </div>
  );
}