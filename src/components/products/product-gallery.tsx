'use client';

import { useState, memo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

function ProductGalleryComponent({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const uniqueImages = Array.from(new Set(images));

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const toggleLightbox = () => {
    setIsLightboxOpen(!isLightboxOpen);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted/30 group">
          <Swiper
            modules={[Navigation, Pagination, Controller]}
            spaceBetween={0}
            slidesPerView={1}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full h-full"
            pagination={{ clickable: true }}
          >
            {uniqueImages.map((image, i) => (
              <SwiperSlide key={i} className="relative w-full h-full cursor-zoom-in" onClick={toggleLightbox}>
                <Image
                  src={image}
                  alt={`${alt} image ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <button 
            onClick={toggleLightbox}
            className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-md p-2 rounded-full text-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-background"
            aria-label="View fullscreen"
          >
            <Maximize2 size={18} />
          </button>
        </div>
        
        {uniqueImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {uniqueImages.map((image, i) => (
              <button
                key={i}
                onClick={() => handleThumbnailClick(i)}
                className={cn(
                  'relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all',
                  i === activeIndex
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/40',
                )}
              >
                <Image
                  src={image}
                  alt={`${alt} thumbnail ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <button 
              onClick={toggleLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/40 p-2 rounded-full transition-colors z-[110]"
            >
              <X size={24} />
            </button>
            
            <div className="relative w-full h-full max-w-5xl max-h-[90vh] mx-4 flex items-center justify-center">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ type: 'fraction', el: '.lightbox-pagination' }}
                initialSlide={activeIndex}
                onSlideChange={(swiper) => handleThumbnailClick(swiper.activeIndex)}
                className="w-full h-full"
              >
                {uniqueImages.map((image, i) => (
                  <SwiperSlide key={i} className="relative flex items-center justify-center w-full h-full">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={image}
                        alt={`${alt} full image ${i + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium tracking-widest lightbox-pagination z-10 bg-black/50 px-4 py-1.5 rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const ProductGallery = memo(ProductGalleryComponent);
