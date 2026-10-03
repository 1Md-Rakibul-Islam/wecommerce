import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PROMO_BANNERS } from "../data/home-data";

export function PromoBanners() {
  return (
    <section className="container-page py-12 lg:py-16">
      <div className="grid md:grid-cols-2 gap-6">
        {PROMO_BANNERS?.map((banner) => (
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
  );
}
