import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Headphones,
  Package,
} from "lucide-react";
import { ContactForm } from "@/features/contact/components/contact-form";

export const metadata: Metadata = {
  title: "Contact ShopCraft",
  description:
    "Get in touch with ShopCraft. We are here to help with any questions about your order, products, or account.",
};

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: "Email Us",
    value: "support@shopcraft.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (800) 555-0199",
    sub: "Mon-Fri, 9am-6pm PST",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Commerce St",
    sub: "San Francisco, CA 94103",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "24/7 Available",
    sub: "Online support anytime",
  },
];

export default function ContactPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="container-page relative py-16 lg:py-20 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in-up">
            <MessageSquare size={16} />
            Get in Touch
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
            We are here to <span className="text-gradient">help you</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have a question about your order, a product, or anything else? Our
            team is ready to assist you. Reach out through any of the channels
            below.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="container-page py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_CARDS.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-card p-6 text-center card-hover-lift hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-3 transition-transform hover:scale-110">
                <item.icon size={20} />
              </div>
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-sm font-medium text-foreground mt-1">
                {item.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form + Support Info */}
      <section className="container-page py-8 lg:py-12 max-w-5xl">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <ContactForm />

          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Headphones size={20} className="text-primary" />
                <h3 className="font-semibold">Need quick help?</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Our support team is available 24/7 to answer your questions.
                Most inquiries are resolved within a few hours.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package size={16} className="text-primary" />
                  Order tracking available
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={16} className="text-primary" />
                  Avg response: 2 hours
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-semibold mb-3">FAQ</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">
                    What is your return policy?
                  </p>
                  <p className="text-muted-foreground mt-0.5">
                    30-day hassle-free returns on all items.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    How long does shipping take?
                  </p>
                  <p className="text-muted-foreground mt-0.5">
                    3-5 business days for standard shipping.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Do you ship internationally?
                  </p>
                  <p className="text-muted-foreground mt-0.5">
                    Yes, we ship to over 50 countries worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
