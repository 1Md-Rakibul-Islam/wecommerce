import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  fetchProductISR,
  fetchAllProductSlugs,
  fetchRelatedSSG,
} from "@/features/products/api/server-fetch";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { AddToCartSection } from "@/features/products/components/add-to-cart-section";
import { RelatedProducts } from "@/features/products/components/related-products";
import { ProductJsonLd } from "@/components/seo/product-json-ld";
import { ProductTabs } from "@/features/products/components/product-tabs";
import { KeyFeatures } from "@/features/products/components/key-features";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// SSG: Pre-render all product pages at build time
export async function generateStaticParams() {
  const slugs = fetchAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ISR: Revalidate every hour
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = fetchProductISR(slug);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }
  return {
    title: `${product.name} — ${formatPrice(product.price)}`,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      title: product.name,
      description: product.description,
      images: product.images.map((img) => ({ url: img, alt: product.name })),
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  // ISR: Fetch product with revalidation
  const product = fetchProductISR(slug);
  if (!product) {
    notFound();
  }

  // SSG: Fetch related products at build time as fallback (reads from JSON)
  // Client-side TanStack Query will refresh them via API (CSR)
  const relatedFallback = fetchRelatedSSG(slug, 4);

  return (
    <main className="container-page py-6 lg:py-8">
      <ProductJsonLd product={product} />

      <section className="container-page py-6 lg:py-8">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            href="/shop"
            className="hover:text-foreground transition-colors"
          >
            Shop
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-foreground transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={product.images} alt={product.name} />

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-primary">
                {product.brand}
              </span>
              <Badge variant="secondary" className="text-xs">
                {product.subcategory}
              </Badge>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-balance">
              {product.name}
            </h1>

            <div className="mt-4">
              <AddToCartSection product={product} />
            </div>

            <Separator className="my-6" />

            <KeyFeatures features={product.features} />
          </div>
        </div>

        <div className="mt-12">
          <ProductTabs product={product} />
        </div>

        <RelatedProducts slug={slug} fallbackProducts={relatedFallback} />
      </section>
    </main>
  );
}
