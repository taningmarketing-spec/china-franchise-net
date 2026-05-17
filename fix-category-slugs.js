const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
async function fix() {
  // Fix 西树泡芙: categorySlug should be "tianpin" not "甜品"
  await p.brand.updateMany({
    where: { slug: 'cizh-puff' },
    data: { categorySlug: 'tianpin' }
  });
  // Fix 五条人糖水铺: categorySlug should be "tangshui" not "糖水"
  await p.brand.updateMany({
    where: { slug: 'wutiaoren-tangshui' },
    data: { categorySlug: 'tangshui' }
  });
  console.log('Fixed categorySlugs');
  const brands = await p.brand.findMany({ select: { name: 1, slug: 1, industry: 1, categorySlug: 1 } });
  console.log(JSON.stringify(brands, null, 2));
  await p.$disconnect();
}
fix().catch(e => { console.error(e.message); process.exit(1); });
