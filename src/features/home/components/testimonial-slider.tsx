"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

export const TESTIMONIALS = [
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
  {
    name: "David Kim",
    role: "Verified Buyer",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    text: "I was blown away by the amazing deals on electronics. Fast shipping and the product was exactly as described. Will be shopping again!",
  },
];

export function TestimonialSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      autoplay={{ delay: 5000, disableOnInteraction: true }}
      pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet !bg-primary",
      }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="pb-12"
    >
      {TESTIMONIALS.map((testimonial, idx) => (
        <SwiperSlide key={idx} className="h-auto">
          <div className="h-full rounded-2xl border border-border bg-card p-6 card-hover-lift hover:shadow-lg flex flex-col">
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} size={16} className="fill-warning text-warning" />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border border-border shrink-0">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
