import { useReactiveVar } from '@apollo/client';

import { favoritePokemonVar } from '../../../main.tsx';

export default function FavoriteList() {
  const favoritePokemon = useReactiveVar(favoritePokemonVar);
  console.log(favoritePokemon);

  return (
    <div>
      <div className="pokemon-cards-grid my-5 lg:my-20">
        {favoritePokemon.map((key) => (
          <div className={key}>{key}</div>
        ))}
      </div>
    </div>
  );
}
