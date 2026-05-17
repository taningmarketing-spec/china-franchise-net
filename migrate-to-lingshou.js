const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  // 获取所有品牌
  const brands = await p.brand.findMany();
  console.log(`Found ${brands.length} brands`);
  
  // 把所有品牌的 categorySlug 改为 lingshou
  let updated = 0;
  for (const brand of brands) {
    await p.brand.update({
      where: { id: brand.id },
      data: { categorySlug: 'lingshou' }
    });
    console.log(`Updated: ${brand.name} -> lingshou`);
    updated++;
  }
  
  console.log(`\nTotal updated: ${updated} brands`);
  await p.$disconnect();
}

main().catch(e => { console.error(e.message); process.exit(1); });