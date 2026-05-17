import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const article = await prisma.article.findUnique({
    where: { slug: 'taning-thailand-deep-dive-zh' },
    select: { title: true, content: true, excerpt: true }
  });
  
  if (!article) {
    console.log('Article not found');
    return;
  }
  
  // Check for placeholder patterns
  const placeholderPatterns = [
    /待补充/g,
    /TODO/g,
    /\[.*待填写.*\]/g,
    /敬请期待/g,
    /内容待完善/g
  ];
  
  let hasPlaceholders = false;
  for (const pattern of placeholderPatterns) {
    if (pattern.test(article.content)) {
      hasPlaceholders = true;
      console.log(`Found placeholder pattern: ${pattern}`);
    }
  }
  
  console.log('\nArticle title:', article.title);
  console.log('Content length:', article.content?.length || 0);
  console.log('Has placeholders:', hasPlaceholders);
  console.log('\nFirst 500 chars of content:');
  console.log(article.content?.substring(0, 500));
}

check().finally(() => prisma.$disconnect());
