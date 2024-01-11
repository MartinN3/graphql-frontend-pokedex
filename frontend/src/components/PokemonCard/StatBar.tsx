import { Pokemon } from '../../__generated__/graphql';
import limitStatValue from '../../utils/limitStatValue';

type PossibleStats = keyof Omit<Pokemon['baseStats'], '__typename'>;

const STAT_COLOR: {
  [key in PossibleStats]: string;
} = {
  attack: 'bg-blue-500',
  defense: 'bg-green-500',
  speed: 'bg-yellow-500',
  hp: 'bg-red-500',
  specialattack: 'bg-blue-500',
  specialdefense: 'bg-blue-500',
};

export default function StatBar({
  value,
  stat,
}: {
  value: number;
  stat: PossibleStats;
}) {
  return (
    <div className="relative w-full bg-grey-light mt-1">
      <div
        className={`absolute leading-none text-center h-full ${STAT_COLOR[stat]}`}
        style={{ width: limitStatValue(value) + '%' }}
      ></div>
      {value > 100 && (
        <div
          className={`absolute leading-none text-center h-full bg-orange-400`}
          style={{ width: (value % 100) + '%' }}
        ></div>
      )}
      <div className="relative text-xs text-black font-semibold">{value}%</div>
    </div>
  );
}
