const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 参考 franchisesearch.com.hk 风格的 CMS 内容
const cmsContents = {
  franchise: {
    zh: {
      slug: 'franchise',
      title: '成为加盟主',
      content: `
<div class="franchise-hero text-center py-12">
  <h1 class="text-4xl md:text-5xl font-bold mb-4">让您的品牌插上加盟的翅膀</h1>
  <p class="text-xl text-slate-300 mb-8">专业加盟发展服务，助力品牌规模化成长</p>
  <div class="flex flex-wrap gap-4 justify-center">
    <a href="#process" class="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all">了解加盟流程</a>
    <a href="#contact" class="px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all">立即咨询</a>
  </div>
</div>

<div class="franchise-features py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-bold text-center mb-12 text-slate-800">为什么选择加盟发展？</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="feature-item bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
        <div class="text-4xl mb-3">🚀</div>
        <h3 class="font-bold text-slate-800 mb-2">快速规模化扩张</h3>
        <p class="text-sm text-slate-500 leading-relaxed">借助加盟商资源实现轻资产快速扩张，降低直营开店成本</p>
      </div>
      <div class="feature-item bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
        <div class="text-4xl mb-3">💰</div>
        <h3 class="font-bold text-slate-800 mb-2">多元化收入来源</h3>
        <p class="text-sm text-slate-500 leading-relaxed">收取加盟费、品牌管理费、供应链利润等多重收入</p>
      </div>
      <div class="feature-item bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
        <div class="text-4xl mb-3">🌏</div>
        <h3 class="font-bold text-slate-800 mb-2">品牌全国覆盖</h3>
        <p class="text-sm text-slate-500 leading-relaxed">通过加盟网络快速覆盖全国各线城市，提升品牌知名度</p>
      </div>
      <div class="feature-item bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
        <div class="text-4xl mb-3">📊</div>
        <h3 class="font-bold text-slate-800 mb-2">降低运营风险</h3>
        <p class="text-sm text-slate-500 leading-relaxed">加盟商承担门店运营风险，总部聚焦品牌与产品研发</p>
      </div>
    </div>
  </div>
</div>

<div class="franchise-process py-16 bg-slate-50">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-bold text-center mb-12 text-slate-800">加盟发展五步法</h2>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div class="process-step bg-white rounded-2xl p-6 shadow-sm relative">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg mb-4">01</div>
        <h3 class="font-bold text-slate-800 mb-2">品牌诊断与定位</h3>
        <p class="text-sm text-slate-500 leading-relaxed">深入了解您的品牌现状，分析核心优势，确定加盟定位与市场策略</p>
        <div class="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 text-xl">→</div>
      </div>
      <div class="process-step bg-white rounded-2xl p-6 shadow-sm relative">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg mb-4">02</div>
        <h3 class="font-bold text-slate-800 mb-2">标准化体系建设</h3>
        <p class="text-sm text-slate-500 leading-relaxed">搭建完整的运营标准化体系（SOP），包括选址、培训、供应链、营销等全流程</p>
        <div class="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 text-xl">→</div>
      </div>
      <div class="process-step bg-white rounded-2xl p-6 shadow-sm relative">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg mb-4">03</div>
        <h3 class="font-bold text-slate-800 mb-2">法律文件准备</h3>
        <p class="text-sm text-slate-500 leading-relaxed">准备特许经营合同、加盟手册等法律文件，确保合规运营</p>
        <div class="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 text-xl">→</div>
      </div>
      <div class="process-step bg-white rounded-2xl p-6 shadow-sm relative">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg mb-4">04</div>
        <h3 class="font-bold text-slate-800 mb-2">试点运营验证</h3>
        <p class="text-sm text-slate-500 leading-relaxed">选取试点门店验证模型，收集数据，优化运营流程</p>
        <div class="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 text-xl">→</div>
      </div>
      <div class="process-step bg-white rounded-2xl p-6 shadow-sm relative">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg mb-4">05</div>
        <h3 class="font-bold text-slate-800 mb-2">全国招商推广</h3>
        <p class="text-sm text-slate-500 leading-relaxed">通过平台多渠道推广，精准对接意向加盟商，高效扩张</p>
      </div>
    </div>
  </div>
</div>

<div class="franchise-values py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-bold text-center mb-12 text-slate-800">我们的服务价值</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="value-card text-center p-6">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🎯</div>
        <h3 class="font-bold text-slate-800 mb-2">精准匹配</h3>
        <p class="text-sm text-slate-500">基于大数据分析，精准匹配优质加盟商资源</p>
      </div>
      <div class="value-card text-center p-6">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🛡️</div>
        <h3 class="font-bold text-slate-800 mb-2">风险管控</h3>
        <p class="text-sm text-slate-500">完善的加盟商审核机制，降低合作风险</p>
      </div>
      <div class="value-card text-center p-6">
        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">📈</div>
        <h3 class="font-bold text-slate-800 mb-2">持续增长</h3>
        <p class="text-sm text-slate-500">持续跟踪运营数据，优化加盟体系</p>
      </div>
    </div>
  </div>
</div>

<div class="franchise-cta py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold mb-4">准备好开启您的加盟之旅了吗？</h2>
    <p class="text-blue-100 mb-8">专业顾问团队将为您提供一对一的加盟发展咨询服务</p>
    <a href="/zh/contact" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition-all text-lg">立即咨询 →</a>
  </div>
</div>
      `,
      seoTitle: '成为加盟主 - 中国国际加盟网',
      seoDesc: '专业加盟发展服务，助力品牌规模化成长。了解加盟流程、服务价值，开启您的加盟之旅。'
    },
    en: {
      slug: 'franchise-en',
      title: 'Become a Franchisor',
      content: 'English content for franchisor page...',
      seoTitle: 'Become a Franchisor - China Franchise Net',
      seoDesc: 'Professional franchise development services for brand growth'
    }
  },
  franchisee: {
    zh: {
      slug: 'franchisee',
      title: '成为加盟商',
      content: `
<div class="franchisee-hero text-center py-12">
  <h1 class="text-4xl md:text-5xl font-bold mb-4">开启您的创业梦想</h1>
  <p class="text-xl text-slate-300 mb-8">加入优质品牌，共享成功商业模式</p>
  <div class="flex flex-wrap gap-4 justify-center">
    <a href="#brands" class="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all">浏览品牌</a>
    <a href="#contact" class="px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all">免费咨询</a>
  </div>
</div>

<div class="cooperation-modes py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-bold text-center mb-12 text-slate-800">合作模式</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="mode-card bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
        <div class="text-4xl mb-3">🏪</div>
        <h3 class="font-bold text-slate-800 mb-2">单店加盟</h3>
        <p class="text-sm text-slate-500 leading-relaxed">适合初次创业者，投资门槛低，风险可控</p>
      </div>
      <div class="mode-card bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
        <div class="text-4xl mb-3">🏢</div>
        <h3 class="font-bold text-slate-800 mb-2">区域代理</h3>
        <p class="text-sm text-slate-500 leading-relaxed">获得指定区域独家经营权，收益更高</p>
      </div>
      <div class="mode-card bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
        <div class="text-4xl mb-3">🌐</div>
        <h3 class="font-bold text-slate-800 mb-2">海外拓展</h3>
        <p class="text-sm text-slate-500 leading-relaxed">跟随品牌出海，开拓国际市场</p>
      </div>
    </div>
  </div>
</div>

<div class="franchisee-benefits py-16 bg-slate-50">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-bold text-center mb-12 text-slate-800">加盟优势</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="benefit-item bg-white rounded-2xl p-6 shadow-sm">
        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-2xl mb-4">✓</div>
        <h3 class="font-bold text-slate-800 mb-2">成熟模式</h3>
        <p class="text-sm text-slate-500">复制成功商业模式，降低创业风险</p>
      </div>
      <div class="benefit-item bg-white rounded-2xl p-6 shadow-sm">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-4">📚</div>
        <h3 class="font-bold text-slate-800 mb-2">系统培训</h3>
        <p class="text-sm text-slate-500">总部提供全方位培训支持</p>
      </div>
      <div class="benefit-item bg-white rounded-2xl p-6 shadow-sm">
        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-2xl mb-4">📢</div>
        <h3 class="font-bold text-slate-800 mb-2">品牌背书</h3>
        <p class="text-sm text-slate-500">借助知名品牌影响力快速获客</p>
      </div>
      <div class="benefit-item bg-white rounded-2xl p-6 shadow-sm">
        <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 text-2xl mb-4">🤝</div>
        <h3 class="font-bold text-slate-800 mb-2">持续支持</h3>
        <p class="text-sm text-slate-500">运营指导、营销支持全程陪伴</p>
      </div>
    </div>
  </div>
</div>

<div class="franchisee-cta py-16 bg-gradient-to-br from-green-600 to-green-800 text-white">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold mb-4">寻找适合您的加盟品牌？</h2>
    <p class="text-green-100 mb-8">我们为您精选优质加盟项目，助您创业成功</p>
    <a href="/zh/search" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-slate-100 transition-all text-lg">浏览品牌 →</a>
  </div>
</div>
      `,
      seoTitle: '成为加盟商 - 中国国际加盟网',
      seoDesc: '加入优质品牌，共享成功商业模式。浏览加盟项目，开启您的创业梦想。'
    }
  },
  about: {
    zh: {
      slug: 'about',
      title: '关于我们',
      content: `
<div class="about-hero text-center py-12">
  <h1 class="text-4xl md:text-5xl font-bold mb-4">关于中国国际加盟网</h1>
  <p class="text-xl text-slate-300 mb-8">连接优质品牌与全球加盟商的专业平台</p>
</div>

<div class="about-intro py-16 bg-white">
  <div class="max-w-4xl mx-auto px-4">
    <div class="prose prose-lg mx-auto text-slate-600">
      <p class="mb-6">中国国际加盟网是中国领先的特许经营服务平台，致力于为品牌方和加盟商搭建高效、透明的对接桥梁。我们深耕餐饮行业多年，积累了丰富的品牌资源和行业经验。</p>
      <p class="mb-6">我们的使命是帮助优质中国品牌走向世界，同时为海外创业者提供可靠的中国品牌加盟机会。通过专业的服务团队和严格的审核机制，我们确保每一个入驻品牌都具备真实的加盟价值和良好的商业信誉。</p>
    </div>
  </div>
</div>

<div class="about-stats py-16 bg-slate-50">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div class="stat-item text-center">
        <div class="text-4xl font-bold text-blue-600 mb-2">500+</div>
        <div class="text-slate-500">优质品牌</div>
      </div>
      <div class="stat-item text-center">
        <div class="text-4xl font-bold text-blue-600 mb-2">50+</div>
        <div class="text-slate-500">覆盖国家</div>
      </div>
      <div class="stat-item text-center">
        <div class="text-4xl font-bold text-blue-600 mb-2">10000+</div>
        <div class="text-slate-500">成功对接</div>
      </div>
      <div class="stat-item text-center">
        <div class="text-4xl font-bold text-blue-600 mb-2">98%</div>
        <div class="text-slate-500">满意度</div>
      </div>
    </div>
  </div>
</div>

<div class="about-values py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-bold text-center mb-12 text-slate-800">我们的价值观</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="value-card text-center p-6">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🤝</div>
        <h3 class="font-bold text-slate-800 mb-2">诚信透明</h3>
        <p class="text-sm text-slate-500">真实呈现品牌信息，让加盟决策更明智</p>
      </div>
      <div class="value-card text-center p-6">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">⭐</div>
        <h3 class="font-bold text-slate-800 mb-2">品质至上</h3>
        <p class="text-sm text-slate-500">严格筛选入驻品牌，确保加盟价值</p>
      </div>
      <div class="value-card text-center p-6">
        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🚀</div>
        <h3 class="font-bold text-slate-800 mb-2">持续创新</h3>
        <p class="text-sm text-slate-500">不断优化服务体验，引领行业发展</p>
      </div>
    </div>
  </div>
</div>
      `,
      seoTitle: '关于我们 - 中国国际加盟网',
      seoDesc: '了解中国国际加盟网，连接优质品牌与全球加盟商的专业平台。'
    }
  }
};

