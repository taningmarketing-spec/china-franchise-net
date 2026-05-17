const fs = require('fs');
const path = require('path');

function listDirs(dir, prefix = '') {
  const results = [];
  try {
    fs.readdirSync(dir).forEach(f => {
      const fp = path.join(dir, f);
      if (fs.statSync(fp).isDirectory() && !f.startsWith('.') && f !== 'node_modules') {
        results.push(prefix + f);
        results.push(...listDirs(fp, prefix + f + '/'));
      }
    });
  } catch {}
  return results;
}

const base = 'C:/Users/LEO/.qclaw/workspace/china-franchise-net/app/[locale]';
console.log(listDirs(base).join('\n'));
