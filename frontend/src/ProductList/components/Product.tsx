import { Link } from '@tanstack/react-router';

import { GetPaginatedPokemonQuery } from '../../__generated__/graphql';
import StatBar from './StatBar';

type ProductProps = {
  data: GetPaginatedPokemonQuery['getAllPokemon'][0];
};

export default function Product(props: ProductProps) {
  const d = props.data;
  return (
    <div>
      <Link className="block p-5 border border-yellow-500 hover:border-yellow-500">
        <img className="block w-full h-80 mb-8 object-cover" src={d.sprite} />
        <div className="text-center">
          <span className="font-bold text-yellow-500">Weight: {d.weight}</span>
          <h6 className="font-bold text-sky-700 mt-2 mb-5 uppercase">
            {d.species}
          </h6>
          <div className="mb-3">
            <StatBar stat="attack" value={d.baseStats.attack} />
            <StatBar stat="defense" value={d.baseStats.defense} />
            <StatBar stat="hp" value={d.baseStats.hp} />
            <StatBar stat="speed" value={d.baseStats.speed} />
          </div>
        </div>
      </Link>
    </div>
  );
}
