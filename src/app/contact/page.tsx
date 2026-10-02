import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contact ShopCraft',
  description: 'Get in touch with ShopCraft. We are here to help with any questions about your order, products, or account.',
};

export default function ContactPage() {
  return (
    <div className="container-page py-12 lg:py-16 max-w-4xl animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">Get in Touch</h1>
        <p className="text-muted-foreground text-lg">
          We are here to help. Reach out to us through any of the channels below.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { icon: Mail, label: 'Email', value: 'support@shopcraft.com' },
          { icon: Phone, label: 'Phone', value: '+1 (800) 555-0199' },
          { icon: MapPin, label: 'Address', value: '123 Commerce St, San Francisco, CA' },
          { icon: Clock, label: 'Hours', value: '24/7 Support' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-3">
              <item.icon size={20} />
            </div>
            <p className="text-sm font-semibold">{item.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Server Action: Contact form submitted via useActionState */}
      <ContactForm />
    </div>
  );
}
