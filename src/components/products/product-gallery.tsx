'use client';

import { useState, memo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

function ProductGalleryComponent({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const uniqueImages = Array.from(new Set(images));

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted/30">
        <Image
          src={uniqueImages[activeIndex]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {uniqueImages.length > 1 && (
        <div className="flex gap-3">
          {uniqueImages.map((image, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-all',
                i === activeIndex
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/40',
              )}
            >
              <Image
                src={image}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const ProductGallery = memo(ProductGalleryComponent);
