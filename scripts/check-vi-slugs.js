const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const slugs = [
  'taning-opens-50th-thailand-store-vi',
  'franchise-fair-bangkok-2026-vi',
  'vietnam-franchise-regulation-update-vi',
  'indonesia-halal-certification-guide-vi',
  'yang-guofu-thailand-story-vi',
  'bubble-tea-vietnam-expansion-vi',
  'dessert-brand-myanmar-entry-vi',
  'franchise-agreement-checklist-vi',
  'overseas-site-selection-vi',
  'localization-strategy-vi',
  'supply-chain-setup-vi',
  'franchise-recruitment-vi',
  'thailand-franchise-law-vi',
  'vietnam-business-license-vi',
  'singapore-fnb-regulation-vi',
  'malaysia-halal-requirement-vi',
  'indonesia-foreign-investment-vi'
];

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, title: true, locale: true, category: true, id: true }
  });
  console.log('Found:', articles.length, '/ 17');
  articles.forEach(a => console.log(a.id, '|', a.slug, '|', a.locale, '|', a.category));
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
