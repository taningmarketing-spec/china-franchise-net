const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.settings.findMany().then(r => console.log(JSON.stringify(r, null, 2))).catch(e => console.error(e.message)).finally(() => p.$disconnect());