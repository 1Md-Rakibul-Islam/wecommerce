import { Sparkles } from "lucide-react";
import { TIMELINE } from "../data/about-data";

export function AboutTimeline() {
  return (
    <section className="container-page py-12 lg:py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles size={14} />
          Our Journey
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
          From idea to marketplace
        </h2>
      </div>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />
        <div className="space-y-8">
          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              className={`relative flex items-start gap-6 lg:gap-0 ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold z-10 -translate-x-1/2 mt-1">
                {i + 1}
              </div>
              <div
                className={`pl-12 lg:pl-0 lg:w-1/2 ${
                  i % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"
                }`}
              >
                <span className="text-primary font-bold text-lg">
                  {item.year}
                </span>
                <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
