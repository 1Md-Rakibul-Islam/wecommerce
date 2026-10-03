import { Target, Heart } from "lucide-react";

export function AboutMission() {
  return (
    <section className="bg-muted/30">
      <div className="container-page py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target size={24} className="text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We believe that shopping online should be easy, enjoyable, and
              trustworthy. That is why we built ShopCraft — a curated
              marketplace where every product meets our quality standards,
              every checkout is secure, and every customer feels valued. Our
              mission is to bring you the best products from around the world,
              all in one place.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart size={24} className="text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">
                What We Stand For
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Quality, transparency, and customer satisfaction are at the
              heart of everything we do. We partner with trusted brands, offer
              honest pricing, and stand behind every product with a 30-day
              return guarantee. Your trust is our most valuable asset.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
