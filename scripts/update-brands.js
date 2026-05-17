const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const brands = [
  { name:'挞柠柠檬茶',industry:'茶饮',slug:'taning-lemon-tea',franchiseFee:'15-25万',totalCost:'30-50万',storesChina:480,storesOverseas:20,advantage:'手打柠檬茶开创者',highlights:'自建柠檬种植基地，每日新鲜配送；核心团队源自潮汕茶饮世家，5年深耕华南市场，连锁体系成熟。',description:'挞柠（Taning）专注手打柠檬茶，以广东潮汕为核心，覆盖全国500+门店，主打真柠檬+好茶叶。' },
  { name:'霸王茶姬',industry:'茶饮',slug:'bawang-cha-ji',franchiseFee:'30-50万',totalCost:'60-100万',storesChina:3800,storesOverseas:200,advantage:'中国茶饮出海标杆',highlights:'全球4000+门店覆盖多个国家和地区；自研茶叶供应链，云南勐海自有茶园，从源头把控品质。',description:'霸王茶姬，以原叶鲜奶茶为核心，已在全球开设4000+门店，中国茶饮出海的标杆品牌。' },
  { name:'瑞幸咖啡',industry:'咖啡',slug:'luckin-coffee',franchiseFee:'30-50万',totalCost:'50-100万',storesChina:17500,storesOverseas:500,advantage:'数字化运营领先',highlights:'APP私域用户超1.5亿；全套数字化选址、培训、运营系统；供应链成本优势明显。',description:'Luckin Coffee瑞幸咖啡，以数字化运营和超高性价比著称，全国18000+门店。' },
  { name:'杨国福麻辣烫',industry:'小吃',slug:'yang-guofu-mala',franchiseFee:'10-20万',totalCost:'15-35万',storesChina:5800,storesOverseas:200,advantage:'国民麻辣烫第一品牌',highlights:'四川麻辣烫配方授权；自建中央厨房，标准化配送；加盟商培训体系完善，开业无忧。',description:'杨国福麻辣烫，国民麻辣烫品牌，以自选食材和丰富口味著称。' },
  { name:'西树泡芙',industry:'甜品',slug:'cizh-puff',franchiseFee:'10-20万',totalCost:'15-35万',storesChina:450,storesOverseas:50,advantage:'法式手工泡芙专家',highlights:'法式工艺传承，现烤现卖；原料进口奶油，品质稳定；门店投资小，回报快，适合创业。',description:'西树泡芙，主打法式手工泡芙，新鲜现烤，深受年轻人喜爱。' },
  { name:'五条人糖水铺',industry:'糖水',slug:'wutiaoren-tangshui',franchiseFee:'10-20万',totalCost:'15-30万',storesChina:280,storesOverseas:20,advantage:'广式糖水高性价比',highlights:'广式传统糖水配方，低糖健康；SKU精简标准化，出餐快；店铺面积灵活，30㎡即可开业。',description:'五条人糖水铺，主打广式糖水，以高性价比和多样化产品著称。' },
];

async function main() {
  for (const b of brands) {
    const catMap = {'茶饮':'chayin','咖啡':'kafei','甜品':'tianpin','糖水':'tangshui','小吃':'xiaochi'};
    await prisma.brand.upsert({
      where: { slug: b.slug },
      create: {
        ...b,
        categorySlug: catMap[b.industry] || 'xiaochi',
        process: '[]',
        support: '[]',
        images: '[]',
        status: 'published',
        publishedAt: new Date(),
      },
      update: {
        storesChina: b.storesChina,
        storesOverseas: b.storesOverseas,
        advantage: b.advantage,
        highlights: b.highlights,
      },
    });
  }
  console.log('done - ' + brands.length + ' brands updated');
}

main().finally(() => prisma.$disconnect());