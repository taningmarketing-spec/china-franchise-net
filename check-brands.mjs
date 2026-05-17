import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

try {
  const brands = await prisma.brand.findMany({
    select: { id: true, name: true, slug: true, status: true }
  });
  console.log(JSON.stringify(brands, null, 2));
} catch (e) {
  console.error('Error:', e.message);
} finally {
  await prisma.$disconnect();
}
