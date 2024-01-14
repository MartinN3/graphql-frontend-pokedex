import { useReactiveVar } from '@apollo/client';

import { favoritePokemonVar } from '../../../main.tsx';
import FavoriteProduct from './FavoriteProduct.tsx';

export default function FavoriteList() {
  const favoritePokemon = useReactiveVar(favoritePokemonVar);

  return (
    <div>
      <div className="pokemon-cards-grid my-5 lg:my-20">
        {favoritePokemon.map((key) => (
          <FavoriteProduct pokemonKey={key} key={key} />
        ))}
      </div>
    </div>
  );
}
