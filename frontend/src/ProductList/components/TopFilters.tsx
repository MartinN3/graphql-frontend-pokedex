import { useNavigate, useSearch } from '@tanstack/react-router';

import { PRODUCT_LIST_ORDER } from '../constants';
import { productsRoute } from '../route';

export default function TopFilters() {
  const navigate = useNavigate({ from: productsRoute.id });
  const { order } = useSearch({
    from: productsRoute.id,
  });

  return (
    <div className="flex flex-col sm:flex-row mb-8 sm:items-center">
      <div className="mb-3 sm:mb-0 sm:mr-5">
        <div className="relative border border-yellow-500">
          <span className="absolute top-1/2 right-0 mr-4 transform -translate-y-1/2 text-2xl">
            ▾
          </span>
          <select
            className="relative w-full pl-6 pr-10 py-4 bg-transparent font-medium text-sky-700 outline-none appearance-none"
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
              <option value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
