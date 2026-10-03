'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingBag, Trash2, Plus, Minus, X } from 'lucide-react';
import Link from 'next/link';
import { useCartUI } from '@/features/cart/components/cart-provider';
import { useCartStore } from '@/features/cart/store/cart-store';
import { useMounted } from '@/hooks/use-mounted';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

export function CartDrawer() {
  const cartUI = useCartUI();
  const mounted = useMounted();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const shipping = subtotal > 75 || subtotal === 0 ? 0 : 7.99;
    const total = Math.round((subtotal + shipping) * 100) / 100;
    return { subtotal, itemCount, shipping, total };
  }, [items]);

  if (!mounted || !cartUI) return null;

  const { cartOpen, closeCart } = cartUI;

  return (
    <Sheet open={cartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-5 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag size={18} />
            Your Cart ({totals.itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag size={28} className="text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Browse our products and add items to your cart.
              </p>
            </div>
            <Link href="/shop" onClick={closeCart}>
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCart}
                    className="shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover border border-border"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-border rounded-md">
                        <button
                          className="p-1 hover:bg-muted rounded-l-md"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          className="p-1 hover:bg-muted rounded-r-md"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-semibold shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-5 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}
                </span>
              </div>
              {totals.shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add {formatPrice(75 - totals.subtotal)} more for free shipping
                </p>
              )}
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">{formatPrice(totals.total)}</span>
              </div>
              <Link href="/checkout" onClick={closeCart} className="block">
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
              </Link>
              <Link href="/cart" onClick={closeCart} className="block">
                <Button variant="outline" className="w-full">
                  View Cart
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
