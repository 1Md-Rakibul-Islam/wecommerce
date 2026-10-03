import type { Metadata } from "next";
import { ContactForm } from "@/features/contact/components/contact-form";
import { ContactHero } from "@/features/contact/components/ContactHero";
import { ContactCards } from "@/features/contact/components/ContactCards";
import { ContactSidebar } from "@/features/contact/components/ContactSidebar";
import ContactFromSection from "@/features/contact/components/ContactFromSection";

export const metadata: Metadata = {
  title: "Contact ShopCraft",
  description:
    "Get in touch with ShopCraft. We are here to help with any questions about your order, products, or account.",
};

export default function ContactPage() {
  return (
    <main className="animate-fade-in">
      <ContactHero />
      <ContactCards />
      <ContactFromSection />
    </main>
  );
}
