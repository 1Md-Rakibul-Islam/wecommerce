import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import { fetchFeaturedProducts, fetchNewArrivals } from '@/lib/api/server-fetch';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  {
    name: 'Electronics',
    href: '/shop?category=Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Headphones, cameras, smart devices',
  },
  {
    name: 'Fashion',
    href: '/shop?category=Fashion',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Clothing, footwear, accessories',
  },
  {
    name: 'Home & Living',
    href: '/shop?category=Home+%26+Living',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Furniture, decor, kitchenware',
  },
  {
    name: 'Sports & Outdoors',
    href: '/shop?category=Sports+%26+Outdoors',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Fitness, camping, cycling gear',
  },
  {
    name: 'Beauty & Health',
    href: '/shop?category=Beauty+%26+Health',
    image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Skincare, supplements, fragrance',
  },
  {
    name: 'Books & Media',
    href: '/shop?category=Books+%26+Media',
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Fiction, non-fiction, stationery',
  },
];

const FEATURES = [
  { icon: Truck, title: 'Free Shipping', description: 'On all orders over $75' },
  { icon: ShieldCheck, title: 'Secure Checkout', description: 'Encrypted & protected' },
  { icon: RotateCcw, title: '30-Day Returns', description: 'Hassle-free returns' },
  { icon: Headphones, title: '24/7 Support', description: 'Always here to help' },
];

// SSG: Homepage is statically generated at build time
export const revalidate = 3600;

export default function HomePage() {
  // SSG: Read product data from JSON files at build time
  const featured = fetchFeaturedProducts();
  const newArrivals = fetchNewArrivals();

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="container-page py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                New Season, New Arrivals
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance">
                Premium products for{' '}
                <span className="text-primary">modern living</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover 500+ curated products across 8 categories. From
                electronics to fashion, home goods to sports gear — find exactly
                what you need with smart search and fast checkout.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/shop">
                  <Button size="lg" className="h-12 px-8 text-base">
                    Shop Now
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/shop?sort=newest">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                    New Arrivals
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-2xl font-bold">4.5★</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </div>

            <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Featured product"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Featured</p>
                    <p className="font-semibold">Premium Electronics</p>
                  </div>
                  <Link href="/shop?category=Electronics">
                    <Button size="sm">Explore</Button>
                  </Link>
                </div>
              </div>
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
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground mt-1">Find exactly what you are looking for</p>
          </div>
          <Link href="/shop" className="text-sm font-medium text-primary hover:underline hidden sm:block">
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
                <h3 className="text-lg font-bold text-white">{category.name}</h3>
                <p className="text-sm text-white/80 mt-0.5 line-clamp-1">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="container-page py-12 lg:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Featured Products</h2>
              <p className="text-muted-foreground mt-1">Top-rated picks from our collection</p>
            </div>
            <Link href="/shop?sort=rating-desc" className="text-sm font-medium text-primary hover:underline hidden sm:block">
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
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">New Arrivals</h2>
            <p className="text-muted-foreground mt-1">Fresh additions to our store</p>
          </div>
          <Link href="/shop?sort=newest" className="text-sm font-medium text-primary hover:underline hidden sm:block">
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
            Browse our full catalog of 500+ products with smart filters,
            fast search, and secure checkout.
          </p>
          <Link href="/shop">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-base">
              Browse All Products
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
