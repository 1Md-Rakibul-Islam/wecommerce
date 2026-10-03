import { WHY_SHOP } from "../data/about-data";

export function AboutWhyShop() {
  return (
    <section className="container-page py-12 lg:py-16">
      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center mb-12">
        Why Shop With Us
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY_SHOP.map((item) => (
          <div key={item.title} className="text-center group">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-3 transition-transform group-hover:scale-110">
              <item.icon size={24} />
            </div>
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
