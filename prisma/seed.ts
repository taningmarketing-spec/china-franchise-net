import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SEED_BRANDS = [
  { name: '挞柠柠檬茶', industry: '茶饮', slug: 'taning-lemon-tea', franchiseFee: '15-25万', totalCost: '30-50万', storesChina: 480, storesOverseas: 20, advantage: '手打柠檬茶开创者', description: '挞柠（Taning）专注手打柠檬茶，以广东潮汕为核心，覆盖全国500+门店，主打真柠檬+好茶叶，年轻人喜爱的茶饮品牌。', process: [{ step: 1, title: '咨询了解', desc: '电话或在线联系，了解品牌及加盟政策' }, { step: 2, title: '实地考察', desc: '到总部或现有门店实地考察' }, { step: 3, title: '签订合同', desc: '签订加盟合同，缴纳相关费用' }, { step: 4, title: '选址装修', desc: '在指导下进行选址、装修' }, { step: 5, title: '培训开业', desc: '接受培训，准备开业' }], support: ['选址评估支持', '装修设计支持', '培训支持', '供应链支持', '营销推广支持', '运营督导支持'] },
  { name: '霸王茶姬', industry: '茶饮', slug: 'bawang-cha-ji', franchiseFee: '30-50万', totalCost: '60-100万', storesChina: 3800, storesOverseas: 200, advantage: '中国茶饮出海标杆', description: '霸王茶姬，以原叶鲜奶茶为核心，已在全球开设4000+门店，中国茶饮出海的标杆品牌。', process: [{ step: 1, title: '咨询了解', desc: '了解品牌理念和加盟政策' }, { step: 2, title: '资质审核', desc: '提交资质，审核通过后进入下一步' }, { step: 3, title: '签订合同', desc: '签订特许经营合同' }, { step: 4, title: '门店选址', desc: '总部协助选址评估' }, { step: 5, title: '装修培训', desc: '装修门店并接受培训' }, { step: 6, title: '正式开业', desc: '筹备开业，营销推广' }], support: ['品牌授权', '选址支持', '装修设计', '培训支持', '供应链配送', '营销支持'] },
  { name: '瑞幸咖啡', industry: '咖啡', slug: 'luckin-coffee', franchiseFee: '30-50万', totalCost: '50-100万', storesChina: 17500, storesOverseas: 500, advantage: '数字化运营领先', description: 'Luckin Coffee瑞幸咖啡，以数字化运营和超高性价比著称，全国18000+门店，APP私域运营行业领先。', process: [{ step: 1, title: '申请提交', desc: '在线提交加盟申请' }, { step: 2, title: '资质审核', desc: '总部审核资质' }, { step: 3, title: '门店选址', desc: '总部协助选址评估' }, { step: 4, title: '签订合同', desc: '签订加盟合同' }, { step: 5, title: '装修开业', desc: '装修、培训、开业' }], support: ['数字化系统', '选址支持', '培训支持', '供应链支持', '运营督导'] },
  { name: '杨国福麻辣烫', industry: '小吃', slug: 'yang-guofu-mala', franchiseFee: '10-20万', totalCost: '15-35万', storesChina: 5800, storesOverseas: 200, advantage: '国民麻辣烫第一品牌', description: '杨国福麻辣烫，国民麻辣烫品牌，以自选食材和丰富口味著称，全国6000+门店。', process: [{ step: 1, title: '咨询了解', desc: '了解品牌及加盟政策' }, { step: 2, title: '实地考察', desc: '总部参观考察' }, { step: 3, title: '签订合同', desc: '签订加盟合同' }, { step: 4, title: '门店筹备', desc: '选址、装修、培训' }, { step: 5, title: '开业运营', desc: '正式开业' }], support: ['选址评估', '装修设计', '技术培训', '供应配送', '运营指导'] },
  { name: '西树泡芙', industry: '甜品', slug: 'cizh-puff', franchiseFee: '10-20万', totalCost: '15-35万', storesChina: 450, storesOverseas: 50, advantage: '法式手工泡芙专家', description: '西树泡芙，主打法式手工泡芙，新鲜现烤，深受年轻人喜爱。', process: [{ step: 1, title: '咨询了解', desc: '了解品牌信息' }, { step: 2, title: '考察签约', desc: '实地考察并签订合同' }, { step: 3, title: '培训学习', desc: '产品制作和运营培训' }, { step: 4, title: '装修开业', desc: '装修门店并开业' }], support: ['技术培训', '选址支持', '装修设计', '供应配送'] },
  { name: '五条人糖水铺', industry: '糖水', slug: 'wutiaoren-tangshui', franchiseFee: '10-20万', totalCost: '15-30万', storesChina: 280, storesOverseas: 20, advantage: '广式糖水高性价比', description: '五条人糖水铺，主打广式糖水，以高性价比和多样化产品著称。', process: [{ step: 1, title: '咨询了解', desc: '了解品牌加盟政策' }, { step: 2, title: '实地考察', desc: '总部考察' }, { step: 3, title: '签订合同', desc: '签订加盟合同' }, { step: 4, title: '筹备开业', desc: '选址、装修、培训' }], support: ['选址评估', '装修设计', '产品培训', '供应链支持'] },
];

async function main() {
  console.log('🌱 开始初始化数据...');

  // 创建分类
  const categories = [
    { name: '茶饮', slug: 'chayin', icon: '🍵', desc: '奶茶、柠檬茶、水果茶', sort: 1, color: '#10b981' },
    { name: '咖啡', slug: 'kafei', icon: '☕', desc: '精品咖啡、连锁咖啡', sort: 2, color: '#8b5cf6' },
    { name: '小吃', slug: 'xiaochi', icon: '🍢', desc: '炸鸡、卤味、烧烤', sort: 3, color: '#f97316' },
    { name: '甜品', slug: 'tianpin', icon: '🍰', desc: '蛋糕、泡芙、点心', sort: 4, color: '#ec4899' },
    { name: '糖水', slug: 'tangshui', icon: '🍮', desc: '广式糖水、甜汤', sort: 5, color: '#f59e0b' },
    { name: '餐饮', slug: 'canyin', icon: '🍜', desc: '快餐、火锅、麻辣烫', sort: 6, color: '#ef4444' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      create: cat,
      update: {},
    });
  }
  console.log('✅ 分类已创建');

  // 创建种子品牌
  for (const brand of SEED_BRANDS) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      create: {
        name: brand.name,
        slug: brand.slug,
        industry: brand.industry,
        categorySlug: brand.industry === '茶饮' ? 'chayin' : brand.industry === '咖啡' ? 'kafei' : brand.industry === '甜品' ? 'tianpin' : brand.industry === '糖水' ? 'tangshui' : 'xiaochi',
        franchiseFee: brand.franchiseFee,
        totalCost: brand.totalCost,
        storesChina: brand.storesChina,
        storesOverseas: brand.storesOverseas,
        advantage: brand.advantage,
        description: brand.description,
        process: JSON.stringify(brand.process),
        support: JSON.stringify(brand.support),
        images: '[]',
        status: 'published',
        publishedAt: new Date(),
      },
      update: {},
    });
  }
  console.log(`✅ ${SEED_BRANDS.length} 个种子品牌已创建`);

  console.log('\n🎉 数据初始化完成！');
  console.log(`📦 管理员: ${process.env.ADMIN_USERNAME || 'admin'}`);
  console.log(`🔑 密码: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
