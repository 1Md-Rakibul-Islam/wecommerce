import {
  fetchFeaturedProducts,
  fetchNewArrivals,
} from "@/features/products/api/server-fetch";
import { HeroSection } from "@/features/home/components/HeroSection";
import { FeaturesBar } from "@/features/home/components/FeaturesBar";
import { PromoBanners } from "@/features/home/components/PromoBanners";
import { ShopByCategory } from "@/features/home/components/ShopByCategory";
import { FeaturedProducts } from "@/features/home/components/FeaturedProducts";
import { NewArrivals } from "@/features/home/components/NewArrivals";
import { TestimonialsSection } from "@/features/home/components/TestimonialsSection";
import { NewsletterSection } from "@/features/home/components/NewsletterSection";
import { FinalCTA } from "@/features/home/components/FinalCTA";

export const revalidate = 3600;

export default function HomePage() {
  const featured = fetchFeaturedProducts();
  const newArrivals = fetchNewArrivals();

  return (
    <main className="animate-fade-in">
      <HeroSection />
      <FeaturesBar />
      <PromoBanners />
      <ShopByCategory />
      <FeaturedProducts products={featured} />
      <NewArrivals products={newArrivals} />
      <TestimonialsSection />
      <NewsletterSection />
      <FinalCTA />
    </main>
  );
}
