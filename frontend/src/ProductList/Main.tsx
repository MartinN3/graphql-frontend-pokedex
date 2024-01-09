import Filter from './components/Filters';
import PaginationNavigation from './components/PaginationNavigation';
import ProductList from './components/ProductList';
import TopFilters from './components/TopFilters';

export default function ProductListRoute() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-4/12 xl:w-3/12 px-4">
            <Filter />
          </div>
          <div className="w-full lg:w-8/12 xl:9/12 px-4">
            <TopFilters />
            <ProductList />
            <PaginationNavigation />
          </div>
        </div>
      </div>
    </section>
  );
}
