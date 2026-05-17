process.chdir('C:/Users/LEO/.qclaw/workspace/china-franchise-net');
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.admin.findMany().then(a => {
  console.log(JSON.stringify(a));
  p.$disconnect();
}).catch(e => console.error(e.message));