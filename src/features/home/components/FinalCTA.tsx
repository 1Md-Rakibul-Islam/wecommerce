import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';


export function FinalCTA() {
  return (
    <> {/**/}
    <section className="bg-primary text-primary-foreground">
        <div className="container-page py-12 lg:py-16 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
            Ready to start shopping?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
            Browse our full catalog of 500+ products with smart filters, fast
            search, and secure checkout.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="h-12 px-8 text-base group bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900 border-none shadow-lg"
            >
              Browse All Products
              <ArrowRight
                size={18}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
