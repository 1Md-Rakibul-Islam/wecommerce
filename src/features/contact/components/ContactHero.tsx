import { MessageSquare } from "lucide-react";

export function ContactHero() {
  return (
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
  );
}
