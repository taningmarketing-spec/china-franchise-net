/**
 * 品牌专属图片映射更新脚本
 * 为每个品牌文章匹配更精准的图片
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 品牌专属图片映射（Unsplash高质量图片）
const BRAND_IMAGES = {
  // 挞柠 TANING - 柠檬茶品牌
  'taning': [
    'https://images.unsplash.com/photo-1556679343-c7306c6d6e28?w=800&h=400&fit=crop', // 柠檬茶特写
    'https://images.unsplash.com/photo-1621263765875-3b7cb5e67c78?w=800&h=400&fit=crop', // 柠檬切片
    'https://images.unsplash.com/photo-1567873033730-5cbb8fcc0b95?w=800&h=400&fit=crop', // 茶饮店
  ],
  
  // 霸王茶姬 CHAGEE - 国风茶饮
  'chagee': [
    'https://images.unsplash.com/photo-1571938229358-d0c0e7f9a6e5?w=800&h=400&fit=crop', // 中国风茶
    'https://images.unsplash.com/photo-1544785353-5f1c5c5c5c5c?w=800&h=400&fit=crop', // 茶艺
    'https://images.unsplash.com/photo-1580921262843-a8f8c8f8c8f8?w=800&h=400&fit=crop', // 国风
  ],
  
  // 瑞幸咖啡 Luckin
  'luckin': [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop', // 咖啡杯
    'https://images.unsplash.com/photo-1495474497474-49a149547449?w=800&h=400&fit=crop', // 咖啡店
    'https://images.unsplash.com/photo-1504636722256-6e2e2e2e2e2e?w=800&h=400&fit=crop', // 咖啡豆
  ],
  
  // 杨国福麻辣烫
  'yangguofu': [
    'https://images.unsplash.com/photo-1569718210058-47b8e5c2e2c2?w=800&h=400&fit=crop', // 麻辣烫
    'https://images.unsplash.com/photo-1563244148-1c3c3c3c3c3c?w=800&h=400&fit=crop', // 中餐
    'https://images.unsplash.com/photo-1565299624926-b6b6b6b6b6b6?w=800&h=400&fit=crop', // 火锅风格
  ],
  
  // 五条人糖水铺
  'wutiaoren': [
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=400&fit=crop', // 甜品
    'https://images.unsplash.com/photo-1563807658658-8a8a8a8a8a8a?w=800&h=400&fit=crop', // 糖水
    'https://images.unsplash.com/photo-1488477887888-8a8a8a8a8a8a?w=800&h=400&fit=crop', // 中式甜品
  ],
  
  // 气泡茶/奶茶通用
  'bubble-tea': [
    'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&h=400&fit=crop', // 珍珠奶茶
    'https://images.unsplash.com/photo-1621263765875-3b7cb5e67c78?w=800&h=400&fit=crop', // 茶饮
  ],
};

// 国家/地区图片
const COUNTRY_IMAGES = {
  'thailand': 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
  'vietnam': 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=400&fit=crop',
  'singapore': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
  'malaysia': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop',
  'indonesia': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&h=400&fit=crop',
  'myanmar': 'https://images.unsplash.com/photo-1504215680853-4268791616f1?w=800&h=400&fit=crop',
};

// 话题图片
const TOPIC_IMAGES = {
  'contract': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
  'law': 'https://images.unsplash.com/photo-1589829599200-6b6b6b6b6b6b?w=800&h=400&fit=crop',
  'location': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
  'supply': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
  'recruit': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
  'localization': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop',
  'digital': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
  'expo': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
};

// 基硎slug（不带语言后缀）到图片的映射（最精准）
// 这样所有语言版本都会使用相同的品牌专属图片
const ARTICLE_IMAGE_MAP = {
  // 挞柠相关文章 - 使用柠檬茶专属图片
  'tading-lemon-tea-thailand': 'https://images.unsplash.com/photo-1556679343-c7306c6d6e28?w=800&h=400&fit=crop',
  'taning-opens-50th-thailand-store': 'https://images.unsplash.com/photo-1621263765875-3b7cb5e67c78?w=800&h=400&fit=crop',
  'taning-overseas-expansion-2026': 'https://images.unsplash.com/photo-1567873033730-5cbb8fcc0b95?w=800&h=400&fit=crop',
  'taning-thailand-deep-dive': 'https://images.unsplash.com/photo-1556679343-c7306c6d6e28?w=800&h=400&fit=crop',
  
  // 霸王茶姬
  'chagee-malaysia-success-story': 'https://images.unsplash.com/photo-1567873033730-5cbb8fcc0b95?w=800&h=400&fit=crop',
  'chagee-luckin-overseas-race-2026': 'https://images.unsplash.com/photo-1567873033730-5cbb8fcc0b95?w=800&h=400&fit=crop',
  
  // 瑞幸咖啡
  'luckin-singapore-strategy': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop',
  
  // 杨国福
  'yang-guofu-thailand-story': 'https://images.unsplash.com/photo-1569718210058-47b8e5c2e2c2?w=800&h=400&fit=crop',
  'yangguofu-thailand-case': 'https://images.unsplash.com/photo-1563244148-1c3c3c3c3c3c?w=800&h=400&fit=crop',
  
  // 五条人
  'wutiaoren-sugar-paste-overseas': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=400&fit=crop',
  
  // 气泡茶越南
  'bubble-tea-vietnam-expansion': 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&h=400&fit=crop',
  
  // 甜品品牌缅甸
  'dessert-brand-myanmar-entry': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=400&fit=crop',
  
  // 泰国政策
  'thailand-franchise-law': 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
  'thailand-franchise-law-guide': 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
  
  // 越南政策
  'vietnam-business-license': 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=400&fit=crop',
  'vietnam-business-license-guide': 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=400&fit=crop',
  'vietnam-franchise-regulation-update': 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=400&fit=crop',
  
  // 新加坡政策
  'singapore-fnb-regulation': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
  
  // 马来西亚政策
  'malaysia-halal-requirement': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop',
  
  // 印尼政策
  'indonesia-foreign-investment': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&h=400&fit=crop',
  'indonesia-halal-certification-guide': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&h=400&fit=crop',
  
  // 东南亚市场
  'southeast-asia-franchise-boom-2026': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop',
  'southeast-asia-tea-2026': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop',
  
  // 展会
  'franchise-fair-bangkok-2026': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
  'franchise-expo-trends-2026': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
  
  // 数字化
  'digital-transformation-franchise-2026': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
  
  // 合同相关
  'franchise-agreement-checklist': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
  'franchise-contract-traps': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
  'overseas-franchise-basics': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
  
  // 选址
  'overseas-site-selection': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
  'overseas-location-guide': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
  
  // 本地化
  'localization-strategy': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop',
  'overseas-localization-strategy': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop',
  
  // 供应链
  'supply-chain-setup': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
  'overseas-supply-chain-guide': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
  
  // 招募
  'franchise-recruitment': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
  'franchisee-recruitment-guide': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
};

async function main() {
  console.log('=== 更新文章封面图片（全语言版本） ===\n');
  
  // 获取所有文章
  const articles = await prisma.article.findMany({
    select: { id: true, slug: true, locale: true },
  });
  
  let updated = 0;
  
  for (const article of articles) {
    // 从slug中提取基础slug（去掉语言后缀）
    const baseSlug = article.slug.replace(/-zh$|-en$|-th$|-vi$/, '');
    
    // 查找匹配的图片：优先精确匹配，再匹配基础slug
    let image = ARTICLE_IMAGE_MAP[article.slug] || ARTICLE_IMAGE_MAP[baseSlug];
    
    if (image) {
      await prisma.article.update({
        where: { id: article.id },
        data: { featuredImg: image },
      });
      updated++;
      console.log(`✓ [${article.locale}] ${article.slug}`);
    }
  }
  
  console.log(`\n总计更新 ${updated} 篇文章图片`);
  
  await prisma.$disconnect();
}

main().catch(console.error);
