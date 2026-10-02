import type { Metadata } from 'next';
import { Store, Truck, ShieldCheck, RotateCcw, Headphones, Users, Globe, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About ShopCraft',
  description: 'Learn about ShopCraft — your premium online destination for 500+ products across 8 categories with fast search, smart filters, and secure checkout.',
};

const VALUES = [
  { icon: Users, title: 'Customer First', description: 'Every decision we make starts with what is best for our customers.' },
  { icon: Globe, title: 'Curated Selection', description: 'We handpick every product to ensure quality across all categories.' },
  { icon: ShieldCheck, title: 'Trust & Security', description: 'Your data and transactions are always protected and encrypted.' },
  { icon: Award, title: 'Quality Guarantee', description: 'We stand behind every product with our satisfaction guarantee.' },
];

const STATS = [
  { value: '500+', label: 'Products' },
  { value: '8', label: 'Categories' },
  { value: '50k+', label: 'Happy Customers' },
  { value: '4.5★', label: 'Average Rating' },
];

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="container-page py-16 lg:py-24 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Store size={16} />
            About ShopCraft
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-balance mb-6">
            Premium products for modern living
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            ShopCraft was founded with a simple mission: to make quality
            products accessible to everyone. From electronics to fashion, home
            goods to sports gear, we curate the best across 8 categories so you
            can find exactly what you need with confidence.
          </p>
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="container-page py-12 lg:py-16">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <value.icon size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center mb-12">Why Shop With Us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: 'Free Shipping', description: 'On all orders over $75' },
            { icon: ShieldCheck, title: 'Secure Checkout', description: 'Bank-level encryption' },
            { icon: RotateCcw, title: '30-Day Returns', description: 'No questions asked' },
            { icon: Headphones, title: '24/7 Support', description: 'Always here to help' },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-3">
                <item.icon size={24} />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
