'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, CreditCard, Lock, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useMounted } from '@/hooks/use-mounted';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const checkoutSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP code is required').regex(/^\d{5}(-\d{4})?$/, 'Enter a valid ZIP code'),
  country: z.string().min(1, 'Country is required'),
  cardName: z.string().min(1, 'Name on card is required'),
  cardNumber: z.string()
    .min(1, 'Card number is required')
    .regex(/^[\d\s]{13,19}$/, 'Enter a valid card number'),
  cardExpiry: z.string()
    .min(1, 'Expiry date is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY format'),
  cardCvc: z.string()
    .min(1, 'CVC is required')
    .regex(/^\d{3,4}$/, 'Enter a valid CVC'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const mounted = useMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: 'United States',
    },
  });

  const selectedState = watch('state');

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    sessionStorage.setItem(
      'lastOrder',
      JSON.stringify({
        orderId,
        items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
        total,
        email: data.email,
        shippingAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state} ${data.zipCode}`,
      }),
    );
    clearCart();
    setIsSubmitting(false);
    router.push(`/order/success?id=${orderId}`);
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const orderItems = useMemo(() => items, [items]);

  if (!mounted) {
    return <div className="container-page py-12"><div className="h-96 rounded-xl skeleton-shimmer" /></div>;
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-6">
          <ShoppingBag size={28} className="text-muted-foreground" />
        </div>
        <h1 className="text-xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          Add some products to your cart before checking out.
        </p>
        <Link href="/shop">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  const inputClass = 'h-11';

  return (
    <div className="container-page py-8 max-w-6xl">
      <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft size={16} />
        Back to cart
      </Link>

      <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-8">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-8">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={inputClass}
                {...register('email')}
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" className={inputClass} {...register('firstName')} />
                {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" className={inputClass} {...register('lastName')} />
                {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">Street address</Label>
                <Input id="address" placeholder="123 Main St" className={inputClass} {...register('address')} />
                {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" className={inputClass} {...register('city')} />
                {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Select
                  value={selectedState}
                  onValueChange={(value) => setValue('state', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="state" className={inputClass}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-sm text-destructive mt-1">{errors.state.message}</p>}
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP code</Label>
                <Input id="zipCode" placeholder="12345" className={inputClass} {...register('zipCode')} />
                {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>}
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" className={inputClass} {...register('country')} disabled />
                {errors.country && <p className="text-sm text-destructive mt-1">{errors.country.message}</p>}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={20} />
              <h2 className="font-semibold text-lg">Payment Details</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardName">Name on card</Label>
                <Input id="cardName" className={inputClass} {...register('cardName')} />
                {errors.cardName && <p className="text-sm text-destructive mt-1">{errors.cardName.message}</p>}
              </div>
              <div>
                <Label htmlFor="cardNumber">Card number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className={inputClass}
                  {...register('cardNumber')}
                  onChange={(e) => {
                    e.target.value = formatCardNumber(e.target.value);
                  }}
                />
                {errors.cardNumber && <p className="text-sm text-destructive mt-1">{errors.cardNumber.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardExpiry">Expiry date</Label>
                  <Input
                    id="cardExpiry"
                    placeholder="MM/YY"
                    className={inputClass}
                    {...register('cardExpiry')}
                    onChange={(e) => {
                      e.target.value = formatExpiry(e.target.value);
                    }}
                  />
                  {errors.cardExpiry && <p className="text-sm text-destructive mt-1">{errors.cardExpiry.message}</p>}
                </div>
                <div>
                  <Label htmlFor="cardCvc">CVC</Label>
                  <Input
                    id="cardCvc"
                    placeholder="123"
                    className={inputClass}
                    {...register('cardCvc')}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
                    }}
                  />
                  {errors.cardCvc && <p className="text-sm text-destructive mt-1">{errors.cardCvc.message}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock size={14} />
                Your payment information is encrypted and secure
              </div>
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="font-semibold text-lg">Order Summary</h2>

            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative h-14 w-14 rounded-lg overflow-hidden border border-border shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold px-1">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{formatPrice(item.price)} each</p>
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
                <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
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
      </form>
    </div>
  );
}
