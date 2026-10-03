import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Star,
  Sparkles,
  TrendingUp,
  Clock,
  Zap,
  Quote,
  ShoppingBag,
} from "lucide-react";
import {
  fetchFeaturedProducts,
  fetchNewArrivals,
} from "@/lib/api/server-fetch";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { TestimonialSlider } from "@/components/home/testimonial-slider";

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

const HERO_PRODUCTS = [
  {
    image:
      "https://images.pexels.com/photos/10292808/pexels-photo-10292808.jpeg?auto=compress&cs=tinysrgb&w=800",
    name: "Studio Pro Headphones",
    price: "$249",
    badge: "Best Seller",
  },
  {
    image:
      "https://images.pexels.com/photos/21070424/pexels-photo-21070424.jpeg?auto=compress&cs=tinysrgb&w=800",
    name: "Designer Sneakers",
    price: "$189",
    badge: "New",
  },
  {
    image:
      "https://images.pexels.com/photos/9142237/pexels-photo-9142237.jpeg?auto=compress&cs=tinysrgb&w=800",
    name: "Smart Watch Ultra",
    price: "$329",
    badge: "Trending",
  },
];

const PROMO_BANNERS = [
  {
    tag: "Tech Sale",
    title: "Electronics up to 40% off",
    description: "Headphones, cameras, wearables and more",
    href: "/shop?category=Electronics",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
    accent: "from-blue-600 to-cyan-500",
  },
  {
    tag: "New Season",
    title: "Fresh fashion arrivals",
    description: "Upgrade your wardrobe for the season",
    href: "/shop?category=Fashion",
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
    accent: "from-amber-500 to-orange-500",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Verified Buyer",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    text: "Absolutely love shopping here. The product quality is outstanding and delivery is super fast. I have made five orders and never been disappointed.",
  },
  {
    name: "James Chen",
    role: "Verified Buyer",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    text: "The checkout process is seamless and the customer support team is incredibly responsive. My go-to online store for everything I need.",
  },
  {
    name: "Emily Rodriguez",
    role: "Verified Buyer",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    text: "Great prices, huge selection, and the returns process could not be easier. I recommend ShopCraft to all my friends and family.",
  },
];

export const revalidate = 3600;

