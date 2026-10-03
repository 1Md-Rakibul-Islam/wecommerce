const fs = require('fs');
const path = require('path');
const dir = 'src/features/home/components';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Fix comment at start of return
    content = content.replace(/return \(\n\s*\{\/\*(.*?)\*\/\}\n\s*<section/g, 'return (\n    <> {/**/}\n    <section');
    content = content.replace(/<\/section>\n\s*\);\n\}/g, '</section>\n    </>\n  );\n}');

    // Fix const inside return
    const constRegex = /return \(\n\s*(const [A-Z_]+ = \[\s*\{[\s\S]*?\];)\n\s*\{\/\*/;
    const match = content.match(constRegex);
    if (match) {
      const arrayDef = match[1];
      content = content.replace(arrayDef, '');
      content = content.replace(/export function/, arrayDef + '\n\nexport function');
    } else {
        const constRegex2 = /return \(\n\s*(const [A-Z_]+ = \[\s*\{[\s\S]*?\];)\n\s*<section/;
        const match2 = content.match(constRegex2);
        if (match2) {
            const arrayDef = match2[1];
            content = content.replace(arrayDef, '');
            content = content.replace(/export function/, arrayDef + '\n\nexport function');
        }
    }

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
  }
});
console.log('Fixed components');
