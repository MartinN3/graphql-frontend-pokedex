import { NetworkStatus, gql } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useEffect, useRef } from 'react';

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
  const [searchPokemons, { error, data, networkStatus }] =
    useGetFuzzyPokemonLazyQuery();

  const abortController = useRef(new window.AbortController());
  const debouncedSearch = useRef(
    debounce((value: string) => {
      const controller = new window.AbortController();
      abortController.current = controller;

      searchPokemons({
        variables: {
          pokemon: value,
          take: 4,
        },
        context: {
          fetchOptions: {
            signal: abortController.current.signal,
          },
        },
      });
    }, 200),
  );

  const abortLatest = () => abortController.current.abort();

  useEffect(() => {
    return () => abortLatest();
  }, []);

  return (
    <div className="container px-4 mx-auto">
      <input
        className="py-4 px-4 relative border border-yellow-500 w-full"
        placeholder="Search"
        autoFocus
        onChange={(e) => {
          abortLatest();
          debouncedSearch.current(e.target.value);
        }}
      />
      {!data && error && <div>Error! ${error.message}</div>}
      {networkStatus === NetworkStatus.setVariables && <div>Loading</div>}

      <div className="pokemon-cards-grid my-5 lg:my-20">
        {data?.getFuzzyPokemon.map((item) => (
          <PokemonCard pokemon={item} key={item.key} />
        ))}
      </div>
    </div>
  );
}
