const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const slugs = ['taning-lemon-tea', 'bawang-cha-ji', 'luckin-coffee', 'yang-guofu-mala', 'cizh-puff', 'wutiaoren-tangshui'];
  for (const s of slugs) {
    await prisma.brand.update({ where: { slug: s }, data: { isHot: true } });
  }
  console.log('All 6 brands set to isHot=true');
  const hot = await prisma.brand.findMany({ where: { isHot: true }, select: { name: true } });
  console.log(hot.map(b => b.name).join(', '));
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
