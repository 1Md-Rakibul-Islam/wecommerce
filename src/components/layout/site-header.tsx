'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Menu, X, Store } from 'lucide-react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCartUI } from '@/components/layout/cart-provider';
import { useMounted } from '@/hooks/use-mounted';
import { useCartStore } from '@/store/cart-store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop All' },
  { href: '/shop?category=Electronics', label: 'Electronics' },
  { href: '/shop?category=Fashion', label: 'Fashion' },
  { href: '/shop?category=Home+%26+Living', label: 'Home & Living' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const cartUI = useCartUI();
  const mounted = useMounted();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = searchValue.trim();
      if (q) {
        router.push(`/shop?search=${encodeURIComponent(q)}`);
        setMobileOpen(false);
      }
    },
    [searchValue, router],
  );

  const isActive = useCallback(
    (href: string) => {
      if (href === '/shop') return pathname === '/shop';
      if (href.startsWith('/shop?')) return false;
      return pathname === href;
    },
    [pathname],
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center gap-4">
          <button
            className="lg:hidden p-2 -ml-2 text-foreground"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Store size={20} />
            </span>
            <span className="hidden sm:inline">ShopCraft</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive(link.href)
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted/50',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1 max-w-md mx-auto hidden md:block">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 h-10 bg-muted/50 border-transparent focus-visible:bg-background"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <Link href="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors" aria-label="Cart">
              <ShoppingCart size={22} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold px-1 animate-scale-in">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="md:hidden border-t border-border/60 bg-background">
          <form onSubmit={handleSearch} className="container-page py-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
          </form>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/30 animate-fade-in" />
          <nav
            className="absolute top-0 left-0 h-full w-72 bg-background shadow-xl p-6 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-md transition-colors',
                    isActive(link.href)
                      ? 'text-primary bg-primary/5'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted/50',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