export default function HomePage() {
  const featured = fetchFeaturedProducts();
  const newArrivals = fetchNewArrivals();

  return (
    <div className="animate-fade-in">
      {/* Hero Section — Modern E-commerce */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 hero-grid-pattern opacity-[0.07]" />
        {/* Glow accents */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="container-page relative py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Copy + CTAs */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium animate-fade-in-up border border-white/15">
                <Sparkles size={14} />
                Mega Sale — Up to 50% Off
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.05] text-balance">
                Shop smarter,{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  live better
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                500+ premium products across 8 categories. Electronics, fashion,
                home goods and more — curated for quality, priced for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/shop">
                  <Button
                    size="lg"
                    className="h-12 px-8 text-base group bg-white text-slate-900 hover:bg-white/90"
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Shop Now
                  </Button>
                </Link>
                <Link href="/shop?sort=newest">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-base border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white/30"
                  >
                    New Arrivals
                    <ArrowRight
                      size={18}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-slate-400">Products</div>
                </div>
                <div className="h-8 w-px bg-white/15" />
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-sm text-slate-400">Categories</div>
                </div>
                <div className="h-8 w-px bg-white/15" />
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white flex items-center gap-1 justify-center lg:justify-start">
                    4.5
                    <Star size={18} className="fill-amber-400 text-amber-400" />
                  </div>
                  <div className="text-sm text-slate-400">Avg Rating</div>
                </div>
              </div>
            </div>

            {/* Right: Product showcase grid */}
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              {/* Large featured product */}
              <div className="relative col-span-2 sm:col-span-1 sm:row-span-2 aspect-square sm:aspect-auto rounded-2xl overflow-hidden group ring-1 ring-white/10">
                <Image
                  src={HERO_PRODUCTS[0].image}
                  alt={HERO_PRODUCTS[0].name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">
                    <TrendingUp size={12} />
                    {HERO_PRODUCTS[0].badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-sm">
                    {HERO_PRODUCTS[0].name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white font-bold text-lg">
                      {HERO_PRODUCTS[0].price}
                    </span>
                    <Link
                      href="/shop?category=Electronics"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900 hover:scale-110 transition-transform"
                    >
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Top-right product */}
              <div className="relative aspect-square rounded-2xl overflow-hidden group ring-1 ring-white/10 hidden sm:block">
                <Image
                  src={HERO_PRODUCTS[1].image}
                  alt={HERO_PRODUCTS[1].name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold">
                    {HERO_PRODUCTS[1].badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-xs">
                    {HERO_PRODUCTS[1].name}
                  </p>
                  <p className="text-white font-bold text-sm mt-0.5">
                    {HERO_PRODUCTS[1].price}
                  </p>
                </div>
              </div>

              {/* Bottom-right product */}
              <div className="relative aspect-square rounded-2xl overflow-hidden group ring-1 ring-white/10 hidden sm:block">
                <Image
                  src={HERO_PRODUCTS[2].image}
                  alt={HERO_PRODUCTS[2].name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs font-bold">
                    {HERO_PRODUCTS[2].badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-xs">
                    {HERO_PRODUCTS[2].name}
                  </p>
                  <p className="text-white font-bold text-sm mt-0.5">
                    {HERO_PRODUCTS[2].price}
                  </p>
                </div>
              </div>

              {/* Mobile: show second product in full width */}
              <div className="relative col-span-2 sm:hidden aspect-[4/3] rounded-2xl overflow-hidden group ring-1 ring-white/10">
                <Image
                  src={HERO_PRODUCTS[1].image}
                  alt={HERO_PRODUCTS[1].name}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-sm">
                    {HERO_PRODUCTS[1].name}
                  </p>
                  <p className="text-white font-bold text-base mt-0.5">
                    {HERO_PRODUCTS[1].price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-border bg-card">
        <div className="container-page py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 transition-transform group-hover:scale-110">
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

      {/* Promo Banners */}
      <section className="container-page py-12 lg:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {PROMO_BANNERS.map((banner) => (
            <Link
              key={banner.tag}
              href={banner.href}
              className="group relative aspect-[16/9] rounded-2xl overflow-hidden"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${banner.accent} opacity-80 mix-blend-multiply`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-3">
                  {banner.tag}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  {banner.title}
                </h3>
                <p className="text-white/80 mb-4">{banner.description}</p>
                <span className="inline-flex items-center gap-1.5 text-white font-medium text-sm group-hover:gap-3 transition-all">
                  Shop now
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
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
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border card-hover-lift hover:shadow-xl"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
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

      {/* Featured Products */}
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
            {featured.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={i < 4}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-page py-12 lg:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={20} className="text-primary" />
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                New Arrivals
              </h2>
            </div>
            <p className="text-muted-foreground">
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

      {/* Testimonials */}
      <section className="bg-muted/30">
        <div className="container-page py-12 lg:py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Quote size={14} />
              Customer Stories
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
              Loved by thousands of shoppers
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Do not just take our word for it — here is what our customers have
              to say
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container-page py-12 lg:py-16">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-cyan-600 p-8 lg:p-12 text-center overflow-hidden relative">
          <div className="absolute inset-0 hero-grid-pattern opacity-20" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
              <Clock size={14} />
              Limited Time Offer
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3">
              Get 15% off your first order
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Subscribe to our newsletter for exclusive deals, new product
              alerts, and insider discounts you will not find anywhere else.
            </p>
            <div className="max-w-md mx-auto">
              <div className="[&_*]:!bg-white [&_input]:!text-foreground [&_button]:!bg-primary [&_button]:!text-primary-foreground">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
              className="h-12 px-8 text-base group bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900 border-none shadow-lg"
            >
              Browse All Products
              <ArrowRight
                size={18}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
