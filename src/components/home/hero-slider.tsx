"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const SLIDES = [
  {
    id: 1,
    title: "Next-Gen Electronics",
    subtitle: "Discover the latest gadgets and smart devices",
    image:
      "https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1920",
    link: "/shop?category=Electronics",
    buttonText: "Shop Electronics",
  },
  {
    id: 2,
    title: "Elevate Your Style",
    subtitle: "Premium fashion collections for the modern trendsetter",
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1920",
    link: "/shop?category=Fashion",
    buttonText: "Explore Fashion",
  },
  {
    id: 3,
    title: "Modern Home Decor",
    subtitle: "Transform your space with our exclusive furniture",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920",
    link: "/shop?category=Home+%26+Living",
    buttonText: "Upgrade Home",
  },
];

export function HeroSlider() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] lg:h-[80vh] flex items-center justify-center overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: () =>
            '<span class="swiper-pagination-bullet bg-white !opacity-50 [&.swiper-pagination-bullet-active]:!opacity-100 !w-3 !h-3 !rounded-full transition-all"></span>',
        }}
        className="w-full h-full absolute inset-0 z-0"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {({ isActive }) => (
              <>
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                </div>

                <div className="container-page relative z-10 h-full flex flex-col justify-center px-4 md:px-8">
                  <div className="max-w-2xl text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold uppercase tracking-wider mb-6"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      New Collection 2026
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, x: -30 }}
                      animate={
                        isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                      }
                      transition={{ duration: 0.7, delay: 0.3 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-xl"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={
                        isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                      }
                      transition={{ duration: 0.7, delay: 0.5 }}
                      className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.7, delay: 0.7 }}
                    >
                      <Link href={slide.link}>
                        <Button
                          size="lg"
                          className="h-14 px-8 text-lg rounded-full font-bold shadow-2xl hover:scale-105 hover:shadow-primary/50 transition-all bg-primary text-white hover:bg-primary/90"
                        >
                          {slide.buttonText}
                          <ArrowRight size={20} className="ml-2" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
