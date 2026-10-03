import { Suspense } from "react";
import { OrderSuccessView } from "@/features/checkout/components/OrderSuccessView";

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-20">
          <div className="h-96 rounded-xl skeleton-shimmer" />
        </div>
      }
    >
      <OrderSuccessView />
    </Suspense>
  );
}
