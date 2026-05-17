const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
async function seed() {
  const defaults = [
    { key: 'contact_wechat', value: 'Taning2024' },
    { key: 'contact_whatsapp', value: '+86 138 0242 9520' },
    { key: 'contact_phone', value: '400-888-9999' },
    { key: 'contact_email', value: 'info@franchise.cn' },
    { key: 'site_name', value: '中国国际加盟网' },
    { key: 'site_slogan', value: '找到适合你的加盟品牌' },
  ];
  for (const s of defaults) {
    await p.settings.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
    console.log(`Upserted: ${s.key}`);
  }
  const all = await p.settings.findMany();
  console.log(JSON.stringify(all, null, 2));
  await p.$disconnect();
}
seed().catch(e => { console.error(e.message); process.exit(1); });