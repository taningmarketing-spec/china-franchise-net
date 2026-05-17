const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cats = await prisma.category.findMany({ orderBy: { sort: 'asc' } });
  console.log('Categories:');
  cats.forEach(c => console.log(`  slug: ${c.slug}, name: ${c.name}`));

  const brandCats = await prisma.brand.groupBy({
    by: ['categorySlug'],
    where: { status: 'published' },
    _count: true,
  });
  console.log('\nBrand category distribution:');
  brandCats.forEach(b => console.log(`  ${b.categorySlug}: ${b._count} brands`));
  
  const total = await prisma.brand.count({ where: { status: 'published' } });
  console.log(`\nTotal published brands: ${total}`);
  
  await prisma.$disconnect();
}

main();
