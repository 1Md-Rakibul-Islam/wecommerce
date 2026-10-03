import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const AboutCTA = () => {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-page py-12 lg:py-16 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
          Ready to explore our collection?
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
          Join 50,000+ happy customers who shop with us for quality products and
          exceptional service.
        </p>
        <Link href="/shop">
          <Button
            size="lg"
            variant="secondary"
            className="h-12 px-8 text-base group"
          >
            Start Shopping
            <ArrowRight
              size={18}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default AboutCTA;
