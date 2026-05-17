const fs = require('fs');
const pages = [
  'app/[locale]/page.tsx',
  'app/[locale]/layout.tsx',
  'app/[locale]/brand/[slug]/page.tsx',
  'app/[locale]/categories/page.tsx',
  'app/[locale]/academy/page.tsx',
  'app/[locale]/search/page.tsx'
];
pages.forEach(p => {
  try {
    const c = fs.readFileSync(p, 'utf8');
    const hasMeta = c.includes('metadata') || c.includes('generateMetadata');
    const hasJsonLd = c.includes('jsonLd') || c.includes('json-ld') || c.includes('application/ld+json') || c.includes('JSON-LD');
    const hasOg = c.includes('og:') || c.includes('openGraph');
    const hasSchema = c.includes('@context');
    const hasSitemap = c.includes('sitemap');
    console.log('=== ' + p + ' ===');
    console.log('  metadata/generateMetadata: ' + hasMeta);
    console.log('  JSON-LD structured data: ' + hasJsonLd);
    console.log('  OpenGraph/Twitter: ' + hasOg);
    console.log('  Schema.org @context: ' + hasSchema);
    console.log('');
  } catch(e) { console.log('=== ' + p + ': NOT FOUND ==='); }
});

// Check for sitemap/robots
console.log('=== Global files ===');
['public/sitemap.xml', 'public/robots.txt', 'app/sitemap.ts', 'app/robots.ts', 'app/sitemap.xml', 'app/robots.txt'].forEach(f => {
  console.log('  ' + f + ': ' + (fs.existsSync(f) ? 'EXISTS' : 'missing'));
});
