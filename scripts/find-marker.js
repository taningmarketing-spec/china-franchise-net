const fs = require('fs');
const path = 'C:/Users/LEO/.qclaw/workspace/china-franchise-net/app/admin/brands/page.tsx';
let content = fs.readFileSync(path, 'utf8');

if (content.includes('__isHot__')) {
  console.log('Already has hot button');
  process.exit(0);
}

const lines = content.split('\n');
let insertLine = -1;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // Look for the comment line that is "各分类" (not the one inside categories.map)
  if (l.includes('/*') && l.includes('各分类') && l.includes('*/')) {
    // Make sure next line is NOT categories.map
    if (i + 1 < lines.length && !lines[i + 1].includes('categories.map')) {
      insertLine = i;
      break;
    }
  }
}

if (insertLine === -1) {
  console.log('Marker not found. Checking lines...');
  for (let i = 185; i < 200; i++) {
    console.log(i + 1, JSON.stringify(lines[i]));
  }
  process.exit(1);
}

console.log('Insert at line', insertLine + 1, JSON.stringify(lines[insertLine]));
