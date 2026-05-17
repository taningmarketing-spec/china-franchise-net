const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  // 列出所有 CMS 页面
  const all = await p.cmsPage.findMany({ orderBy: [{ slug: 'asc' }, { locale: 'asc' }] });
  console.log('All CMS pages (' + all.length + '):');
  for (const pg of all) {
    console.log('  ' + pg.slug + ' [' + pg.locale + '] - ' + pg.content.length + ' chars - title: ' + (pg.title || '(none)'));
  }
}

main().finally(() => p.$disconnect());
