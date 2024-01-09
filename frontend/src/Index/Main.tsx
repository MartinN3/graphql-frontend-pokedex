import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';

import { useGetFuzzyPokemonLazyQuery } from '../__generated__/graphql';

// @ts-expect-error TODO move to .graphql? no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GET_FUZZY_POKEMON = gql`
  query GetFuzzyPokemon($pokemon: String!, $take: Int) {
    getFuzzyPokemon(pokemon: $pokemon, take: $take) {
      weight
      species
      sprite
    }
  }
`;

export default function Index() {
  const [searchValue, setSearchValue] = useState('');
  const [searchPokemons, { loading, error, data }] =
    useGetFuzzyPokemonLazyQuery();

  // TODO could implement debounce
  useEffect(() => {
    if (!searchValue) return;

    searchPokemons({
      variables: {
        pokemon: searchValue,
        take: 4,
      },
    });
  }, [searchPokemons, searchValue]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="max-w-2xl mx-auto">
      <input
        className="py-4 px-4 relative border border-yellow-500 w-full"
        placeholder="Search"
        value={searchValue}
        autoFocus
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {searchValue &&
        data?.getFuzzyPokemon.map((item) => <div>{JSON.stringify(item)}</div>)}
    </div>
  );
}
