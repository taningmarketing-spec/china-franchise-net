const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const brands = await prisma.brand.findMany({ select: { name: true, slug: true } });
  brands.forEach(b => console.log(b.slug + '  →  ' + b.name));
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
