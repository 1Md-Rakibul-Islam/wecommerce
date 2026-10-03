import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { NewsletterForm } from '@/components/forms/newsletter-form';


export function NewsletterSection() {
  return (
    <> {/**/}
    <section className="container-page py-12 lg:py-16">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-cyan-600 p-8 lg:p-12 text-center overflow-hidden relative">
          <div className="absolute inset-0 hero-grid-pattern opacity-20" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
              <Clock size={14} />
              Limited Time Offer
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3">
              Get 15% off your first order
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Subscribe to our newsletter for exclusive deals, new product
              alerts, and insider discounts you will not find anywhere else.
            </p>
            <div className="max-w-md mx-auto">
              <div className="[&_*]:!bg-white [&_input]:!text-foreground [&_button]:!bg-primary [&_button]:!text-primary-foreground">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
