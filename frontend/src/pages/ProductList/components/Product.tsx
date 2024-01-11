import { GetPaginatedPokemonQuery } from '../../../__generated__/graphql';
import PokemonCard from '../../../components/PokemonCard/PokemonCard';
import Card from '../assets/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-fullview.png';

type ProductProps = {
  // if component was meant to be reusable, i would pick items from Pokemon type
  data?: GetPaginatedPokemonQuery['getAllPokemon'][0];
};

export default function Product(props: ProductProps) {
  const d = props.data;

  return (
    <div className="flipcard-wrapper">
      <div
        className={`flipcard-inner ${
          d ? 'animate-flip rotate-y-180' : 'animate-wiggle'
        }`}
      >
        <div className="flipcard-front">{d && <PokemonCard pokemon={d} />}</div>
        <img src={Card} className="flipcard-back" />
      </div>
    </div>
  );
}
