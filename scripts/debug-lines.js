const fs = require('fs');
const path = 'C:/Users/LEO/.qclaw/workspace/china-franchise-net/app/admin/brands/page.tsx';
let content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');
let found = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('text-right')) {
    found.push((i + 1) + ': ' + lines[i]);
  }
}
console.log(found.join('\n'));
