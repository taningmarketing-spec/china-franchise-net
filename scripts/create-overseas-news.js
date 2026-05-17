const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. 新闻内容（四语言）
  const articleData = {
    // 中文内容
    title: '中国茶饮品牌加速出海，东南亚市场成主战场',
    content: `
# 中国茶饮品牌加速出海，东南亚市场成主战场

近年来，中国茶饮品牌加速布局海外市场，东南亚地区凭借地理位置相近、文化背景相似、消费习惯趋同等优势，成为中国茶饮品牌出海的首选目的地。

## 头部品牌领跑出海

**蜜雪冰城**在全球拥有超过3.6万家门店，其中海外门店突破5000家，主要分布在越南、印尼、泰国、马来西亚等东南亚国家。其高性价比策略在海外市场同样奏效，单杯价格控制在3-5元人民币等值，迅速获得当地消费者青睐。

**喜茶**则选择了高端路线，在新加坡、马来西亚、英国、美国等地开设门店，单杯价格定位在20-30元人民币等值，主打品质和新颖体验。

**奈雪的茶**也在海外布局，重点拓展新加坡、日本、美国等成熟市场。

## 出海挑战与机遇并存

中国茶饮品牌在出海过程中面临诸多挑战：

1. **本地化适应**：需要根据当地口味调整配方，如降低甜度、增加当地特色配料
2. **供应链管理**：海外原材料采购、物流配送、库存管理都需要重新建立
3. **文化差异**：营销方式、品牌传播需要符合当地文化习惯
4. **合规经营**：食品安全、劳动法规、税务政策等都需要严格遵守

但同时，东南亚茶饮市场仍处于快速发展期，消费者对新鲜、健康、高性价比的茶饮需求旺盛，为中国品牌提供了广阔空间。

## 未来趋势：数字化与本土化并重

行业专家认为，中国茶饮品牌在出海过程中需要：

- **数字化运营**：利用中国成熟的移动支付、会员体系、数据分析等数字化工具
- **本土化创新**：开发符合当地口味的产品，与当地文化深度融合
- **供应链本地化**：逐步建立本地供应链，降低成本，提高响应速度
- **品牌文化建设**：讲好中国茶故事，同时融入当地文化元素

随着RCEP协议深入实施，中国与东盟国家的经贸合作将更加紧密，中国茶饮品牌在东南亚市场的发展前景广阔。

---

*本文数据截至2026年5月，来源：中国连锁经营协会、欧睿国际*
    `,
    
    // 英文标题和内容
    title_en: 'Chinese Tea Beverage Brands Accelerate Global Expansion, Southeast Asia Becomes Main Battlefield',
    content_en: `
# Chinese Tea Beverage Brands Accelerate Global Expansion, Southeast Asia Becomes Main Battlefield

In recent years, Chinese tea beverage brands have accelerated their expansion into overseas markets. Southeast Asia has become the preferred destination for Chinese tea brands due to its geographical proximity, similar cultural backgrounds, and converging consumer habits.

## Leading Brands Pioneering Global Expansion

**Mixue Ice Cream & Tea** has over 36,000 stores globally, with more than 5,000 overseas stores mainly distributed in Southeast Asian countries such as Vietnam, Indonesia, Thailand, and Malaysia. Its high-cost-performance strategy has proven equally effective in overseas markets, with per-cup prices controlled at 3-5 RMB equivalent, quickly gaining favor among local consumers.

**HEYTEA** has chosen a premium route, opening stores in Singapore, Malaysia, the UK, the US, and other locations. Per-cup prices are positioned at 20-30 RMB equivalent, focusing on quality and novel experiences.

**Nayuki** is also expanding overseas, focusing on mature markets like Singapore, Japan, and the US.

## Challenges and Opportunities Coexist in Going Global

Chinese tea brands face many challenges in the process of going global:

1. **Localization adaptation**: Need to adjust formulations according to local tastes, such as reducing sweetness and adding local specialty ingredients
2. **Supply chain management**: Overseas raw material procurement, logistics, and inventory management all need to be re-established
3. **Cultural differences**: Marketing methods and brand communication need to comply with local cultural habits
4. **Compliant operation**: Food safety, labor laws, tax policies, etc. all need strict adherence

But at the same time, the Southeast Asian tea market is still in a rapid development period. Consumer demand for fresh, healthy, and cost-effective tea beverages is strong, providing broad space for Chinese brands.

## Future Trend: Equal Emphasis on Digitalization and Localization

Industry experts believe that Chinese tea brands need to:

- **Digital operations**: Utilize mature digital tools such as mobile payment, membership systems, and data analysis from China
- **Localized innovation**: Develop products that suit local tastes and deeply integrate with local culture
- **Localized supply chain**: Gradually establish local supply chains to reduce costs and improve response speed
- **Brand culture building**: Tell good Chinese tea stories while integrating local cultural elements

With the deep implementation of the RCEP agreement, economic and trade cooperation between China and ASEAN countries will become closer, and Chinese tea brands will have broad development prospects in the Southeast Asian market.

---

*Data as of May 2026, Sources: China Chain Store Franchise Association, Euromonitor International*
    `,
    
    // 泰文标题
    title_th: 'แบรนด์เครื่องดื่มชาจีนเร่งขยายตลาดต่างประเทศ เอเชียตะวันออกเฉียงใต้กลายเป็นสมรภูมิหลัก',
    
    // 越南文标题
    title_vi: 'Các thương hiệu trà Trung Quốc tăng tốc xuất khẩu, thị trường Đông Nam Á trở thành chiến trường chính',
    
    // 分类（出海动态）
    category: 'overseas-dynamic',
    
    // 特征图（3张实拍图，需要手动上传到服务器）
    images: JSON.stringify([
      '/uploads/news/tea-overseas-1.jpg',
      '/uploads/news/tea-overseas-2.jpg',
      '/uploads/news/tea-overseas-3.jpg'
    ]),
    
    // 发布状态
    published: true,
    featured: true,
    
    // 作者
    author: '中国特许经营网',
    
    // 标签
    tags: JSON.stringify(['茶饮出海', '东南亚市场', '蜜雪冰城', '喜茶', '品牌国际化']),
  };

  // 2. 插入数据库
  const article = await prisma.academyArticle.create({
    data: articleData,
  });

  console.log('✅ 文章创建成功！');
  console.log('文章ID:', article.id);
  console.log('标题:', article.title);
  console.log('分类:', article.category);
  console.log('');
  console.log('⚠️ 下一步操作：');
  console.log('1. 准备3张茶饮出海相关实拍图片');
  console.log('2. 将图片上传到服务器：/home/ubuntu/china-franchise-net/public/uploads/news/');
  console.log('3. 确保图片文件名与数据库中的路径匹配：');
  console.log('   - /uploads/news/tea-overseas-1.jpg');
  console.log('   - /uploads/news/tea-overseas-2.jpg');
  console.log('   - /uploads/news/tea-overseas-3.jpg');
  console.log('4. 访问网站验证：https://cnfranchise.com/zh/academy/overseas-dynamic');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ 错误：', e);
    await prisma.$disconnect();
    process.exit(1);
  });
