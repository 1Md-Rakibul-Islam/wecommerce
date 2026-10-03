import Link from "next/link";
import { ProductCard } from "@/features/products/components/product-card";
import { Product } from "@/types/product";
import { Star } from "lucide-react";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="bg-muted/30">
      <div className="container-page py-12 lg:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star size={20} className="fill-primary text-primary" />
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                Featured Products
              </h2>
            </div>
            <p className="text-muted-foreground">
              Top-rated picks from our collection
            </p>
          </div>
          <Link
            href="/shop?sort=rating-desc"
            className="text-sm font-medium text-primary hover:underline hidden sm:block"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
