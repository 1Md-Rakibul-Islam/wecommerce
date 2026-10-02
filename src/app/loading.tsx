export default function Loading() {
  return (
    <div className="container-page py-12">
      <div className="h-8 w-64 skeleton-shimmer rounded mb-4" />
      <div className="h-4 w-96 skeleton-shimmer rounded" />
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col rounded-xl border border-border overflow-hidden">
            <div className="aspect-square skeleton-shimmer" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-20 skeleton-shimmer rounded" />
              <div className="h-4 w-full skeleton-shimmer rounded" />
              <div className="h-6 w-16 skeleton-shimmer rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
