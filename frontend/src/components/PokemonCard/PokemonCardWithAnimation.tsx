import { motion, useSpring } from 'framer-motion';

import Card from '../../assets/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-fullview.png';
import PokemonCard, { PokemonCardProps } from './PokemonCard';

type PokemonCardWithAnimationProps = {
  // if component was meant to be reusable, i would pick items from Pokemon type
  data?: PokemonCardProps['pokemon'];
};

//Spring animation parameters
const spring = {
  type: 'spring',
  stiffness: 100,
  damping: 10,
  mass: 0.75,
};

export default function PokemonCardWithAnimation(
  props: PokemonCardWithAnimationProps,
) {
  const d = props.data;
  const isFlipped = Boolean(d);
  const dx = useSpring(0, spring);
  const dy = useSpring(0, spring);

  return (
    <div
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      className="h-[415px]"
    >
      <motion.div
        whileHover={{ scale: 1.02, rotate: 2 }} //Change the scale of zooming in when hovering
        transition={spring}
        style={{
          width: '100%',
          height: '100%',
          rotateX: dx,
          rotateY: dy,
        }}
      >
        <div
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            width: '100%',
            height: '100%',
          }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? -180 : 0 }}
            transition={spring}
            style={{
              width: '100%',
              height: '100%',
              zIndex: isFlipped ? 0 : 1,
              backfaceVisibility: 'hidden',
              position: 'absolute',
            }}
          >
            <img src={Card} className="flipcard-back" />
          </motion.div>
          <motion.div
            initial={{ rotateY: 180 }}
            animate={{ rotateY: isFlipped ? 0 : 180 }}
            transition={spring}
            style={{
              width: '100%',
              height: '100%',
              zIndex: isFlipped ? 1 : 0,
              backfaceVisibility: 'hidden',
              position: 'absolute',
            }}
          >
            <PokemonCard pokemon={d} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
