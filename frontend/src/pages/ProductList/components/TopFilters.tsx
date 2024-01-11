import { useNavigate, useSearch } from '@tanstack/react-router';

import { PRODUCT_LIST_ORDER } from '../constants';
import { productsRoute } from '../route';

export default function TopFilters() {
  const navigate = useNavigate({ from: productsRoute.id });
  const { order } = useSearch({
    from: productsRoute.id,
  });

  return (
    <div className="flex flex-col sm:flex-row mb-4 sm:items-center justify-end">
      <div className="relative border-4 border-yellow-500 min-w-56">
        <span className="absolute top-1/2 right-0 mr-4 transform -translate-y-1/2 text-2xl">
          ▾
        </span>
        <select
          className="relative w-full pl-6 pr-10 py-3 bg-transparent font-medium text-sky-700 outline-none appearance-none"
          value={order}
          onChange={(e) => {
            navigate({
              search: (prev) => ({
                ...prev,
                order: e.target.value,
              }),
            });
          }}
        >
          {PRODUCT_LIST_ORDER.map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
