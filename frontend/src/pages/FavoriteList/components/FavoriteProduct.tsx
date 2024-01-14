import {
  Pokemon,
  useGetPokemonCardQuery,
} from '../../../__generated__/graphql.ts';
import PokemonCardWithAnimation from '../../../components/PokemonCard/PokemonCardWithAnimation.tsx';

type Props = {
  pokemonKey: Pokemon['key'];
};

export default function FavoriteProduct(props: Props) {
  const { data } = useGetPokemonCardQuery({
    variables: {
      pokemon: props.pokemonKey,
    },
  });

  return (
    <div>
      <div className="pokemon-cards-grid my-5 lg:my-20">
        <PokemonCardWithAnimation
          data={data?.getPokemon}
          key={data?.getPokemon.key}
        />
      </div>
    </div>
  );
}
