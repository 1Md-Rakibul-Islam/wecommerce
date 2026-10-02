'use client';

import { useCallback, memo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function PaginationComponent({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();

  const buildHref = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page > 1) {
        params.set('page', String(page));
      } else {
        params.delete('page');
      }
      const qs = params.toString();
      return qs ? `/shop?${qs}` : '/shop';
    },
    [searchParams],
  );

  const getPages = useCallback(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | 'ellipsis')[] = [1];
    if (currentPage > 3) pages.push('ellipsis');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const pages = getPages();
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 mt-8" aria-label="Pagination">
      {hasPrev ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </Link>
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border opacity-40 cursor-not-allowed">
          <ChevronLeft size={18} />
        </span>
      )}

      {pages.map((page, i) => {
        if (page === 'ellipsis') {
          return (
            <span key={`ellipsis-${i}`} className="flex h-10 w-10 items-center justify-center text-muted-foreground">
              ...
            </span>
          );
        }
        return (
          <Link
            key={page}
            href={buildHref(page)}
            className={cn(
              'flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors',
              page === currentPage
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:border-primary/50 hover:bg-primary/5',
            )}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        );
      })}

      {hasNext ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </Link>
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border opacity-40 cursor-not-allowed">
          <ChevronRight size={18} />
        </span>
      )}
    </nav>
  );
}

export const Pagination = memo(PaginationComponent);
