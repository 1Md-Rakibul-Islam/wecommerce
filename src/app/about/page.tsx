import type { Metadata } from "next";
import { AboutHero } from "@/features/about/components/AboutHero";
import { AboutStats } from "@/features/about/components/AboutStats";
import { AboutMission } from "@/features/about/components/AboutMission";
import { AboutTimeline } from "@/features/about/components/AboutTimeline";
import { AboutValues } from "@/features/about/components/AboutValues";
import { AboutWhyShop } from "@/features/about/components/AboutWhyShop";
import AboutCTA from "@/features/about/components/AboutCTA";

export const metadata: Metadata = {
  title: "About ShopCraft",
  description:
    "Learn about ShopCraft — your premium online destination for 500+ products across 8 categories with fast search, smart filters, and secure checkout.",
};

export default function AboutPage() {
  return (
    <main className="animate-fade-in">
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutTimeline />
      <AboutValues />
      <AboutWhyShop />
      <AboutCTA />
    </main>
  );
}
