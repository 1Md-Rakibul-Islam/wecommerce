const fs = require('fs');
const path = require('path');
const file = path.join('src/features/home/components', 'hero-slider.tsx');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/<\/section>\s*<\/>\s*\);\s*\}/g, '</section>\n  );\n}');
fs.writeFileSync(file, content, 'utf8');

const file2 = path.join('src/features/home/components', 'testimonial-slider.tsx');
let content2 = fs.readFileSync(file2, 'utf8');
content2 = content2.replace(/<\/section>\s*<\/>\s*\);\s*\}/g, '</section>\n  );\n}');
// but testimonial slider ends with </Swiper> probably
content2 = content2.replace(/<\/div>\s*<\/>\s*\);\s*\}/g, '</div>\n  );\n}');
fs.writeFileSync(file2, content2, 'utf8');
