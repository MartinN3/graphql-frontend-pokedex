import { Link } from '@tanstack/react-router';

import { useGetPokemonQuery } from '../../__generated__/graphql';
import { productRoute } from './route';

export default function Main() {
  const params = productRoute.useParams();
  const { data, loading, error } = useGetPokemonQuery({
    variables: {
      pokemon: params.pokemon,
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const d = data?.getPokemon;

  return (
    <div className="container px-4 mx-auto">
      <div className="uppercase text-2xl">{d?.species}</div>
      <div>{d?.evolutionLevel} Pokémon</div>
      <div>
        HP <span className="text-2xl">{d?.baseStats.hp}</span>
      </div>
      <div>
        Evolves from:{' '}
        {d?.preevolutions?.map((pokemon) => (
          <Link
            to={productRoute.to}
            params={{ pokemon: pokemon.key }}
            key={pokemon.key}
          >
            {pokemon.species}
          </Link>
        )) ?? 'Nothing'}
      </div>
      <div>
        Evolves to:{' '}
        {d?.evolutions?.map((pokemon) => (
          <Link
            to={productRoute.to}
            params={{ pokemon: pokemon.key }}
            key={pokemon.key}
          >
            {pokemon.species}
          </Link>
        )) ?? 'Nothing'}
      </div>
      <div className="text-lg mt-6">Abilities:</div>
      <div className="my-4">
        <div>First: {d?.abilities.first.name}</div>
        <div>{d?.abilities.first.desc}</div>
      </div>
      <div className="my-4">
        <div>Second: {d?.abilities.second?.name ?? 'None'}</div>
      </div>
      <div className="my-4">
        <div>Special: {d?.abilities.special?.name ?? 'None'}</div>
      </div>
    </div>
  );
}
