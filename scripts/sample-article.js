const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const a = await prisma.article.findFirst({
    where: {
      AND: [
        { content: { not: { contains: '实际内容需要根据' } } },
        { content: { not: { contains: '本文旨在为您提供' } } },
      ],
    },
    select: { slug: true, content: true },
  });
  console.log('SLUG:', a.slug);
  console.log(a.content.substring(0, 2000));
  await prisma.$disconnect();
}

main();
