import Image from "next/image";
import { Store } from "lucide-react";

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
  );
}
