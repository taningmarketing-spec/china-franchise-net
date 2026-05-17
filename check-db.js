const {PrismaClient} = require('@prisma/client');
const p = new PrismaClient();
p.brand.findFirst().then(b => {
  console.log(JSON.stringify(b, null, 2));
  p.$disconnect();
}).catch(e => { console.error(e); p.$disconnect(); });