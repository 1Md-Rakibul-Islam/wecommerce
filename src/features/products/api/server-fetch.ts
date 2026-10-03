import { Product, ProductFilters } from '@/types/product';
import { getAllProducts, getAllProductSlugs, getRelatedProducts } from '@/lib/products-data';
import { getProducts } from '@/features/products/api/products';

// Server-side data access utilities
// SSG/ISR pages read JSON data directly from disk (no running server needed)
// SSR pages use fetch() to call the API route at runtime

// SSG: Get all product slugs for generateStaticParams (reads JSON from disk)
export function fetchAllProductSlugs(): string[] {
  return getAllProductSlugs();
}

// SSG: Get product by slug at build time (reads JSON from disk)
export function fetchProductSSG(slug: string): Product | null {
  return getAllProducts().find((p) => p.slug === slug) || null;
}

// ISR: Get product by slug with ISR revalidation support
// During build: reads from disk. At runtime with revalidate: reads from disk (cached).
export function fetchProductISR(slug: string): Product | null {
  return fetchProductSSG(slug);
}

// SSG: Get featured products for homepage (reads JSON from disk)
export function fetchFeaturedProducts(): Product[] {
  const all = getAllProducts();
  return all
    .filter((p) => p.rating >= 4.5)
    .slice(0, 8);
}

// SSG: Get new arrivals for homepage (reads JSON from disk)
export function fetchNewArrivals(): Product[] {
  const all = getAllProducts();
  return [...all]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);
}

// SSG: Get related products at build time (reads JSON from disk)
export function fetchRelatedSSG(slug: string, count: number = 4): Product[] {
  const product = getAllProducts().find((p) => p.slug === slug);
  if (!product) return [];
  return getRelatedProducts(product, count);
}

// SSR: Get products with filters at request time (reads JSON from disk, same logic as API)
// This is used by the shop page which is force-dynamic (SSR)
export function fetchProductsSSR(filters: ProductFilters) {
  return getProducts(filters);
}
