import { Suspense } from 'react';
import { fetchProductsSSR } from '@/lib/api/server-fetch';
import { paramsToFilters } from '@/lib/filters';
import { ProductGrid } from '@/components/products/product-grid';
import { FilterSidebar } from '@/components/products/filter-sidebar';
import { SortDropdown } from '@/components/products/sort-dropdown';
import { ActiveFilters } from '@/components/products/active-filters';
import { MobileFilters } from '@/components/products/mobile-filters';
import { Pagination } from '@/components/products/pagination';
import { SearchEmptyState, EmptyState, ErrorState } from '@/components/products/state-components';
import { formatNumber, pluralize } from '@/lib/format';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Products — ShopCraft',
  description:
    'Browse 500+ premium products across electronics, fashion, home & living, sports, beauty, books, toys, and garden. Filter by category, price, brand, rating, and more.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop All Products — ShopCraft',
    description:
      'Browse 500+ premium products with smart filters, sorting, and pagination.',
  },
};

// SSR: This page is server-rendered on every request
export const dynamic = 'force-dynamic';

interface ShopPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === 'string') {
      params.set(key, value);
    }
  }

  const filters = paramsToFilters(params);

  // SSR: Data fetched on every request via service layer (reads from JSON)
  let result;
  try {
    result = fetchProductsSSR(filters);
  } catch {
    return (
      <div className="container-page py-12">
        <ErrorState
          title="Could not load products"
          description="We encountered an error while fetching products. Please try again."
        />
      </div>
    );
  }

  const pageTitle = filters.category
    ? `${filters.category}`
    : filters.search
      ? `Search: ${filters.search}`
      : 'All Products';

  return (
    <div className="container-page py-6 lg:py-8">
      <div className="mb-6">
        <nav className="text-sm text-muted-foreground mb-2">
          <span>Home</span>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">Shop</span>
          {filters.category && (
            <>
              <span className="mx-1.5">/</span>
              <span className="text-foreground">{filters.category}</span>
            </>
          )}
        </nav>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{pageTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {result.total > 0
            ? `${formatNumber(result.total)} ${pluralize(result.total, 'product')} found`
            : 'No products found'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block w-64 shrink-0">
          <Suspense fallback={<div className="h-96 rounded-xl border border-border skeleton-shimmer" />}>
            <FilterSidebar facets={result.facets} />
          </Suspense>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Suspense fallback={<div className="h-9" />}>
              <MobileFilters facets={result.facets} />
            </Suspense>
            <div className="ml-auto">
              <Suspense fallback={<div className="h-9 w-[180px]" />}>
                <SortDropdown />
              </Suspense>
            </div>
          </div>

          <Suspense fallback={<div className="h-10" />}>
            <ActiveFilters />
          </Suspense>

          {result.products.length === 0 ? (
            filters.search ? (
              <SearchEmptyState query={filters.search} />
            ) : (
              <EmptyState />
            )
          ) : (
            <>
              <ProductGrid products={result.products} />

              <Suspense fallback={<div className="h-10 mt-8" />}>
                <Pagination
                  currentPage={result.page}
                  totalPages={result.totalPages}
                />
              </Suspense>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
