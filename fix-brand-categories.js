const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function fix() {
  // Map industry to correct categorySlug
  const mapping = {
    '茶饮': 'chanyin',
    '咖啡': 'kafei',
    '小吃': 'xiaochi',
    '甜品': 'tianpin',
    '糖水': 'tangshui',
  };

  const brands = await p.brand.findMany();
  for (const b of brands) {
    const slug = mapping[b.industry];
    if (slug && b.categorySlug !== slug) {
      await p.brand.update({ where: { id: b.id }, data: { categorySlug: slug } });
      console.log(`Updated ${b.name}: industry="${b.industry}" -> categorySlug="${slug}"`);
    } else if (!slug) {
      console.log(`No mapping for ${b.name}: industry="${b.industry}" -> keep as lingshou`);
    } else {
      console.log(`${b.name}: already correct (${slug})`);
    }
  }
  process.exit(0);
}

fix().catch(e => { console.error(e.message); process.exit(1); });
