"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/features/products/components/state-components";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    tax,
    total,
    itemCount,
  } = useCart();
  const mounted = useMounted();

  const freeShippingThreshold = 75;
  const amountToFreeShipping = useMemo(
    () => Math.max(0, freeShippingThreshold - subtotal),
    [subtotal],
  );

  if (!mounted) {
    return (
      <div className="container-page py-12">
        <div className="h-96 rounded-xl skeleton-shimmer" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-12">
        <EmptyState
          title="Your cart is empty"
          description="Browse our products and add items to your cart to get started."
          actionLabel="Start Shopping"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <main>
      <div className="container-page py-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={24} />
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Shopping Cart
          </h1>
          <span className="text-muted-foreground">({itemCount} items)</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-xl border border-border bg-card p-4"
              >
                <Link href={`/products/${item.slug}`} className="shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg object-cover border border-border"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-medium hover:text-primary transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatPrice(item.price)} each
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        className="p-1.5 hover:bg-muted rounded-l-lg"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-medium min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="p-1.5 hover:bg-muted rounded-r-lg disabled:opacity-40"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-lg">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  {item.quantity >= item.stock && (
                    <p className="text-xs text-warning mt-1">
                      Max stock reached
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Link href="/shop">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h2 className="font-semibold text-lg">Order Summary</h2>

              {amountToFreeShipping > 0 ? (
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm">
                  <p className="text-primary font-medium">
                    Add {formatPrice(amountToFreeShipping)} more for free
                    shipping!
                  </p>
                </div>
              ) : (
                <div className="rounded-lg bg-success/10 border border-success/20 p-3 text-sm">
                  <p className="text-success font-medium">
                    You qualify for free shipping!
                  </p>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-xl">{formatPrice(total)}</span>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
