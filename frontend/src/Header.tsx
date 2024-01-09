import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <section>
      <div className="relative px-6 lg:px-16 bg-blueGray-900">
        <nav className="flex items-center py-7 bg-blueGray-900">
          <Link className="inline-block text-lg font-bold" to={'/'}>
            <img
              className="h-10"
              src="/International_Pokémon_logo.svg"
              alt=""
              width="auto"
            />
          </Link>
          <ul className="flex w-auto space-x-12 ml-auto">
            <li>
              <Link
                to={'/products'}
                className="inline-flex items-center font-medium"
                search={{ page: 1, filter: '', sort: 'newest' }}
                inactiveProps={{
                  className: 'text-sky-700',
                }}
                activeProps={{
                  className: 'text-yellow-500',
                }}
              >
                <span className="mr-3">Pokémon</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
