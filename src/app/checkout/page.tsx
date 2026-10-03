"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FormProvider } from "react-hook-form";

import { useCart } from "@/hooks/use-cart";
import { useCheckoutForm } from "@/features/checkout/hooks/useCheckoutForm";
import { EmptyCartState } from "@/features/checkout/components/EmptyCartState";
import { ContactInfo } from "@/features/checkout/components/ContactInfo";
import { ShippingAddress } from "@/features/checkout/components/ShippingAddress";
import { PaymentDetails } from "@/features/checkout/components/PaymentDetails";
import { OrderSummary } from "@/features/checkout/components/OrderSummary";

export default function CheckoutPage() {
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);
  const { formMethods, onSubmit, isSubmitting } = useCheckoutForm();
  const { errors } = formMethods.formState;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <main className="animate-fade-in bg-muted/20 min-h-[calc(100vh-8rem)]">
      <section className="container-page py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link
            href="/cart"
            className="hover:text-foreground transition-colors"
          >
            Cart
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground font-medium">Checkout</span>
        </div>

        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="grid lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              <ContactInfo />
              <ShippingAddress />
              <PaymentDetails />
            </div>

            {/* Right Column - Summary */}
            <OrderSummary isSubmitting={isSubmitting} />
          </form>
        </FormProvider>
      </section>
    </main>
  );
}
