const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.category.findMany({ orderBy: { sort: 'asc' } })
  .then(r => { console.log(JSON.stringify(r, null, 2)); process.exit(0); })
  .catch(e => { console.error(e.message); process.exit(1); });
