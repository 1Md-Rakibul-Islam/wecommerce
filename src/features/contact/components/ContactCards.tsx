import { CONTACT_CARDS } from "../data/contact-data";

export function ContactCards() {
  return (
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
  );
}
