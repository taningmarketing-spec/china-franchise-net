const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { content: { contains: '实际内容需要根据' } },
        { content: { contains: '本文旨在为您提供' } },
        { content: { contains: '更多详细内容正在持续更新' } },
      ],
    },
    select: { id: true, slug: true, locale: true },
    orderBy: { slug: 'asc' },
  });

  articles.forEach(a => console.log(a.slug + '|' + a.id));
  console.log('---');
  console.log('Total:', articles.length);
  await prisma.$disconnect();
}

main();
