const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
async function main() {
  const brands = await p.brand.findMany();
  const cats = await p.category.findMany();
  const articles = await p.article.findMany();
  const faqs = await p.faq.findMany();
  const pages = await p.cmsPage.findMany();
  console.log('Brands:', brands.length);
  console.log('Categories:', cats.length);
  console.log('Articles:', articles.length);
  console.log('FAQs:', faqs.length);
  console.log('CMS Pages:', pages.length);
  if (brands.length > 0) {
    for (const b of brands) console.log(' -', b.name, b.slug);
  }
}
main().catch(e => console.error('ERR:', e.message)).finally(() => p.$disconnect());
