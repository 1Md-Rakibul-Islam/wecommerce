import { STATS } from "../data/about-data";

export function AboutStats() {
  return (
    <section className="container-page py-12 lg:py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center group">
            <div className="text-3xl lg:text-5xl font-bold text-primary transition-transform group-hover:scale-110">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
