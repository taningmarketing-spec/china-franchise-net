const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: { slug: true, locale: true, featuredImg: true },
    orderBy: [{ locale: 'asc' }, { slug: 'asc' }]
  });
  
  const byLocale = {};
  articles.forEach(a => {
    if (!byLocale[a.locale]) byLocale[a.locale] = [];
    byLocale[a.locale].push(a);
  });
  
  Object.entries(byLocale).forEach(([loc, arts]) => {
    console.log(`\n【${loc}】(${arts.length}篇)`);
    arts.forEach(a => {
      const img = a.featuredImg ? a.featuredImg.substring(0, 70) + '...' : 'NO IMAGE';
      console.log(`  ${a.slug}`);
      console.log(`    ${img}`);
    });
  });
  
  await prisma.$disconnect();
}

main().catch(console.error);
