import { VALUES } from "../data/about-data";

export function AboutValues() {
  return (
    <section className="bg-muted/30">
      <div className="container-page py-12 lg:py-16">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center mb-12">
          Our Values
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-border bg-card p-6 card-hover-lift hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 transition-transform hover:scale-110">
                <value.icon size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
