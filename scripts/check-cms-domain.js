const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
async function main() {
  const cms = await p.cmsPage.findMany();
  console.log('CMS pages:', cms.length, cms.map(x => x.slug + '/' + x.locale));
  p.$disconnect();
}
main();