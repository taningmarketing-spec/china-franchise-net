const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function test() {
  try {
    const brands = await p.brand.count();
    const cats = await p.category.count();
    const pages = await p.cmsPage.count();
    console.log('Brands:', brands);
    console.log('Categories:', cats);
    console.log('CMS Pages:', pages);
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await p.$disconnect();
  }
}

test();
