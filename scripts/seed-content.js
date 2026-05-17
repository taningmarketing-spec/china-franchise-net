const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  // Demo articles
  const articles = [
    {
      title: '2026东南亚茶饮市场报告：越南、泰国、印尼三大市场机遇分析',
      slug: 'southeast-asia-tea-2026',
      content: '<h2>市场概览</h2><p>东南亚茶饮市场在2026年继续保持高速增长态势。越南、泰国、印尼三大核心市场的茶饮消费规模已突破200亿美元，年增长率维持在15%以上。</p><h2>越南市场</h2><p>越南年轻人对奶茶的接受度极高，平均每周消费奶茶2-3次。市场以平价奶茶为主，单杯价格区间在15-25元人民币。</p><h2>泰国市场</h2><p>泰国茶饮市场竞争激烈，本土品牌与外来品牌并存。泰式奶茶仍是主流，但芝士奶盖茶、鲜果茶增长迅猛。</p><h2>印尼市场</h2><p>印尼是全球第四大人口国，茶饮市场潜力巨大。清真认证是进入市场的必要条件。</p>',
      excerpt: '深度分析东南亚三大核心茶饮市场的机遇与挑战',
      category: 'overseas-dynamic',
      locale: 'zh',
      status: 'published',
      author: '中国国际加盟网',
      viewCount: 2340,
      sortOrder: 1,
    },
    {
      title: '泰国特许经营法2026年修订要点：外资餐饮品牌准入新规',
      slug: 'thailand-franchise-law',
      content: '<h2>法规背景</h2><p>泰国商务部门于2026年初发布了《特许经营法》修订草案，主要涉及外资品牌的市场准入条件和信息披露要求。</p><h2>主要修订内容</h2><ul><li>外资品牌需在泰国设立法人实体</li><li>最低注册资本要求提高至500万泰铢</li><li>必须使用泰语进行信息披露</li><li>设立消费者保护专项基金</li></ul><h2>合规建议</h2><p>建议品牌在进入泰国市场前，聘请当地法律顾问进行合规审查，确保所有文件符合最新法规要求。</p>',
      excerpt: '详解泰国特许经营法最新修订对外资品牌的影响',
      category: 'overseas-policy',
      locale: 'zh',
      status: 'published',
      author: '中国国际加盟网',
      viewCount: 1560,
      sortOrder: 1,
    },
    {
      title: '挞柠柠檬茶泰国市场扩张：从中泰双总部到本地化运营',
      slug: 'tading-lemon-tea-thailand',
      content: '<h2>项目背景</h2><p>挞柠柠檬茶作为广州挞柠餐饮管理有限公司旗下品牌，于2024年正式启动海外扩张战略，泰国为首站。</p><h2>运营模式</h2><p>采用「中泰双总部」架构：广州总部负责供应链和品牌输出，曼谷总部负责本地运营和市场拓展。</p><h2>本地化策略</h2><p>在产品上，推出泰式柠檬茶专属SKU；在选址上，主攻购物中心和地铁沿线；在营销上，与本地KOL深度合作。</p><h2>成果</h2><p>截至2026年Q1，挞柠在泰国已开设12家门店，月均坪效超过国内同级别门店30%。</p>',
      excerpt: '案例解析：挞柠柠檬茶泰国市场扩张实战经验',
      category: 'overseas-case',
      locale: 'zh',
      status: 'published',
      author: '中国国际加盟网',
      viewCount: 1890,
      sortOrder: 1,
    },
    {
      title: '海外加盟常见问题Q&A',
      slug: 'overseas-franchise-basics',
      content: '<h2>什么是海外加盟？</h2><p>海外加盟是指品牌方授权境外投资者在特定国家或地区使用其品牌、商标、运营系统进行经营的活动。</p><h2>需要准备多少资金？</h2><p>不同国家和品牌要求差异较大，通常需要准备品牌加盟费、装修费、设备费、首批原料费、人员培训费等。建议总预算在50-500万元人民币之间。</p><h2>语言不通怎么办？</h2><p>大多数成熟品牌会提供多语言培训材料和驻店指导。建议投资人也具备基本的英语沟通能力。</p>',
      excerpt: '解答关于海外加盟的常见疑问',
      category: 'overseas-tips',
      locale: 'zh',
      status: 'published',
      author: '中国国际加盟网',
      viewCount: 2100,
      sortOrder: 1,
    },
  ];

  for (const article of articles) {
    const exists = await prisma.article.findUnique({ where: { slug: article.slug } });
    if (!exists) {
      await prisma.article.create({ data: article });
      console.log('Created:', article.title);
    } else {
      console.log('Exists:', article.title);
    }
  }

  // Demo FAQs
  const faqs = [
    {
      question: '加盟海外品牌需要具备什么资质？',
      answer: '不同国家对加盟商的资质要求不同。通常需要：有效的商业注册文件、足够的启动资金、良好的商业信誉、有餐饮或零售行业经验者更佳。部分国家对外国投资者还有特殊的签证或居留要求。',
      category: 'overseas',
      locale: 'zh',
      status: 'published',
      sortOrder: 1,
    },
    {
      question: '海外加盟的合同期限一般是多久？',
      answer: '大多数海外加盟合同期限为3-5年，期满后如双方同意可以续约。部分品牌会设置更长的初始合同期（5-10年），但通常会提供更优惠的加盟费政策。',
      category: 'overseas',
      locale: 'zh',
      status: 'published',
      sortOrder: 2,
    },
    {
      question: '品牌方会提供哪些培训支持？',
      answer: '成熟的海外加盟品牌通常提供：开业前理论培训、驻店实操培训、定期线上培训课程、运营手册和标准化流程文件。部分品牌还提供厨师或运营经理的外派支持。',
      category: 'brand-development',
      locale: 'zh',
      status: 'published',
      sortOrder: 1,
    },
    {
      question: '如何选择适合自己的加盟品牌？',
      answer: '建议从以下几个维度评估：1）品牌在目标市场的知名度和口碑；2）品牌提供的支持政策和培训体系；3）投资回报周期和预期收益；4）品牌的供应链稳定性；5）合同条款的公平性。建议在签约前实地考察品牌现有门店。',
      category: 'general',
      locale: 'zh',
      status: 'published',
      sortOrder: 1,
    },
  ];

  for (const faq of faqs) {
    const exists = await prisma.faq.findFirst({ where: { question: faq.question } });
    if (!exists) {
      await prisma.faq.create({ data: faq });
      console.log('Created FAQ:', faq.question);
    } else {
      console.log('FAQ exists:', faq.question);
    }
  }

  const articleCount = await prisma.article.count();
  const faqCount = await prisma.faq.count();
  console.log('\nTotal: ' + articleCount + ' articles, ' + faqCount + ' FAQs');
}

seed().catch(console.error).finally(() => { prisma.$disconnect(); });
