import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Store,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Users,
  Globe,
  Award,
  ArrowRight,
  Sparkles,
  Target,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About ShopCraft",
  description:
    "Learn about ShopCraft — your premium online destination for 500+ products across 8 categories with fast search, smart filters, and secure checkout.",
};

const VALUES = [
  {
    icon: Users,
    title: "Customer First",
    description:
      "Every decision we make starts with what is best for our customers.",
  },
  {
    icon: Globe,
    title: "Curated Selection",
    description:
      "We handpick every product to ensure quality across all categories.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Security",
    description:
      "Your data and transactions are always protected and encrypted.",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description:
      "We stand behind every product with our satisfaction guarantee.",
  },
];

const STATS = [
  { value: "500+", label: "Products" },
  { value: "8", label: "Categories" },
  { value: "50k+", label: "Happy Customers" },
  { value: "4.5★", label: "Average Rating" },
];

const TIMELINE = [
  {
    year: "2021",
    title: "The Beginning",
    description:
      "ShopCraft started as a small idea — bring quality products to everyone in one place.",
  },
  {
    year: "2022",
    title: "Growing Fast",
    description:
      "We expanded to 8 categories and reached 10,000+ happy customers within our first year.",
  },
  {
    year: "2023",
    title: "Going Premium",
    description:
      "Launched our curated collection with a focus on quality, design, and sustainability.",
  },
  {
    year: "2026",
    title: "Today",
    description:
      "Now serving 50,000+ customers with 500+ products and a 4.5-star average rating.",
  },
];

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="container-page relative py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in-up">
                <Store size={16} />
                About ShopCraft
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-balance mb-6 leading-[1.1]">
                Premium products for{" "}
                <span className="text-gradient">modern living</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                ShopCraft was founded with a simple mission: to make quality
                products accessible to everyone. From electronics to fashion,
                home goods to sports gear, we curate the best across 8
                categories so you can find exactly what you need with
                confidence.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/5585841/pexels-photo-5585841.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Happy customers unpacking shopping bags"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl lg:text-5xl font-bold text-primary transition-transform group-hover:scale-110">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted/30">
        <div className="container-page py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target size={24} className="text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">
                  Our Mission
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We believe that shopping online should be easy, enjoyable, and
                trustworthy. That is why we built ShopCraft — a curated
                marketplace where every product meets our quality standards,
                every checkout is secure, and every customer feels valued. Our
                mission is to bring you the best products from around the world,
                all in one place.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart size={24} className="text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">
                  What We Stand For
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Quality, transparency, and customer satisfaction are at the
                heart of everything we do. We partner with trusted brands, offer
                honest pricing, and stand behind every product with a 30-day
                return guarantee. Your trust is our most valuable asset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-page py-12 lg:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles size={14} />
            Our Journey
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
            From idea to marketplace
          </h2>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />
          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex items-start gap-6 lg:gap-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold z-10 -translate-x-1/2 mt-1">
                  {i + 1}
                </div>
                <div
                  className={`pl-12 lg:pl-0 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}
                >
                  <span className="text-primary font-bold text-lg">
                    {item.year}
                  </span>
                  <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30">
        <div className="container-page py-12 lg:py-16">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-card p-6 card-hover-lift hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 transition-transform hover:scale-110">
                  <value.icon size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="container-page py-12 lg:py-16">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center mb-12">
          Why Shop With Us
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              description: "On all orders over $75",
            },
            {
              icon: ShieldCheck,
              title: "Secure Checkout",
              description: "Bank-level encryption",
            },
            {
              icon: RotateCcw,
              title: "30-Day Returns",
              description: "No questions asked",
            },
            {
              icon: Headphones,
              title: "24/7 Support",
              description: "Always here to help",
            },
          ].map((item) => (
            <div key={item.title} className="text-center group">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-3 transition-transform group-hover:scale-110">
                <item.icon size={24} />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-12 lg:py-16 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
            Ready to explore our collection?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
            Join 50,000+ happy customers who shop with us for quality products
            and exceptional service.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-8 text-base group"
            >
              Start Shopping
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
