const fs = require('fs');
let content = fs.readFileSync('src/app/products/[slug]/page.tsx', 'utf8');

// Replace Tabs
const tabsRegex = /<div className="mt-12">\s*<Tabs[\s\S]*?<\/Tabs>\s*<\/div>/;
content = content.replace(tabsRegex, '<div className="mt-12">\n          <ProductTabs product={product} />\n        </div>');

// Replace Key Features
const featuresRegex = /<div className="space-y-3">\s*<h3 className="text-sm font-semibold">Key Features<\/h3>\s*<ul[\s\S]*?<\/ul>\s*<\/div>/;
content = content.replace(featuresRegex, '<KeyFeatures features={product.features} />');

// Remove Tabs UI imports and add component imports
content = content.replace(/import \{ Tabs, TabsContent, TabsList, TabsTrigger \} from "@\/components\/ui\/tabs";/, '');
content = content.replace(/import \{ ChevronRight, Check \} from "lucide-react";/, 'import { ChevronRight } from "lucide-react";');
content = content.replace(/import \{ ProductJsonLd \} from "@\/components\/seo\/product-json-ld";/, 'import { ProductJsonLd } from "@/components/seo/product-json-ld";\nimport { ProductTabs } from "@/features/products/components/product-tabs";\nimport { KeyFeatures } from "@/features/products/components/key-features";');

fs.writeFileSync('src/app/products/[slug]/page.tsx', content);
