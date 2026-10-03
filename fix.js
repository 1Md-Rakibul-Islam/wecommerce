const fs = require('fs');
const path = require('path');
['hero-slider.tsx', 'testimonial-slider.tsx', 'FeaturedProducts.tsx', 'FinalCTA.tsx', 'NewArrivals.tsx', 'NewsletterSection.tsx', 'TestimonialsSection.tsx'].forEach(f => {
  const file = path.join('src/features/home/components', f);
  if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      const hasOpen = content.includes('<>');
      const hasClose = content.includes('</>');

      if (!hasOpen && hasClose) {
          content = content.replace('</>', '');
      }

      fs.writeFileSync(file, content, 'utf8');
  }
});
