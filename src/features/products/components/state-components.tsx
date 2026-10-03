import Link from 'next/link';
import { SearchX, PackageOpen, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title = 'No products found',
  description = 'Try adjusting your filters or search terms to find what you are looking for.',
  actionLabel = 'Browse all products',
  actionHref = '/shop',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
        <PackageOpen size={36} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      <Link href={actionHref}>
        <Button>{actionLabel}</Button>
      </Link>
    </div>
  );
}

export function SearchEmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
        <SearchX size={36} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">
        No results for &ldquo;{query}&rdquo;
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        We could not find any products matching your search. Try different
        keywords or browse our categories.
      </p>
      <Link href="/shop">
        <Button>Clear search</Button>
      </Link>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  retry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred while loading the content. Please try again.',
  retry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mb-6">
        <AlertCircle size={36} className="text-destructive" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      {retry && <Button onClick={retry}>Try again</Button>}
    </div>
  );
}
