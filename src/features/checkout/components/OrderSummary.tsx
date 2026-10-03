import Image from "next/image";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/hooks/use-cart";

interface OrderSummaryProps {
  isSubmitting: boolean;
}

export function OrderSummary({ isSubmitting }: OrderSummaryProps) {
  const { items: orderItems, total: subtotal } = useCart();
  const shipping = subtotal > 75 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="lg:sticky lg:top-20 lg:self-start">
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold text-lg">Order Summary</h2>

        <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
          {orderItems.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative h-14 w-14 rounded-lg overflow-hidden border border-border shrink-0">
                <Image
                  width={56}
                  height={56}
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold px-1">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatPrice(item.price)} each
                </p>
              </div>
              <span className="text-sm font-medium shrink-0">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

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

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <Lock size={16} className="mr-2" />
              Place Order
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By placing your order, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
