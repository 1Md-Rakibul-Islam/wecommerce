import { Suspense } from "react";
import { fetchProductsSSR } from "@/features/products/api/server-fetch";
import { paramsToFilters } from "@/lib/filters";
import { ProductGrid } from "@/features/products/components/product-grid";
import { FilterSidebar } from "@/features/products/components/filter-sidebar";
import { SortDropdown } from "@/features/products/components/sort-dropdown";
import { ActiveFilters } from "@/features/products/components/active-filters";
import { MobileFilters } from "@/features/products/components/mobile-filters";
import { Pagination } from "@/features/products/components/pagination";
import {
  SearchEmptyState,
  EmptyState,
  ErrorState,
} from "@/features/products/components/state-components";
import { formatNumber, pluralize } from "@/lib/format";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products — ShopCraft",
  description:
    "Browse 500+ premium products across electronics, fashion, home & living, sports, beauty, books, toys, and garden. Filter by category, price, brand, rating, and more.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop All Products — ShopCraft",
    description:
      "Browse 500+ premium products with smart filters, sorting, and pagination.",
  },
};

// SSR: This page is server-rendered on every request
export const dynamic = "force-dynamic";

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage(props: ShopPageProps) {
  const searchParams = await props.searchParams;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
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
      : "All Products";

  return (
    <main>
      <section className="container-page py-6 lg:py-8">
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
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {result.total > 0
              ? `${formatNumber(result.total)} ${pluralize(result.total, "product")} found`
              : "No products found"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64 shrink-0">
            <Suspense
              fallback={
                <div className="h-96 rounded-xl border border-border skeleton-shimmer" />
              }
            >
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

            <div className="mb-6">
              <Suspense fallback={<div className="h-10" />}>
                <ActiveFilters />
              </Suspense>
            </div>

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
      </section>
    </main>
  );
}
