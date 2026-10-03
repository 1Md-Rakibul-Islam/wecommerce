'use client';

import { useState, useCallback, useMemo } from 'react';
import { ShoppingBag, Minus, Plus, Check, AlertCircle } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/cart-store';
import { useMounted } from '@/hooks/use-mounted';
import { formatPrice, getDiscountPercent, getStockStatus } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/features/products/components/star-rating';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface AddToCartSectionProps {
  product: Product;
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const mounted = useMounted();

  const discount = getDiscountPercent(product.price, product.compareAtPrice);
  const stockStatus = getStockStatus(product.stock);
  const outOfStock = product.stock === 0;

  const handleAddToCart = useCallback(() => {
    if (outOfStock) return;
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        stock: product.stock,
      },
      quantity,
    );
    setAdded(true);
    window.dispatchEvent(new Event('open-cart-drawer'));
    setTimeout(() => setAdded(false), 2000);
  }, [addItem, product, quantity, outOfStock]);

  const maxQuantity = Math.min(product.stock, 99);

  return (
    <div className="space-y-5">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
        {discount && (
          <span className="bg-destructive text-destructive-foreground text-sm font-bold px-2 py-0.5 rounded">
            Save {discount}%
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <StarRating rating={product.rating} size={18} showValue />
        <span className="text-sm text-muted-foreground">
          ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 text-sm font-medium',
            stockStatus.variant === 'out-of-stock'
              ? 'text-destructive'
              : stockStatus.variant === 'low-stock'
                ? 'text-warning'
                : 'text-success',
          )}
        >
          {stockStatus.variant === 'out-of-stock' ? (
            <AlertCircle size={16} />
          ) : (
            <Check size={16} />
          )}
          {stockStatus.label}
        </span>
        <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
      </div>

      <div className="border-t border-border pt-5 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-lg">
            <button
              className="p-2.5 hover:bg-muted rounded-l-lg disabled:opacity-40"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 text-base font-semibold min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              className="p-2.5 hover:bg-muted rounded-r-lg disabled:opacity-40"
              onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
              disabled={quantity >= maxQuantity}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <Button
            size="lg"
            className="flex-1 h-12"
            onClick={handleAddToCart}
            disabled={outOfStock || !mounted}
          >
            {added ? (
              <>
                <Check size={18} className="mr-2" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag size={18} className="mr-2" />
                {outOfStock ? 'Out of Stock' : 'Add to Cart'}
              </>
            )}
          </Button>
        </div>

        {product.stock > 0 && product.stock <= 10 && (
          <p className="text-sm text-warning font-medium">
            Hurry! Only {product.stock} left in stock.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border text-sm">
        <div className="flex items-center gap-2">
          <Check size={16} className="text-success" />
          <span>Free shipping over $75</span>
        </div>
        <div className="flex items-center gap-2">
          <Check size={16} className="text-success" />
          <span>30-day returns</span>
        </div>
        <div className="flex items-center gap-2">
          <Check size={16} className="text-success" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <Check size={16} className="text-success" />
          <span>2-year warranty</span>
        </div>
      </div>
    </div>
  );
}
