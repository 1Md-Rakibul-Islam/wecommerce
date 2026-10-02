'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { FilterSidebar } from '@/components/products/filter-sidebar';
import { Facets } from '@/types/product';

interface MobileFiltersProps {
  facets: Facets;
}

export function MobileFilters({ facets }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal size={16} className="mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[340px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SlidersHorizontal size={18} />
            Filters
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <FilterSidebar facets={facets} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
