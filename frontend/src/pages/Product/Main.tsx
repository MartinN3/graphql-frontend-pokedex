import { useGetPokemonQuery } from '../../__generated__/graphql';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
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
    <div className="pokemon-cards-grid my-5 lg:my-20 justify-center">
      {d && <PokemonCard pokemon={d} />}
    </div>
  );
}
