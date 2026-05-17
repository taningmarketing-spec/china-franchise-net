const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.brand.findMany({ select: { name: 1, slug: 1, industry: 1, categorySlug: 1 } })
  .then(r => console.log(JSON.stringify(r, null, 2)))
  .catch(e => console.error(e.message))
  .finally(() => p.$disconnect());
