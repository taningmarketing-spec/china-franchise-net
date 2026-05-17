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
  // Line 197: "            {/* 各分类 */}"
  // Find the comment with 各分类 followed by categories.map on next line
  if (l.indexOf('各分类') !== -1 && i + 1 < lines.length && lines[i + 1].indexOf('categories.map') !== -1) {
    insertLine = i;
    break;
  }
}

if (insertLine === -1) {
  console.log('Marker not found');
  process.exit(1);
}

// Build new content: insert hot button before line insertLine
const newLines = lines.slice(0, insertLine).concat(
  [
    '',
    '            {/* 🔥 火爆推荐 */}',
    '            <button',
    '              onClick={() => { setSelectedCategory("__isHot__"); setPage(1); }}',
    '              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between group ${',
    "                selectedCategory === '__isHot__'",
    "                  ? 'bg-red-50 text-red-600 font-semibold'",
    "                  : 'text-slate-600 hover:bg-slate-50'",
    '              }`}',
    '            >',
    '              <span className="flex items-center gap-2">🔥 火爆加盟项目</span>',
    '            </button>',
    ''
  ],
  lines.slice(insertLine)
);

fs.writeFileSync(path, newLines.join('\n'));
console.log('OK - hot button inserted at line', insertLine + 1);
