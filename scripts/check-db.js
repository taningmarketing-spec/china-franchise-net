const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const articles = await p.article.findMany({ select: { id: true, title: true, slug: true, category: true, status: true } });
  console.log('Articles count:', articles.length);
  articles.forEach(a => console.log(' -', a.title, '|', a.category, '|', a.status));
  
  const faqs = await p.faq.findMany({ select: { id: true, question: true, category: true } });
  console.log('\nFAQs count:', faqs.length);
  faqs.forEach(f => console.log(' -', f.question, '|', f.category));
  
  await p.$disconnect();
}
main().catch(e => { console.error(e); p.$disconnect(); });
