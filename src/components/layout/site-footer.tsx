import Link from 'next/link';
import { Store, Mail, Phone, MapPin } from 'lucide-react';

const FOOTER_SECTIONS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Electronics', href: '/shop?category=Electronics' },
      { label: 'Fashion', href: '/shop?category=Fashion' },
      { label: 'Home & Living', href: '/shop?category=Home+%26+Living' },
      { label: 'Sports', href: '/shop?category=Sports+%26+Outdoors' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Cart', href: '/cart' },
      { label: 'Checkout', href: '/checkout' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping Info', href: '/about' },
      { label: 'Returns', href: '/about' },
      { label: 'FAQ', href: '/about' },
      { label: 'Track Order', href: '/about' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Store size={20} />
              </span>
              ShopCraft
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Your premium destination for quality products across electronics,
              fashion, home goods, and more. 500+ products, fast search, and
              secure checkout.
            </p>
            <div className="flex flex-col gap-2 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail size={16} /> support@shopcraft.com
              </span>
              <span className="flex items-center gap-2">
                <Phone size={16} /> +1 (800) 555-0199
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} /> 123 Commerce St, San Francisco, CA
              </span>
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ShopCraft. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
