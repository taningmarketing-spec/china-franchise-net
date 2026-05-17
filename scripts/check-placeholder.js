const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.article.findMany({ select: { slug: 1, locale: 1, content: 1 } }).then(a => {
  const ph = a.filter(x => x.content && (
    x.content.includes('占位') ||
    x.content.includes('placeholder') ||
    x.content.includes('实际内容需要')
  ));
  console.log('Total:', a.length, '| Placeholder remaining:', ph.length, '| Updated:', a.length - ph.length);
  if (ph.length > 0) {
    ph.forEach(x => console.log('  -', x.locale, x.slug.substring(0, 50)));
  }
}).then(() => p.$disconnect()).catch(e => { console.error(e); process.exit(1); });
