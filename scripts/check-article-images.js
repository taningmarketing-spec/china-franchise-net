const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: { slug: true, title: true, featuredImg: true, category: true },
    where: { locale: 'zh' },
    orderBy: { category: 'asc' }
  });
  
  console.log('=== 文章图片状态检查 ===\n');
  
  const byCategory = {};
  articles.forEach(a => {
    if (!byCategory[a.category]) byCategory[a.category] = [];
    byCategory[a.category].push(a);
  });
  
  Object.entries(byCategory).forEach(([cat, arts]) => {
    console.log(`\n【${cat}】(${arts.length}篇)`);
    arts.forEach(a => {
      const hasImg = a.featuredImg ? '✓' : '✗';
      console.log(`  ${hasImg} ${a.slug}`);
      if (a.featuredImg) {
        console.log(`      ${a.featuredImg.substring(0, 80)}...`);
      }
    });
  });
  
  await prisma.$disconnect();
}

main().catch(console.error);
