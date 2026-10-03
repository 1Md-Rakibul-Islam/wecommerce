import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $75",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "Encrypted & protected",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Hassle-free returns",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
  },
];

export function FeaturesBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="container-page py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 transition-transform group-hover:scale-110">
                <feature.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">{feature.title}</p>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
