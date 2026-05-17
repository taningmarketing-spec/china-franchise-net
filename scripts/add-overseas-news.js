const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 新闻内容
  const article = {
    title: '中国茶饮品牌加速出海，东南亚市场成主战场',
    title_en: 'Chinese Tea Beverage Brands Accelerate Global Expansion, Southeast Asia Becomes Main Battlefield',
    title_th: 'แบรนด์เครื่องดื่มชาจีนเร่งขยายตลาดต่างประเทศ เอเชียตะวันออกเฉียงใต้กลายเป็นสมรภูมิหลัก',
    title_vi: 'Các thương hiệu trà Trung Quốc tăng tốc xuất khẩu, thị trường Đông Nam Á trở thành chiến trường chính',
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
    category: 'overseas-dynamic',
    featured: true,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // 这里需要手动上传图片到 /public/uploads/news/ 目录
  // 然后在数据库中更新 images 字段
  console.log('新闻内容已生成，请手动上传图片并更新数据库');
  console.log('文章标题：', article.title);
  console.log('分类：', article.category);
  console.log('特征图：需要3张实拍图片');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
