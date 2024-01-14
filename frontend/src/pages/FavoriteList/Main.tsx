import FavoriteList from './components/FavoriteList';

export default function ProductListRoute() {
  return (
    <section className="pb-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="flex-grow px-4">
            <FavoriteList />
          </div>
        </div>
      </div>
    </section>
  );
}
