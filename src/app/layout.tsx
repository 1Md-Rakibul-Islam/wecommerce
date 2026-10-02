import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartProvider } from "@/components/layout/cart-provider";
import { QueryProvider } from "@/providers/query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shopcraft.example.com"),
  title: {
    default: "ShopCraft — Premium Online Store for Electronics, Fashion & More",
    template: "%s | ShopCraft",
  },
  description:
    "ShopCraft is your destination for premium products across electronics, home & living, fashion, sports, beauty, books, toys, and garden. Browse 500+ products with fast search, smart filters, and secure checkout.",
  keywords: [
    "online shopping",
    "ecommerce",
    "electronics",
    "fashion",
    "home decor",
    "sports equipment",
    "beauty products",
    "books",
    "toys",
    "garden tools",
  ],
  authors: [{ name: "ShopCraft" }],
  creator: "ShopCraft",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "ShopCraft — Premium Online Store",
    description:
      "Browse 500+ premium products across 8 categories with fast search, smart filters, and secure checkout.",
    siteName: "ShopCraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopCraft — Premium Online Store",
    description:
      "Browse 500+ premium products across 8 categories with fast search, smart filters, and secure checkout.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <QueryProvider>
          <CartProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
