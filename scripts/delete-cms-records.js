const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  // 删除不完整的 CMS 记录，让页面走硬编码 fallback
  const toDelete = [
    { slug: 'franchise', locale: 'zh' },
    { slug: 'franchise-en', locale: 'en' },
    { slug: 'franchisee', locale: 'zh' },
  ];

  for (const item of toDelete) {
    const result = await p.cmsPage.deleteMany({
      where: { slug: item.slug, locale: item.locale }
    });
    console.log(`Deleted ${item.slug}[${item.locale}]: ${result.count} records`);
  }

  // 验证剩余记录
  const remaining = await p.cmsPage.findMany({ orderBy: [{ slug: 'asc' }, { locale: 'asc' }] });
  console.log('\nRemaining CMS pages:', remaining.length);
  for (const pg of remaining) {
    console.log(`  ${pg.slug}[${pg.locale}] - ${pg.content.length} chars`);
  }
}

main().finally(() => p.$disconnect());