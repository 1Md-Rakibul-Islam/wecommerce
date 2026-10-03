'use client';

import Link from 'next/link';
import { useRelatedProducts } from '@/hooks/use-product-queries';
import { ProductCard } from '@/features/products/components/product-card';
import { ProductGridSkeleton } from '@/features/products/components/product-skeletons';

interface RelatedProductsProps {
  slug: string;
  fallbackProducts: import('@/types/product').Product[];
}

export function RelatedProducts({ slug, fallbackProducts }: RelatedProductsProps) {
  // CSR: Fetch related products client-side with TanStack Query
  // Uses server-rendered fallback products for instant display
  const { data, isLoading, isError } = useRelatedProducts(slug, true);
  const products = data || fallbackProducts;

  if (isLoading && !fallbackProducts.length) {
    return (
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">You might also like</h2>
        <ProductGridSkeleton count={4} />
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">You might also like</h2>
        {data && (
          <span className="text-xs text-muted-foreground">Fetched client-side</span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
