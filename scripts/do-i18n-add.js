// Fix i18n.ts to add storesChina/storesOverseas keys under brandCard
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'i18n.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Add storesChina/storesOverseas to all 4 locales under home.brandCard
const additions = {
  zh: `      storesChina: "中国门店",
      storesOverseas: "海外门店",`,
  en: `      storesChina: "China Stores",
      storesOverseas: "Overseas Stores",`,
  th: `      storesChina: "ร้านในจีน",
      storesOverseas: "ร้านต่างประเทศ",`,
  vi: `      storesChina: "Cửa hàng Trung Quốc",
      storesOverseas: "Cửa hàng Quốc tế",`,
};

for (const [locale, add] of Object.entries(additions)) {
  // Find the brandCard block in each locale and add the new keys after stores
  const regex = new RegExp(`(${locale === 'zh' ? 'zh' : locale === 'en' ? 'en' : locale === 'th' ? 'th' : 'vi'}:\\s*\\{[^}]*home:\\s*\\{[^}]*brandCard:\\s*\\{[^}]*stores:\\s*"[^"]*")`, 'g');
  // Simpler approach: just insert after stores key in brandCard for each locale
  const storesPattern = new RegExp(
    `(${locale === 'zh' ? '' : locale}\\s*:\\s*\\{[\\s\\S]*?home:\\s*\\{[\\s\\S]*?brandCard:\\s*\\{[^}]*stores:\\s*"[^"]*")`,
    'g'
  );
  // Actually let me just do a simple string replace for each locale's stores line
}

content = content.replace(
  /franchiseFee:\s*"([^"]*)",\s*\n\s*totalCost:\s*"([^"]*)",\s*\n\s*stores:\s*"([^"]*)"/,
  (match, fee, cost, stores) => {
    return match;
  }
);

// Much simpler: for each locale, find the brandCard block and add storesChina/storesOverseas
const locales = ['zh', 'en', 'th', 'vi'];
for (const loc of locales) {
  // Find brandCard section for this locale - look for the pattern of stores: "..." line in brandCard
  const brandCardStoresPattern = new RegExp(
    loc === 'zh'
      ? `zh:[\\s\\S]*?home:[\\s\\S]*?brandCard:[\\s\\S]*?(stores:\\s*"[^"]*")`
      : loc === 'en'
      ? `en:[\\s\\S]*?home:[\\s\\S]*?brandCard:[\\s\\S]*?(stores:\\s*"[^"]*")`
      : loc === 'th'
      ? `th:[\\s\\S]*?home:[\\s\\S]*?brandCard:[\\s\\S]*?(stores:\\s*"[^"]*")`
      : `vi:[\\s\\S]*?home:[\\s\\S]*?brandCard:[\\s\\S]*?(stores:\\s*"[^"]*")`
  );
  // Actually the multiline regex won't work well. Let me just do simple line-by-line insertion.
}

// Let me use a much simpler approach: find the specific line for each locale and insert after it
const lines = content.split('\n');
let result = [];
for (let i = 0; i < lines.length; i++) {
  result.push(lines[i]);
  // After stores line in zh brandCard
  if (lines[i].includes('zh:') && lines[i].trim() === 'zh: {') {
    // Found zh locale start, now find its home.brandCard.stores
  }
  // This approach is too complex. Let me just use targeted replacements.
}

// Much simpler: use a script to insert after specific patterns
const script = `
var fs = require('fs');
var content = fs.readFileSync('lib/i18n.ts', 'utf8');

// For zh
content = content.replace(
  /zh:[\\s\\S]{1,2000}brandCard:[\\s\\S]{1,500}stores:\\s*"[^"]*",/,
  (m) => {
    return m + '\\n      storesChina: "中国门店",\\n      storesOverseas: "海外门店",';
  }
);
// For en
content = content.replace(
  /en:[\\s\\S]{1,2000}brandCard:[\\s\\S]{1,500}stores:\\s*"[^"]*",/,
  (m) => {
    return m + '\\n      storesChina: "China Stores",\\n      storesOverseas: "Overseas Stores",';
  }
);
// For th
content = content.replace(
  /th:[\\s\\S]{1,2000}brandCard:[\\s\\S]{1,500}stores:\\s*"[^"]*",/,
  (m) => {
    return m + '\\n      storesChina: "ร้านในจีน",\\n      storesOverseas: "ร้านต่างประเทศ",';
  }
);
// For vi
content = content.replace(
  /vi:[\\s\\S]{1,2000}brandCard:[\\s\\S]{1,500}stores:\\s*"[^"]*",/,
  (m) => {
    return m + '\\n      storesChina: "Cửa hàng Trung Quốc",\\n      storesOverseas: "Cửa hàng Quốc tế",';
  }
);

fs.writeFileSync('lib/i18n.ts', content);
console.log('Done');
`;

require('fs').writeFileSync('scripts/do-i18n-add.js', script);
console.log('Script created');