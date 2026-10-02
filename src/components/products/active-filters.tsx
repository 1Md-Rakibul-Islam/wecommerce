'use client';

import { useCallback, memo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { buildFilterUrl, hasActiveFilters } from '@/lib/filters';

function ActiveFiltersComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const removeFilter = useCallback(
    (key: string) => {
      const url = buildFilterUrl(searchParams, {
        [key]: undefined,
        ...(key !== 'sort' ? { page: undefined } : {}),
      });
      router.push(url, { scroll: false });
    },
    [router, searchParams],
  );

  if (!hasActiveFilters(searchParams)) return null;

  const chips: { key: string; label: string; value: string }[] = [];

  const search = searchParams.get('search');
  if (search) chips.push({ key: 'search', label: 'Search', value: `"${search}"` });
  const category = searchParams.get('category');
  if (category) chips.push({ key: 'category', label: 'Category', value: category.replace(/,/g, ', ') });
  const subcategory = searchParams.get('subcategory');
  if (subcategory) chips.push({ key: 'subcategory', label: 'Subcategory', value: subcategory });
  const brand = searchParams.get('brand');
  if (brand) chips.push({ key: 'brand', label: 'Brand', value: brand.replace(/,/g, ', ') });
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice || maxPrice) {
    chips.push({
      key: 'minPrice',
      label: 'Price',
      value: `$${minPrice || '0'} - $${maxPrice || '∞'}`,
    });
  }
  const minRating = searchParams.get('minRating');
  if (minRating) chips.push({ key: 'minRating', label: 'Rating', value: `${minRating}★ & up` });
  const tags = searchParams.get('tags');
  if (tags) chips.push({ key: 'tags', label: 'Tags', value: tags.replace(/,/g, ', ') });

  const handleRemovePrice = () => {
    const url = buildFilterUrl(searchParams, {
      minPrice: undefined,
      maxPrice: undefined,
      page: undefined,
    });
    router.push(url, { scroll: false });
  };

  const handleRemoveTags = () => {
    const url = buildFilterUrl(searchParams, { tags: undefined, page: undefined });
    router.push(url, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      {chips.map((chip) => {
        const isPrice = chip.key === 'minPrice';
        const isTags = chip.key === 'tags';
        return (
          <button
            key={chip.key}
            onClick={() => {
              if (isPrice) handleRemovePrice();
              else if (isTags) handleRemoveTags();
              else removeFilter(chip.key);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <span className="text-muted-foreground">{chip.label}:</span>
            <span>{chip.value}</span>
            <X size={12} className="text-muted-foreground" />
          </button>
        );
      })}
      <button
        onClick={() => router.push('/shop', { scroll: false })}
        className="text-xs text-primary hover:underline font-medium px-2"
      >
        Clear all
      </button>
    </div>
  );
}

export const ActiveFilters = memo(ActiveFiltersComponent);
