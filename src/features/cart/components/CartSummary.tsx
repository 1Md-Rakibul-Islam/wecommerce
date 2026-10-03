import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";

interface CartSummaryProps {
  amountToFreeShipping: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export function CartSummary({
  amountToFreeShipping,
  subtotal,
  shipping,
  tax,
  total,
}: CartSummaryProps) {
  return (
    <div className="lg:sticky lg:top-20 lg:self-start">
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold text-lg">Order Summary</h2>

        {amountToFreeShipping > 0 ? (
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm">
            <p className="text-primary font-medium">
              Add {formatPrice(amountToFreeShipping)} more for free shipping!
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
  );
}
