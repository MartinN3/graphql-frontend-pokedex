import { gql } from '@apollo/client';
import { useNavigate } from '@tanstack/react-router';

import { useGetFuzzyPokemonQuery } from '../../__generated__/graphql';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { useDebounce } from '../../hooks/useDebounce';
import { indexRoute } from './route';

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
  const navigate = useNavigate({ from: indexRoute.fullPath });
  const searchParams = indexRoute.useSearch();
  const debouncedSearch = useDebounce(searchParams.search, 250);
  const { error, data, loading } = useGetFuzzyPokemonQuery({
    skip: !debouncedSearch,
    variables: {
      pokemon: debouncedSearch ?? '',
      take: 4,
    },
  });

  return (
    <div className="container px-4 mx-auto">
      <div className="text-lg">Search with debounce and abort</div>
      <input
        className="py-4 px-4 relative border border-yellow-500 w-full"
        placeholder="Search"
        value={searchParams.search ?? ''}
        autoFocus
        onChange={(e) => {
          navigate({
            search: (prev) => ({ ...prev, search: e.target.value }),
          });
        }}
      />
      {!data && error && <div>Error! ${error.message}</div>}
      {loading && <div>Loading</div>}

      <div className="pokemon-cards-grid my-5 lg:my-20">
        {data?.getFuzzyPokemon.map((item) => (
          <PokemonCard pokemon={item} key={item.key} />
        ))}
      </div>
    </div>
  );
}
