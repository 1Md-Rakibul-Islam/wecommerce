'use client';

import { useCallback, memo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown, Tag } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Facets } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { buildFilterUrl, hasActiveFilters } from '@/lib/filters';

interface FilterSidebarProps {
  facets: Facets;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="py-4">
      <button
        className="flex w-full items-center justify-between text-sm font-semibold"
        onClick={() => setOpen((prev) => !prev)}
      >
        {title}
        <ChevronDown
          size={16}
          className={cn('transition-transform', open ? '' : '-rotate-90')}
        />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function FilterSidebarComponent({ facets }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilters = hasActiveFilters(searchParams);

  const currentCategories = searchParams.get('category')?.split(',').filter(Boolean) || [];
  const currentBrands = searchParams.get('brand')?.split(',').filter(Boolean) || [];
  const currentMinPrice = Number(searchParams.get('minPrice')) || 0;
  const currentMaxPrice = Number(searchParams.get('maxPrice')) || facets.priceRange.max;
  const currentMinRating = Number(searchParams.get('minRating')) || 0;
  const currentTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];

  const navigate = useCallback(
    (updates: Record<string, string | undefined>) => {
      const url = buildFilterUrl(searchParams, updates);
      router.push(url, { scroll: false });
    },
    [router, searchParams],
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentMinPrice || facets.priceRange.min,
    currentMaxPrice || facets.priceRange.max,
  ]);

  const handlePriceCommit = useCallback(
    (values: number[]) => {
      setPriceRange([values[0], values[1]]);
      navigate({
        minPrice: values[0] > facets.priceRange.min ? String(values[0]) : undefined,
        maxPrice: values[1] < facets.priceRange.max ? String(values[1]) : undefined,
      });
    },
    [facets.priceRange, navigate],
  );

  const handleCategoryToggle = useCallback(
    (category: string) => {
      const newCats = currentCategories.includes(category)
        ? currentCategories.filter((c) => c !== category)
        : [...currentCategories, category];
      navigate({
        category: newCats.length > 0 ? newCats.join(',') : undefined,
        subcategory: undefined,
      });
    },
    [navigate, currentCategories],
  );

  const handleBrandToggle = useCallback(
    (brand: string) => {
      const newBrands = currentBrands.includes(brand)
        ? currentBrands.filter((b) => b !== brand)
        : [...currentBrands, brand];
      navigate({
        brand: newBrands.length > 0 ? newBrands.join(',') : undefined,
      });
    },
    [navigate, currentBrands],
  );

  const handleRatingChange = useCallback(
    (rating: number) => {
      navigate({
        minRating: currentMinRating === rating ? undefined : String(rating),
      });
    },
    [navigate, currentMinRating],
  );

  const handleTagToggle = useCallback(
    (tag: string) => {
      const newTags = currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag];
      navigate({ tags: newTags.length > 0 ? newTags.join(',') : undefined });
    },
    [navigate, currentTags],
  );

  const clearAll = useCallback(() => {
    router.push('/shop', { scroll: false });
  }, [router]);

  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-base font-semibold">
          <SlidersHorizontal size={18} />
          Filters
        </h2>
        {activeFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-primary hover:underline font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card divide-y divide-border">
        <FilterSection title="Category">
          <div className="space-y-1.5">
            {facets.categories.map((cat) => (
              <label
                key={cat.value}
                className="flex items-center justify-between gap-2 cursor-pointer py-1 group"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={currentCategories.includes(cat.value)}
                    onCheckedChange={() => handleCategoryToggle(cat.value)}
                  />
                  <span className="text-sm group-hover:text-primary transition-colors">
                    {cat.value}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{cat.count}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price Range">
          <div className="px-1">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="font-medium">
                ${priceRange[0]}
              </span>
              <span className="font-medium">
                ${priceRange[1]}
              </span>
            </div>
            <Slider
              min={facets.priceRange.min}
              max={facets.priceRange.max}
              step={10}
              value={priceRange}
              onValueChange={(values) => setPriceRange([values[0], values[1]])}
              onValueCommit={handlePriceCommit}
              minStepsBetweenThumbs={1}
            />
          </div>
        </FilterSection>

        <FilterSection title="Brand">
          <div className="space-y-1.5 max-h-52 overflow-y-auto scrollbar-hide">
            {facets.brands.map((brand) => (
              <label
                key={brand.value}
                className="flex items-center justify-between gap-2 cursor-pointer py-1 group"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={currentBrands.includes(brand.value)}
                    onCheckedChange={() => handleBrandToggle(brand.value)}
                  />
                  <span className="text-sm group-hover:text-primary transition-colors">
                    {brand.value}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{brand.count}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Rating">
          <div className="space-y-1.5">
            {[4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer py-1 group"
              >
                <Checkbox
                  checked={currentMinRating === rating}
                  onCheckedChange={() => handleRatingChange(rating)}
                />
                <span className="text-sm group-hover:text-primary transition-colors">
                  {rating}★ & up
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Tags" defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {facets.tags.map((tag) => {
              const active = currentTags.includes(tag.value);
              return (
                <button
                  key={tag.value}
                  onClick={() => handleTagToggle(tag.value)}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/50 hover:bg-primary/5',
                  )}
                >
                  <Tag size={10} />
                  {tag.value}
                </button>
              );
            })}
          </div>
        </FilterSection>
      </div>

      {activeFilters && (
        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full" onClick={clearAll}>
            <X size={16} className="mr-1" />
            Clear all filters
          </Button>
        </div>
      )}
    </aside>
  );
}

export const FilterSidebar = memo(FilterSidebarComponent);
