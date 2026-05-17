/**
 * 删除所有文章摘要中的固定结尾文字
 * 移除: "- 本文为您详细解读海外加盟相关信息，提供实用的参考建议。"
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TEXT_TO_REMOVE = '- 本文为您详细解读海外加盟相关信息，提供实用的参考建议。';

async function main() {
  console.log('🔍 开始检查所有文章摘要...\n');

  // 找出所有包含该文字的文章
  const articles = await prisma.article.findMany({
    where: {
      excerpt: {
        contains: TEXT_TO_REMOVE,
      },
    },
    select: {
      id: true,
      slug: true,
      title: true,
      locale: true,
      excerpt: true,
    },
  });

  console.log(`📋 找到 ${articles.length} 篇文章含有该文字：\n`);

  for (const article of articles) {
    console.log(`  - [${article.locale}] ${article.title}`);
  }

  if (articles.length === 0) {
    console.log('✅ 没有文章需要清理！');
    return;
  }

  // 更新：移除该文字
  const result = await prisma.article.updateMany({
    where: {
      excerpt: {
        contains: TEXT_TO_REMOVE,
      },
    },
    data: {
      excerpt: {
        set: null, // 直接清空摘要，让系统不显示摘要
      },
    },
  });

  console.log(`\n✅ 已清理 ${result.count} 篇文章的摘要！`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
