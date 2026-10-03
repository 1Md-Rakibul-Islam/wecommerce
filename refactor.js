const fs = require('fs');
const path = require('path');

const renames = [
  // Home
  { from: 'src/components/home/hero-slider.tsx', to: 'src/features/home/components/hero-slider.tsx' },
  { from: 'src/components/home/testimonial-slider.tsx', to: 'src/features/home/components/testimonial-slider.tsx' },
  // Products components
  { from: 'src/components/products', to: 'src/features/products/components' },
  // API
  { from: 'src/lib/api/products.ts', to: 'src/features/products/api/products.ts' },
  { from: 'src/lib/api/server-fetch.ts', to: 'src/features/products/api/server-fetch.ts' },
  // Cart
  { from: 'src/components/layout/cart-drawer.tsx', to: 'src/features/cart/components/cart-drawer.tsx' },
  { from: 'src/components/layout/cart-provider.tsx', to: 'src/features/cart/components/cart-provider.tsx' },
  { from: 'src/store/cart-store.ts', to: 'src/features/cart/store/cart-store.ts' },
  // Contact
  { from: 'src/components/forms/contact-form.tsx', to: 'src/features/contact/components/contact-form.tsx' },
];

function moveFile(from, to) {
  if (fs.existsSync(from)) {
    const isDir = fs.lstatSync(from).isDirectory();
    if (isDir) {
      // Create target dir if not exists
      if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
      const files = fs.readdirSync(from);
      for (const file of files) {
        moveFile(path.join(from, file), path.join(to, file));
      }
      fs.rmdirSync(from);
    } else {
      fs.renameSync(from, to);
    }
    console.log('Moved', from, 'to', to);
  } else {
    console.log('Not found:', from);
  }
}

renames.forEach(r => moveFile(r.from, r.to));

const replaceRules = [
  { search: /@\/components\/home\//g, replace: '@/features/home/components/' },
  { search: /@\/components\/products\//g, replace: '@/features/products/components/' },
  { search: /@\/lib\/api\/products/g, replace: '@/features/products/api/products' },
  { search: /@\/lib\/api\/server-fetch/g, replace: '@/features/products/api/server-fetch' },
  { search: /@\/components\/layout\/cart-drawer/g, replace: '@/features/cart/components/cart-drawer' },
  { search: /@\/components\/layout\/cart-provider/g, replace: '@/features/cart/components/cart-provider' },
  { search: /@\/store\/cart-store/g, replace: '@/features/cart/store/cart-store' },
  { search: /@\/components\/forms\/contact-form/g, replace: '@/features/contact/components/contact-form' },
];

function processFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      processFiles(filePath);
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      for (const rule of replaceRules) {
        if (rule.search.test(content)) {
          content = content.replace(rule.search, rule.replace);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated imports in', filePath);
      }
    }
  }
}

processFiles('src');
