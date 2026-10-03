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
import { ReviewList } from "@/features/products/components/review-list";
import { RelatedProducts } from "@/features/products/components/related-products";
import { ProductJsonLd } from "@/components/seo/product-json-ld";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Check } from "lucide-react";

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
    <>
      <ProductJsonLd product={product} />

      <div className="container-page py-6 lg:py-8">
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

            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check size={16} className="text-success mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="inline-flex h-12 items-center justify-start rounded-full bg-muted/50 p-1 text-muted-foreground w-full sm:w-auto overflow-x-auto scrollbar-hide">
              <TabsTrigger
                value="description"
                className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {product.longDescription}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                        <td className="px-4 py-3 font-medium w-1/3">
                          {spec.label}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <ReviewList
                reviews={product.reviews}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            </TabsContent>
          </Tabs>
        </div>

        <RelatedProducts
          slug={slug}
          fallbackProducts={relatedFallback}
        />
      </div>
    </>
  );
}
