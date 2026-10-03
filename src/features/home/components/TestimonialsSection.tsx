import { Quote } from "lucide-react";
import { TestimonialSlider } from "@/features/home/components/testimonial-slider";

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30">
      <div className="container-page py-12 lg:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Quote size={14} />
            Customer Stories
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
            Loved by thousands of shoppers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Do not just take our word for it — here is what our customers have
            to say
          </p>
        </div>
        <TestimonialSlider />
      </div>
    </section>
  );
}
