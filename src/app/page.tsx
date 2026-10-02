import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";
import {
  fetchFeaturedProducts,
  fetchNewArrivals,
} from "@/lib/api/server-fetch";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  {
    name: "Electronics",
    href: "/shop?category=Electronics",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Headphones, cameras, smart devices",
  },
  {
    name: "Fashion",
    href: "/shop?category=Fashion",
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Clothing, footwear, accessories",
  },
  {
    name: "Home & Living",
    href: "/shop?category=Home+%26+Living",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Furniture, decor, kitchenware",
  },
  {
    name: "Sports & Outdoors",
    href: "/shop?category=Sports+%26+Outdoors",
    image:
      "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Fitness, camping, cycling gear",
  },
  {
    name: "Beauty & Health",
    href: "/shop?category=Beauty+%26+Health",
    image:
      "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Skincare, supplements, fragrance",
  },
  {
    name: "Books & Media",
    href: "/shop?category=Books+%26+Media",
    image:
      "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Fiction, non-fiction, stationery",
  },
];

const FEATURES = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $75",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "Encrypted & protected",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Hassle-free returns",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
  },
];

// SSG: Homepage is statically generated at build time
export const revalidate = 3600;

export default function HomePage() {
  // SSG: Read product data from JSON files at build time
  const featured = fetchFeaturedProducts();
  const newArrivals = fetchNewArrivals();

  return (
    <div className="animate-fade-in">
      <section className="relative w-full h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Hero background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/40 to-black/30 backdrop-blur-[2px]" />
        </div>

        {/* Content */}
        <div className="container-page relative z-10 text-center text-white space-y-6 lg:space-y-8 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            New Collection 2026
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance max-w-4xl mx-auto drop-shadow-lg">
            Elevate Your Lifestyle with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Premium Picks</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Discover a curated marketplace of top-tier electronics, fashion, and home goods. Experience seamless shopping from top vendors worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/shop">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full font-semibold shadow-xl shadow-primary/25 hover:scale-105 transition-transform">
                Shop The Collection
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/shop?category=Fashion">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg rounded-full font-semibold border-white text-white hover:bg-white hover:text-black transition-colors"
              >
                Explore Fashion
              </Button>
            </Link>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 md:pt-16 max-w-4xl mx-auto border-t border-white/20 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-white/70 mt-1">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-white/70 mt-1">Top Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-white/70 mt-1">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-white/70 mt-1">Secure Checkout</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-page py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <feature.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <p className="text-muted-foreground mt-1">
              Find exactly what you are looking for
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-primary hover:underline hidden sm:block"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white">
                  {category.name}
                </h3>
                <p className="text-sm text-white/80 mt-0.5 line-clamp-1">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="container-page py-12 lg:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                Featured Products
              </h2>
              <p className="text-muted-foreground mt-1">
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
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              New Arrivals
            </h2>
            <p className="text-muted-foreground mt-1">
              Fresh additions to our store
            </p>
          </div>
          <Link
            href="/shop?sort=newest"
            className="text-sm font-medium text-primary hover:underline hidden sm:block"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-12 lg:py-16 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
            Ready to start shopping?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
            Browse our full catalog of 500+ products with smart filters, fast
            search, and secure checkout.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-8 text-base"
            >
              Browse All Products
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
