'use client';

import Link from 'next/link';
import Image from 'next/image';
import { memo } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice, getDiscountPercent, getStockStatus } from '@/lib/format';
import { useCartStore } from '@/store/cart-store';
import { useMounted } from '@/hooks/use-mounted';
import { StarRating } from '@/components/products/star-rating';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

function ProductCardComponent({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const mounted = useMounted();
  const discount = getDiscountPercent(product.price, product.compareAtPrice);
  const stockStatus = getStockStatus(product.stock);
  const outOfStock = product.stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      stock: product.stock,
    });
    window.dispatchEvent(new Event('open-cart-drawer'));
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg product-card-shadow hover:product-card-shadow-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={cn(
            'object-cover transition-all duration-700 group-hover:scale-110',
            product.images.length > 1 ? 'group-hover:opacity-0' : '',
            outOfStock && 'opacity-60',
          )}
          priority={priority}
        />
        {product.images.length > 1 && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
          />
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={outOfStock || !mounted}
            className="w-full bg-white/90 backdrop-blur-md text-black hover:bg-white font-semibold py-2.5 rounded-lg text-sm shadow-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <ShoppingBag size={16} />
            {outOfStock ? 'Out of Stock' : 'Quick Add'}
          </button>
        </div>
        
        {/* Dark gradient overlay for bottom actions */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white shadow-md text-xs font-bold px-2.5 py-1 rounded-md z-10">
            -{discount}%
          </span>
        )}
        {outOfStock && (
          <span className="absolute top-3 right-3 bg-foreground/90 backdrop-blur-md text-background text-xs font-medium px-2.5 py-1 rounded-md z-10">
            Sold Out
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <span className="text-xs font-medium text-muted-foreground mb-1">{product.brand}</span>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-2">
          <StarRating rating={product.rating} size={14} />
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export const ProductCard = memo(ProductCardComponent);
