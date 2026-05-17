const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: { category: true, locale: true },
    orderBy: [{ category: 'asc' }, { locale: 'asc' }]
  });
  
  const stats = {};
  for (const a of articles) {
    const key = `${a.category}|${a.locale}`;
    stats[key] = (stats[key] || 0) + 1;
  }
  
  console.log('\n文章统计:');
  console.log('分类 | 语言 | 数量');
  console.log('-'.repeat(40));
  
  const categories = ['overseas-case', 'overseas-dynamic', 'overseas-policy', 'overseas-tips'];
  const locales = ['en', 'th', 'vi', 'zh'];
  
  let total = 0;
  for (const cat of categories) {
    for (const loc of locales) {
      const key = `${cat}|${loc}`;
      const count = stats[key] || 0;
      total += count;
      console.log(`${cat} | ${loc} | ${count}`);
    }
  }
  
  console.log('-'.repeat(40));
  console.log(`总计: ${total} 篇文章`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
