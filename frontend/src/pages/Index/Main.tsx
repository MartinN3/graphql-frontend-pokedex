import { useNavigate } from '@tanstack/react-router';

import { useGetFuzzyPokemonQuery } from '../../__generated__/graphql';
import PokemonCardWithAnimation from '../../components/PokemonCard/PokemonCardWithAnimation';
import { useDebounce } from '../../hooks/useDebounce';
import { PRODUCTS_PER_PAGE } from '../ProductList/constants';
import { indexRoute } from './route';

export default function Index() {
  const navigate = useNavigate({ from: indexRoute.fullPath });
  const searchParams = indexRoute.useSearch();
  const debouncedSearch = useDebounce(searchParams.search, 250);
  const { error, data } = useGetFuzzyPokemonQuery({
    skip: !debouncedSearch,
    variables: {
      pokemon: debouncedSearch ?? '',
      take: PRODUCTS_PER_PAGE,
    },
  });

  return (
    <div className="container px-4 mx-auto">
      <div className="text-lg">Search with debounce and abort</div>
      <input
        className="py-4 px-4 relative border border-yellow-500 w-full"
        placeholder="Search"
        value={searchParams.search ?? ''}
        autoFocus
        onChange={(e) => {
          navigate({
            search: (prev) => ({ ...prev, search: e.target.value }),
          });
        }}
      />
      {!data && error && <div>Error! ${error.message}</div>}

      <div className="pokemon-cards-grid my-5 lg:my-20">
        {[...Array(PRODUCTS_PER_PAGE).keys()].map((_, i) => (
          <PokemonCardWithAnimation
            data={data?.getFuzzyPokemon[i] ?? undefined}
            key={i}
          />
        ))}
        {/* {data?.getFuzzyPokemon.map((item) => (
          <PokemonCardWithAnimation data={item} key={item.key} />
        ))} */}
      </div>
    </div>
  );
}
