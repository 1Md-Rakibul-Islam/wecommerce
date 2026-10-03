const fs = require('fs');
const path = require('path');

const dir = 'src/features/about/components';

const heroCode = import Image from 'next/image';
import { Store } from 'lucide-react';

export function AboutHero() {
  return (
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
              Premium products for <span className="text-gradient">modern living</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              ShopCraft was founded with a simple mission: to make quality products accessible to everyone. From electronics to fashion, home goods to sports gear, we curate the best across 8 categories so you can find exactly what you need with confidence.
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
  );
}
;
fs.writeFileSync(path.join(dir, 'AboutHero.tsx'), heroCode);

const statsCode = import { STATS } from '../data/about-data';

export function AboutStats() {
  return (
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
  );
}
;
fs.writeFileSync(path.join(dir, 'AboutStats.tsx'), statsCode);

const missionCode = import { Target, Heart } from 'lucide-react';

export function AboutMission() {
  return (
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
              We believe that shopping online should be easy, enjoyable, and trustworthy. That is why we built ShopCraft — a curated marketplace where every product meets our quality standards, every checkout is secure, and every customer feels valued. Our mission is to bring you the best products from around the world, all in one place.
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
              Quality, transparency, and customer satisfaction are at the heart of everything we do. We partner with trusted brands, offer honest pricing, and stand behind every product with a 30-day return guarantee. Your trust is our most valuable asset.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
;
fs.writeFileSync(path.join(dir, 'AboutMission.tsx'), missionCode);

const timelineCode = import { Sparkles } from 'lucide-react';
import { TIMELINE } from '../data/about-data';

export function AboutTimeline() {
  return (
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
              className={\elative flex items-start gap-6 lg:gap-0 \\}
            >
              <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold z-10 -translate-x-1/2 mt-1">
                {i + 1}
              </div>
              <div
                className={\pl-12 lg:pl-0 lg:w-1/2 \\}
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
  );
}
;
fs.writeFileSync(path.join(dir, 'AboutTimeline.tsx'), timelineCode);

const valuesCode = import { VALUES } from '../data/about-data';

export function AboutValues() {
  return (
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
  );
}
;
fs.writeFileSync(path.join(dir, 'AboutValues.tsx'), valuesCode);

const whyShopCode = import { WHY_SHOP } from '../data/about-data';

export function AboutWhyShop() {
  return (
    <section className="container-page py-12 lg:py-16">
      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center mb-12">
        Why Shop With Us
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY_SHOP.map((item) => (
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
  );
}
;
fs.writeFileSync(path.join(dir, 'AboutWhyShop.tsx'), whyShopCode);
