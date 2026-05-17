/**
 * 为所有海外加盟学院文章更新封面图片
 * 运行: node scripts/update-all-article-images.js
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 按关键词匹配合适的 Unsplash 图片
const KEYWORD_IMAGE_MAP = {
  // 市场趋势类
  'southeast-asia': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop',
  'franchise-boom': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop',
  'market': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',

  // 展会活动类
  'expo': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
  'fair': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',

  // 茶饮品牌类
  'taning': 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&h=400&fit=crop',
  'chagee': 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&h=400&fit=crop',
  'tea': 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&h=400&fit=crop',
  'bubble': 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&h=400&fit=crop',
  'lemon': 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&h=400&fit=crop',

  // 咖啡品牌类
  'luckin': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop',
  'coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop',

  // 数字化类
  'digital': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',

  // 国家市场类
  'malaysia': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop',
  'singapore': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
  'thailand': 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
  'vietnam': 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=400&fit=crop',
  'indonesia': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&h=400&fit=crop',
  'myanmar': 'https://images.unsplash.com/photo-1504215680853-4268791616f1?w=800&h=400&fit=crop',

  // 餐饮品牌类
  'yangguofu': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=400&fit=crop',
  'yang-guofu': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=400&fit=crop',
  'wutiaoren': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=400&fit=crop',
  'sugar': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=400&fit=crop',
  'dessert': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=400&fit=crop',

  // 合同法律类
  'contract': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
  'law': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop',
  'franchise-law': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop',
  'license': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
  'regulation': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop',
  'policy': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop',

  // 选址运营类
  'location': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
  'site': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
  'supply': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
  'chain': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',

  // 本地化招聘类
  'localization': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop',
  'recruitment': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
  'partner': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',

  // Halal 认证类
  'halal': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop',

  // 投资外资类
  'investment': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
  'foreign': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',

  // 默认图片
  'default': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop'
};

// 分类默认图片
const CATEGORY_IMAGES = {
  'overseas-dynamic': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop',
  'overseas-case': 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&h=400&fit=crop',
  'overseas-tips': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
  'overseas-policy': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop'
};

function getImageForSlug(slug, category) {
  const slugLower = slug.toLowerCase();

  // 遍历关键词映射
  for (const [keyword, url] of Object.entries(KEYWORD_IMAGE_MAP)) {
    if (slugLower.includes(keyword)) {
      return url;
    }
  }

  // 使用分类默认图片
  return CATEGORY_IMAGES[category] || KEYWORD_IMAGE_MAP.default;
}

async function main() {
  console.log('开始更新所有文章封面图片...\n');

  // 获取所有文章
  const articles = await prisma.article.findMany({
    select: { id: true, slug: true, category: true, locale: true }
  });

  console.log(`共找到 ${articles.length} 篇文章\n`);

  let updated = 0;

  for (const article of articles) {
    const imageUrl = getImageForSlug(article.slug, article.category);

    await prisma.article.update({
      where: { id: article.id },
      data: { featuredImg: imageUrl }
    });

    updated++;
    console.log(`✓ [${article.locale}] ${article.slug}`);
  }

  console.log(`\n完成！共更新 ${updated} 篇文章`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
