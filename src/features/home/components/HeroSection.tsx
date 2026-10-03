import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  Sparkles,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_PRODUCTS } from "../data/home-data";

export function HeroSection() {
  return (
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
  );
}
