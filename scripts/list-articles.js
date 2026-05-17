const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: { locale: 'zh' },
    select: { slug: true, title: true, featuredImg: true, category: true },
    orderBy: { slug: 'asc' }
  });

  console.log('中文文章列表：\n');
  for (const a of articles) {
    const hasImage = a.featuredImg ? '✓' : '✗';
    console.log(`${hasImage} [${a.category}] ${a.slug}`);
    console.log(`   ${a.title}\n`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
