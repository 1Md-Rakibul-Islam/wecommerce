"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice, getDiscountPercent, getStockStatus } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { StarRating } from "@/components/products/star-rating";
import { cn } from "@/lib/utils";

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
    window.dispatchEvent(new Event("open-cart-drawer"));
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg product-card-shadow hover:product-card-shadow-hover card-hover-lift"
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-105",
            outOfStock && "opacity-60",
          )}
          priority={priority}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && (
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md">
              -{discount}%
            </span>
          )}
          {stockStatus.variant === "low-stock" && (
            <span className="bg-warning text-warning-foreground text-xs font-bold px-2 py-1 rounded-md">
              Low stock
            </span>
          )}
        </div>
        {outOfStock && (
          <span className="absolute top-3 right-3 bg-foreground/80 text-background text-xs font-medium px-2 py-1 rounded-md">
            Out of Stock
          </span>
        )}
        {/* Quick view overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5 bg-white/90 text-foreground text-sm font-medium px-3 py-2 rounded-lg shadow-lg">
            <Eye size={16} />
            Quick view
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <span className="text-xs font-medium text-muted-foreground mb-1">
          {product.brand}
        </span>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-2">
          <StarRating rating={product.rating} size={14} />
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
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

          <button
            onClick={handleAddToCart}
            disabled={outOfStock || !mounted}
            aria-label="Add to cart"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-all",
              outOfStock
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 active:scale-95",
            )}
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
}

export const ProductCard = memo(ProductCardComponent);
