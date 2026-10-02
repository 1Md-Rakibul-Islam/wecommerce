'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { useMounted } from '@/hooks/use-mounted';

interface OrderInfo {
  orderId: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  email: string;
  shippingAddress: string;
}

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const mounted = useMounted();
  const [order, setOrder] = useState<OrderInfo | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('lastOrder');
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  if (!mounted) {
    return <div className="container-page py-20"><div className="h-96 rounded-xl skeleton-shimmer" /></div>;
  }

  return (
    <div className="container-page py-16 max-w-2xl text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mx-auto mb-6 animate-scale-in">
        <CheckCircle2 size={40} className="text-success" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-3">Order Confirmed!</h1>
      <p className="text-muted-foreground text-lg mb-2">
        Thank you for your purchase.
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        Order ID: <span className="font-mono font-medium text-foreground">{orderId || 'N/A'}</span>
      </p>

      {order && (
        <div className="rounded-xl border border-border bg-card p-6 text-left space-y-4 mb-8">
          <div className="flex items-center gap-2 text-sm">
            <Mail size={16} className="text-muted-foreground" />
            <span>Confirmation sent to <span className="font-medium">{order.email}</span></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Package size={16} className="text-muted-foreground" />
            <span>Shipping to: <span className="font-medium">{order.shippingAddress}</span></span>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="font-semibold text-sm mb-3">Order Items</h3>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4 flex justify-between">
            <span className="font-semibold">Total Paid</span>
            <span className="font-bold text-lg">{formatPrice(order.total)}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
