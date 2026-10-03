import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCartState() {
  return (
    <div className="container-page py-20 lg:py-32 flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
        <ShoppingBag size={48} />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Your cart is empty
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Looks like you haven't added any items to your cart yet. Browse our
        collection to find something you'll love.
      </p>
      <Link href="/shop">
        <Button size="lg" className="h-12 px-8">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
