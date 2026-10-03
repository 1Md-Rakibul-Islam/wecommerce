import { Product } from '@/types/product';

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="aspect-square skeleton-shimmer" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 w-20 skeleton-shimmer rounded" />
        <div className="h-4 w-full skeleton-shimmer rounded" />
        <div className="h-4 w-3/4 skeleton-shimmer rounded" />
        <div className="flex gap-1 mt-1">
          <div className="h-3 w-3 skeleton-shimmer rounded-full" />
          <div className="h-3 w-3 skeleton-shimmer rounded-full" />
          <div className="h-3 w-3 skeleton-shimmer rounded-full" />
          <div className="h-3 w-3 skeleton-shimmer rounded-full" />
          <div className="h-3 w-3 skeleton-shimmer rounded-full" />
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="h-6 w-16 skeleton-shimmer rounded" />
          <div className="h-9 w-9 skeleton-shimmer rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="container-page py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="aspect-square rounded-xl skeleton-shimmer" />
          <div className="flex gap-3">
            <div className="h-20 w-20 rounded-lg skeleton-shimmer" />
            <div className="h-20 w-20 rounded-lg skeleton-shimmer" />
            <div className="h-20 w-20 rounded-lg skeleton-shimmer" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-4 w-24 skeleton-shimmer rounded" />
          <div className="h-8 w-full skeleton-shimmer rounded" />
          <div className="h-6 w-32 skeleton-shimmer rounded" />
          <div className="h-px w-full bg-border" />
          <div className="space-y-2">
            <div className="h-4 w-full skeleton-shimmer rounded" />
            <div className="h-4 w-full skeleton-shimmer rounded" />
            <div className="h-4 w-2/3 skeleton-shimmer rounded" />
          </div>
          <div className="h-12 w-full skeleton-shimmer rounded-xl" />
        </div>
      </div>
    </div>
  );
}
