/**
 * 为海外加盟学院文章更新封面图片
 * 使用 Unsplash 相关主题图片
 * 运行: node scripts/update-article-images.js
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 按文章主题匹配合适的 Unsplash 图片
const IMAGE_MAP = {
  // ========== overseas-dynamic（海外加盟动态）==========
  'southeast-asia-franchise-boom-2026': {
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop',
    alt: '东南亚市场增长图表'
  },
  'franchise-expo-trends-2026': {
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    alt: '商业展会现场'
  },
  'taning-overseas-expansion-2026': {
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&h=400&fit=crop',
    alt: '柠檬茶饮品'
  },
  'chagee-luckin-overseas-race-2026': {
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop',
    alt: '咖啡与茶饮'
  },
  'digital-transformation-franchise-2026': {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    alt: '数字化商业'
  },

  // ========== overseas-case（品牌出海案例）==========
  'chagee-malaysia-success': {
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop',
    alt: '马来西亚市场'
  },
  'luckin-singapore-expansion': {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    alt: '新加坡城市天际线'
  },
  'yangguofu-thailand-entry': {
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
    alt: '泰国街头美食'
  },
  'taning-thailand-deep-dive': {
    image: 'https://images.unsplash.com/photo-1504215680853-4268791616f1?w=800&h=400&fit=crop',
    alt: '泰国茶文化'
  },
  'wutiaoren-southeast-asia': {
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=400&fit=crop',
    alt: '甜品糖水'
  },

  // ========== overseas-tips（海外加盟知识）==========
  'franchise-contract-traps': {
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    alt: '合同签署'
  },
  'location-selection-guide': {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    alt: '商业选址'
  },
  'localization-strategy': {
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop',
    alt: '跨文化沟通'
  },
  'supply-chain-overseas': {
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
    alt: '供应链物流'
  },
  'franchisee-recruitment-tips': {
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
    alt: '团队招聘'
  },

  // ========== overseas-policy（海外特许政策）==========
  'thailand-franchise-law-guide': {
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
    alt: '泰国法律'
  },
  'vietnam-business-license-guide': {
    image: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=400&fit=crop',
    alt: '越南商业'
  }
};

async function main() {
  console.log('开始更新文章封面图片...\n');

  let updated = 0;
  let skipped = 0;

  for (const [baseSlug, imgData] of Object.entries(IMAGE_MAP)) {
    // 为每个 slug 的4种语言版本更新图片
    const locales = ['zh', 'en', 'th', 'vi'];

    for (const locale of locales) {
      const slug = `${baseSlug}-${locale}`;

      const result = await prisma.article.updateMany({
        where: { slug },
        data: {
          featuredImg: imgData.image
        }
      });

      if (result.count > 0) {
        updated++;
        console.log(`✓ 更新: ${slug}`);
      } else {
        skipped++;
      }
    }
  }

  console.log(`\n完成！更新 ${updated} 篇，跳过 ${skipped} 篇（未找到）`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
