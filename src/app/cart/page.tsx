"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/features/products/components/state-components";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";

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
      <section>
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
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}

              <div className="flex justify-between items-center pt-4">
                <Link href="/shop">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </div>
            </div>

            <CartSummary
              amountToFreeShipping={amountToFreeShipping}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
