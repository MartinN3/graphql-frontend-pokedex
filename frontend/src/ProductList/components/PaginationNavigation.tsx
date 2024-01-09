import { Link, useSearch } from '@tanstack/react-router';

import { productsRoute } from '../route';

export default function PaginationNavigation() {
  const { page } = useSearch({
    from: productsRoute.id,
  });

  return (
    <ul className="flex items-center justify-center">
      <li>
        <Link
          className="flex w-9 h-9 items-center justify-center border border-yellow-500 text-sky-700 hover:text-sky-400"
          from={productsRoute.id}
          search={(prev) => ({
            ...prev,
            page: prev.page > 1 ? prev.page - 1 : prev.page,
          })}
          resetScroll={false}
        >
          <svg
            width={7}
            height={12}
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 10.6666L1.33333 5.99992L6 1.33325"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </li>
      <li>
        <span className="flex px-4 h-9 items-center justify-center border border-yellow-500 text-sky-700  font-bold">
          Current page: {page}
        </span>
      </li>
      <li>
        <Link
          className="flex w-9 h-9 items-center justify-center border border-yellow-500 text-sky-700 hover:text-sky-400"
          from={productsRoute.id}
          search={(prev) => ({ ...prev, page: prev.page + 1 })}
          resetScroll={false}
        >
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.33341L5.66667 6.00008L1 10.6667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Link>
      </li>
    </ul>
  );
}
