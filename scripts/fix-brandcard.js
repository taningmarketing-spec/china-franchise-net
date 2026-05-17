var fs = require('fs');
var content = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');

// Add translations import
if (!content.includes("from '@/lib/i18n'")) {
  content = content.replace(
    "import Link from 'next/link';",
    "import Link from 'next/link';\nimport { translations } from '@/lib/i18n';"
  );
}

// Remove broken cardLabels function
content = content.replace(
  /\nconst cardLabels = \(\) => \(\{\s*storesChina:[^}]+\}\);/,
  ''
);

// Remove LABELS.zh reference and replace with labels from i18n
content = content.replace(
  "const l = cardLabels() || LABELS.zh;",
  `// Get localized labels
  const allLabels = {
    zh: translations.zh.home.brandCard,
    en: translations.en.home.brandCard,
    th: translations.th.home.brandCard,
    vi: translations.vi.home.brandCard,
  };
  const labels = allLabels[locale] || allLabels.zh;`
);

// Update label references
content = content.replace(/\{l\.fee\}/g, '{labels.franchiseFee}');
content = content.replace(/\{l\.storesChina\}/g, '{labels.storesChina}');
content = content.replace(/\{l\.storesOverseas\}/g, '{labels.storesOverseas}');
content = content.replace(/\{l\.cost\}/g, '{labels.totalCost}');

// Fix "项目亮点" hardcoded
content = content.replace(
  "{locale === 'zh' ? '项目亮点' : 'Highlights'}",
  "({ zh: '项目亮点', en: 'Highlights', th: 'จุดเด่น', vi: 'Điểm nổi bật' } as Record<string,string>)[locale] || 'Highlights'"
);

fs.writeFileSync('components/front/BrandCard.tsx', content);
console.log('BrandCard.tsx fixed');
console.log('First 300 chars:', content.substring(0, 300));