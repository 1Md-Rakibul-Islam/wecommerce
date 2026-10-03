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
import { HeroSlider } from "@/components/home/hero-slider";

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
      <HeroSlider />

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

      <section className="bg-card border-y border-border overflow-hidden py-10">
        <div className="container-page mb-6 text-center">
          <h2 className="text-xl font-bold tracking-tight text-muted-foreground uppercase">Brands We Love</h2>
        </div>
        <div className="flex w-full overflow-hidden whitespace-nowrap group">
          <div className="flex animate-marquee gap-16 px-8 items-center opacity-60">
            {['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'IKEA', 'Dyson', 'Bose', 'Logitech', 'Nintendo'].map((brand, i) => (
              <span key={i} className="text-3xl font-extrabold tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                {brand}
              </span>
            ))}
          </div>
          <div className="flex animate-marquee gap-16 px-8 items-center opacity-60" aria-hidden="true">
            {['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'IKEA', 'Dyson', 'Bose', 'Logitech', 'Nintendo'].map((brand, i) => (
              <span key={i} className="text-3xl font-extrabold tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-primary text-primary-foreground py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-black/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container-page relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Join Our Newsletter
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-xl mx-auto">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 h-12 px-4 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                required
              />
              <Button
                type="button"
                size="lg"
                variant="secondary"
                className="h-12 px-8 rounded-full font-bold text-primary hover:scale-105 transition-transform"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-primary-foreground/70 mt-4">
              By subscribing you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
