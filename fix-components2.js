const fs = require('fs');
const path = require('path');
const dir = 'src/features/home/components';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Make sure we have a proper return
    content = content.replace(/return \(\s*\n*\s*\{\/\*(.*?)\*\/\}/, 'return (\n    <>\n      {/**/}');
    
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
  }
});
