import { ProductGridSkeleton } from '@/features/products/components/product-skeletons';

export default function ShopLoading() {
  return (
    <div className="container-page py-6 lg:py-8">
      <div className="mb-6">
        <div className="h-4 w-32 skeleton-shimmer rounded mb-2" />
        <div className="h-8 w-64 skeleton-shimmer rounded" />
        <div className="h-4 w-48 skeleton-shimmer rounded mt-2" />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block w-64 shrink-0">
          <div className="h-96 rounded-xl border border-border skeleton-shimmer" />
        </div>
        <div className="flex-1">
          <ProductGridSkeleton />
        </div>
      </div>
    </div>
  );
}
