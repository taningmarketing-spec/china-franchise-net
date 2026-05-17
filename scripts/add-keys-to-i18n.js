// Add missing keys to i18n.ts (storesChina/storesOverseas/highlights for brandCard)
const fs = require('fs');

let c = fs.readFileSync('lib/i18n.ts', 'utf8');
let lines = c.split('\n');

// For each locale, find brandCard closing brace and add new keys before it
const locales = [
  { name: 'zh', indent: '      ', keys: [
    'storesChina: "中国门店",',
    'storesOverseas: "海外门店",',
    'highlights: "项目亮点",',
  ]},
  { name: 'en', indent: '      ', keys: [
    'storesChina: "CN Stores",',
    'storesOverseas: "Overseas Stores",',
    'highlights: "Highlights",',
  ]},
  { name: 'th', indent: '      ', keys: [
    'storesChina: "สาขาจีน",',
    'storesOverseas: "สาขาต่างประเทศ",',
    'highlights: "จุดเด่น",',
  ]},
  { name: 'vi', indent: '      ', keys: [
    'storesChina: "Cửa hàng TQ",',
    'storesOverseas: "Cửa hàng HQ",',
    'highlights: "Điểm nổi bật",',
  ]},
];

// Also add enterAcademy to nav for all locales
const navAdd = [
  { name: 'zh', indent: '      ', key: 'enterAcademy: "进入学院主页",' },
  { name: 'en', indent: '      ', key: 'enterAcademy: "Enter Academy",' },
  { name: 'th', indent: '      ', key: 'enterAcademy: "เข้าสู่หน้าสถาบัน",' },
  { name: 'vi', indent: '      ', key: 'enterAcademy: "Vào trang Học viện",' },
];

function addKeysBeforeClosingBrace(lines, localeName, section, indent, keys) {
  // Find the section block (e.g., "  zh: {" then "home: {" then "brandCard: {")
  let inLocale = false;
  let inSection = false;
  let inBrandCard = false;
  let depth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === `${localeName}: {`) inLocale = true;
    if (!inLocale) continue;

    if (inLocale && trimmed === `${section}: {`) {
      inSection = true;
      depth = 0;
    }

    if (inSection) {
      if (trimmed === 'brandCard: {') {
        inBrandCard = true;
        depth = 0;
      }

      if (inBrandCard) {
        // Count braces to find the closing of brandCard
        for (const ch of line) {
          if (ch === '{') depth++;
          if (ch === '}') depth--;
        }
        // When depth goes back to 0 after being >0, we're at brandCard's closing brace
        if (depth === 0 && line.trim() === '}' && i > 0) {
          // Insert keys before this line
          const insert = keys.map(k => indent + k).join('\n') + '\n';
          lines[i] = insert + line;
          console.log(`Added keys to ${localeName}.${section} at line ${i+1}`);
          return true;
        }
      }
    }
  }
  return false;
}

function addNavEnterAcademy(lines, localeName, indent, key) {
  let inLocale = false;
  let inNav = false;
  let depth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === `${localeName}: {`) inLocale = true;
    if (!inLocale) continue;

    if (inLocale && trimmed === 'nav: {') {
      inNav = true;
      depth = 0;
      continue;
    }

    if (inNav) {
      for (const ch of line) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
      }
      // Insert before the closing brace of nav
      if (depth === 0 && line.trim() === '}' && i > 0) {
        lines[i] = indent + key + '\n' + line;
        console.log(`Added enterAcademy to ${localeName}.nav at line ${i+1}`);
        return true;
      }
    }
  }
  return false;
}

// Process each locale
for (const loc of locales) {
  addKeysBeforeClosingBrace(lines, loc.name, 'home', loc.indent, loc.keys);
}

for (const nav of navAdd) {
  addNavEnterAcademy(lines, nav.name, nav.indent, nav.key);
}

fs.writeFileSync('lib/i18n.ts', lines.join('\n'), 'utf8');
console.log('Done!');

// Verify the keys exist now
c = fs.readFileSync('lib/i18n.ts', 'utf8');
lines = c.split('\n');
for (const k of ['storesChina', 'storesOverseas', 'highlights', 'enterAcademy']) {
  const idx = c.indexOf(k);
  if (idx >= 0) {
    const lineNo = c.substring(0, idx).split('\n').length;
    console.log(`✓ ${k} found at line ${lineNo}`);
  } else {
    console.log(`✗ ${k} NOT found!`);
  }
}