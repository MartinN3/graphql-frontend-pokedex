import PaginationNavigation from './components/PaginationNavigation';
import ProductList from './components/ProductList';
import TopFilters from './components/TopFilters';

export default function ProductListRoute() {
  return (
    <section className="pb-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="flex-grow px-4">
            <TopFilters />
            <ProductList />
            <PaginationNavigation />
          </div>
        </div>
      </div>
    </section>
  );
}
