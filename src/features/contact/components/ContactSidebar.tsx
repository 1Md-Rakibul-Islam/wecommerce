import { Headphones, Package, Clock } from "lucide-react";

export function ContactSidebar() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Headphones size={20} className="text-primary" />
          <h3 className="font-semibold">Need quick help?</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Our support team is available 24/7 to answer your questions.
          Most inquiries are resolved within a few hours.
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package size={16} className="text-primary" />
            Order tracking available
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={16} className="text-primary" />
            Avg response: 2 hours
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <h3 className="font-semibold mb-3">FAQ</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium text-foreground">
              What is your return policy?
            </p>
            <p className="text-muted-foreground mt-0.5">
              30-day hassle-free returns on all items.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">
              How long does shipping take?
            </p>
            <p className="text-muted-foreground mt-0.5">
              3-5 business days for standard shipping.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">
              Do you ship internationally?
            </p>
            <p className="text-muted-foreground mt-0.5">
              Yes, we ship to over 50 countries worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
