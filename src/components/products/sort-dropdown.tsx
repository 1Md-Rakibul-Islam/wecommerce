'use client';

import { useCallback, memo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SORT_OPTIONS, SORT_LABELS, buildFilterUrl } from '@/lib/filters';
import { SortOption } from '@/types/product';

function SortDropdownComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = (searchParams.get('sort') as SortOption) || 'relevance';

  const handleSortChange = useCallback(
    (value: string) => {
      const url = buildFilterUrl(searchParams, {
        sort: value === 'relevance' ? undefined : (value as SortOption),
      });
      router.push(url, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown size={16} className="text-muted-foreground hidden sm:block" />
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px] h-9" aria-label="Sort products">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {SORT_LABELS[option]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export const SortDropdown = memo(SortDropdownComponent);
