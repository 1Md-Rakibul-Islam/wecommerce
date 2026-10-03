const fs = require('fs');
const pageContent = fs.readFileSync('src/app/page.tsx', 'utf8');
const regexes = [
  { name: 'HeroSection', regex: /\{\/\* Hero Section — Modern E-commerce \*\/\}([\s\S]*?)<\/section>/ },
  { name: 'FeaturesBar', regex: /\{\/\* Features Bar \*\/\}([\s\S]*?)<\/section>/ },
  { name: 'PromoBanners', regex: /\{\/\* Promo Banners \*\/\}([\s\S]*?)<\/section>/ },
  { name: 'ShopByCategory', regex: /\{\/\* Shop by Category \*\/\}([\s\S]*?)<\/section>/ },
  { name: 'FeaturedProducts', regex: /\{\/\* Featured Products \*\/\}([\s\S]*?)<\/section>/ },
  { name: 'NewArrivals', regex: /\{\/\* New Arrivals \*\/\}([\s\S]*?)<\/section>/ },
  { name: 'TestimonialsSection', regex: /\{\/\* Testimonials \*\/\}([\s\S]*?)<\/section>/ },
  { name: 'NewsletterSection', regex: /\{\/\* Newsletter CTA \*\/\}([\s\S]*?)<\/section>/ },
  { name: 'FinalCTA', regex: /\{\/\* Final CTA \*\/\}([\s\S]*?)<\/section>/ },
];
let newPageContent = "import { fetchFeaturedProducts, fetchNewArrivals } from '@/features/products/api/server-fetch';\n";

regexes.forEach(comp => {
  const match = pageContent.match(comp.regex);
  if (match) {
    let compCode = match[0];
    let fileImports = "import Link from 'next/link';\nimport Image from 'next/image';\n";
    if (comp.name === 'FeaturedProducts' || comp.name === 'NewArrivals') {
      fileImports += "import { ProductCard } from '@/features/products/components/product-card';\nimport { Product } from '@/types/product';\n";
    }
    const icons = ['ArrowRight', 'Truck', 'ShieldCheck', 'RotateCcw', 'Headphones', 'Star', 'Sparkles', 'TrendingUp', 'Clock', 'Zap', 'Quote', 'ShoppingBag'];
    const usedIcons = icons.filter(i => compCode.includes(i));
    if (usedIcons.length > 0) fileImports += "import { " + usedIcons.join(', ') + " } from 'lucide-react';\n";
    if (compCode.includes('<Button')) fileImports += "import { Button } from '@/components/ui/button';\n";
    if (compCode.includes('<NewsletterForm')) fileImports += "import { NewsletterForm } from '@/components/forms/newsletter-form';\n";
    if (compCode.includes('<TestimonialSlider')) fileImports += "import { TestimonialSlider } from '@/features/home/components/testimonial-slider';\n";

    if (comp.name === 'HeroSection') {
      const arrayMatch = pageContent.match(/const HERO_PRODUCTS = \[[\s\S]*?\];/);
      if (arrayMatch) compCode = arrayMatch[0] + '\n\n' + compCode;
    }
    if (comp.name === 'FeaturesBar') {
      const arrayMatch = pageContent.match(/const FEATURES = \[[\s\S]*?\];/);
      if (arrayMatch) compCode = arrayMatch[0] + '\n\n' + compCode;
    }
    if (comp.name === 'PromoBanners') {
      const arrayMatch = pageContent.match(/const PROMO_BANNERS = \[[\s\S]*?\];/);
      if (arrayMatch) compCode = arrayMatch[0] + '\n\n' + compCode;
    }
    if (comp.name === 'ShopByCategory') {
      const arrayMatch = pageContent.match(/const CATEGORIES = \[[\s\S]*?\];/);
      if (arrayMatch) compCode = arrayMatch[0] + '\n\n' + compCode;
    }

    let propsStr = '';
    if (comp.name === 'FeaturedProducts' || comp.name === 'NewArrivals') {
        propsStr = '{ products }: { products: Product[] }';
        compCode = compCode.replace(/featured\.map/g, 'products.map').replace(/newArrivals\.map/g, 'products.map');
    }

    const fullComponent = fileImports + '\n\nexport function ' + comp.name + '(' + propsStr + ') {\n  return (\n    ' + compCode + '\n  );\n}\n';
    fs.writeFileSync('src/features/home/components/' + comp.name + '.tsx', fullComponent);
    console.log('Created ' + comp.name);
    newPageContent += "import { " + comp.name + " } from '@/features/home/components/" + comp.name + "';\n";
  }
});

newPageContent += "\nexport const revalidate = 3600;\n\nexport default function HomePage() {\n  const featured = fetchFeaturedProducts();\n  const newArrivals = fetchNewArrivals();\n\n  return (\n    <div className=\"animate-fade-in\">\n      <HeroSection />\n      <FeaturesBar />\n      <PromoBanners />\n      <ShopByCategory />\n      <FeaturedProducts products={featured} />\n      <NewArrivals products={newArrivals} />\n      <TestimonialsSection />\n      <NewsletterSection />\n      <FinalCTA />\n    </div>\n  );\n}\n";
fs.writeFileSync('src/app/page.tsx', newPageContent);
console.log('Updated page.tsx');
