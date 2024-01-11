import { Link } from '@tanstack/react-router';

import { Pokemon } from '../../__generated__/graphql';
import ImagePlaceholder from '../../assets/International_Pokemon_logo.svg';
import StatBar from './StatBar';

type PokemonCardProps = {
  pokemon: Pick<Pokemon, 'key' | 'sprite' | 'weight' | 'species'> & {
    baseStats: Pick<
      Pokemon['baseStats'],
      'attack' | 'defense' | 'hp' | 'speed'
    >;
  };
};
export default function PokemonCard(props: PokemonCardProps) {
  const d = props.pokemon;

  return (
    <Link
      className="block border-[15px] border-yellow-500 rounded-2xl w-full h-full"
      to={'/pokemon/$pokemon'}
      params={{
        pokemon: d.key,
      }}
      search={false}
    >
      <div className="h-40 mb-8">
        {d?.sprite ? (
          <img
            className="block h-full object-cover mx-auto mt-2"
            src={d.sprite}
          />
        ) : (
          <div className="flex items-center justify-center rounded h-full px-6">
            <ImagePlaceholder />
          </div>
        )}
      </div>
      <div className="text-center">
        <div className="font-bold text-yellow-600 my-2">
          Weight: {d.weight ?? ''}
        </div>
        <h6 className="font-bold text-sky-700 mt-2 mb-5 uppercase">
          {d?.species}
        </h6>
        <div className="mb-1">
          <StatBar stat="attack" value={d.baseStats.attack} />
          <StatBar stat="defense" value={d.baseStats.defense} />
          <StatBar stat="hp" value={d.baseStats.hp} />
          <StatBar stat="speed" value={d.baseStats.speed} />
        </div>
      </div>
    </Link>
  );
}