async function regenerateCmsPages() {
  console.log('开始重新生成 CMS 页面...\n');
  
  // 删除旧的 CMS 页面
  const slugsToDelete = ['franchise', 'franchise-en', 'franchise-th', 'franchise-vi', 
                         'franchisee', 'franchisee-en', 'franchisee-th', 'franchisee-vi',
                         'about', 'about-en', 'about-th', 'about-vi',
                         'contact', 'contact-en', 'contact-th', 'contact-vi',
                         'privacy', 'privacy-en', 'privacy-th', 'privacy-vi',
                         'terms', 'terms-en', 'terms-th', 'terms-vi'];
  
  const deleted = await prisma.cmsPage.deleteMany({
    where: { slug: { in: slugsToDelete } }
  });
  console.log(`✓ 删除 ${deleted.count} 条旧记录`);
  
  // 创建新的 CMS 页面
  const pagesToCreate = [];
  
  // franchise 页面
  for (const [locale, data] of Object.entries(cmsContents.franchise)) {
    pagesToCreate.push({
      slug: data.slug,
      title: data.title,
      content: data.content,
      locale: locale,
      status: 'published',
      seoTitle: data.seoTitle,
      seoDesc: data.seoDesc
    });
  }
  
  // franchisee 页面
  for (const [locale, data] of Object.entries(cmsContents.franchisee)) {
    pagesToCreate.push({
      slug: data.slug,
      title: data.title,
      content: data.content,
      locale: locale,
      status: 'published',
      seoTitle: data.seoTitle,
      seoDesc: data.seoDesc
    });
  }
  
  // about 页面
  for (const [locale, data] of Object.entries(cmsContents.about)) {
    pagesToCreate.push({
      slug: data.slug,
      title: data.title,
      content: data.content,
      locale: locale,
      status: 'published',
      seoTitle: data.seoTitle,
      seoDesc: data.seoDesc
    });
  }
  
  const created = await prisma.cmsPage.createMany({
    data: pagesToCreate
  });
  
  console.log(`✓ 创建 ${created.count} 条新记录`);
  
  // 列出所有 CMS 页面
  const allPages = await prisma.cmsPage.findMany({
    select: { slug: true, title: true, locale: true, status: true },
    orderBy: { id: 'asc' }
  });
  
  console.log('\n当前 CMS 页面列表:');
  allPages.forEach(p => {
    console.log(`  [${p.locale}] ${p.slug} - ${p.title} (${p.status})`);
  });
  
  await prisma.$disconnect();
  console.log('\n✅ CMS 页面重新生成完成！');
}

regenerateCmsPages().catch(console.error);
