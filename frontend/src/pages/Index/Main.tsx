import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';

import { useGetFuzzyPokemonLazyQuery } from '../../__generated__/graphql';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

// @ts-expect-error TODO move to .graphql? no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GET_FUZZY_POKEMON = gql`
  query GetFuzzyPokemon($pokemon: String!, $take: Int) {
    getFuzzyPokemon(pokemon: $pokemon, take: $take) {
      weight
      species
      sprite
      key
      baseStats {
        attack
        defense
        hp
        speed
      }
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
    <div className="container px-4 mx-auto">
      <input
        className="py-4 px-4 relative border border-yellow-500 w-full"
        placeholder="Search"
        value={searchValue}
        autoFocus
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className="pokemon-cards-grid my-5 lg:my-20">
        {searchValue &&
          data?.getFuzzyPokemon.map((item) => (
            <PokemonCard pokemon={item} key={item.key} />
          ))}
      </div>
    </div>
  );
}
