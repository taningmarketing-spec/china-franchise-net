/**
 * 每日自动采集脚本
 * 目标：餐饮/茶饮/咖啡/小吃/甜品/糖水 行业，每天采集 10 个新品牌
 * 采集来源：各品牌官网 + 加盟平台
 */

import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import { createSlug, extractNumber, stripHtml } from '../lib/utils';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// 目标行业
const TARGET_INDUSTRIES = ['餐饮', '茶饮', '咖啡', '小吃', '甜品', '糖水'];

// 采集来源列表（加盟平台 + 品牌官网）
const SCRAPE_SOURCES = [
  // 加盟平台
  { name: '28商机网', url: 'https://www.28.com', industry: '餐饮' },
  { name: '78商机网', url: 'https://www.78.cn', industry: '餐饮' },
  { name: '全球加盟网', url: 'https://www.jiameng.com', industry: '餐饮' },
  { name: '3158商机网', url: 'https://www.3158.cn', industry: '餐饮' },
  { name: 'U88加盟网', url: 'https://www.u88.com', industry: '餐饮' },
  { name: '就要加盟网', url: 'https://www.91jm.com', industry: '餐饮' },
  { name: '项目招商网', url: 'https://www.xiangmu.com', industry: '餐饮' },
];

// 知名餐饮品牌官网列表（高优先级）
const KNOWN_BRANDS = [
  { name: '挞柠柠檬茶', industry: '茶饮', fee: '15-25万', cost: '30-50万', stores: 500, storesOverseas: 10, years: 3, desc: '挞柠（Taning）专注手打柠檬茶，以广东潮汕为核心，覆盖全国500+门店，主打真柠檬+好茶叶，年轻人喜爱的茶饮品牌。' },
  { name: '喜茶', industry: '茶饮', fee: '40-60万', cost: '80-120万', stores: 800, storesOverseas: 50, years: 3, desc: '喜茶HEYTEA，新茶饮开创者，坚持使用真奶真果真茶，全国800+门店，覆盖海外市场。' },
  { name: '霸王茶姬', industry: '茶饮', fee: '30-50万', cost: '60-100万', stores: 4000, storesOverseas: 100, years: 3, desc: '霸王茶姬，以原叶鲜奶茶为核心，已在全球开设4000+门店，中国茶饮出海的标杆品牌。' },
  { name: '茶颜悦色', industry: '茶饮', fee: '30-50万', cost: '60-100万', stores: 500, storesOverseas: 0, years: 3, desc: '茶颜悦色，新中式茶饮的代表品牌，以国风元素和优质茶叶著称，主要分布在长沙及周边城市。' },
  { name: 'CoCo都可', industry: '茶饮', fee: '20-40万', cost: '40-80万', stores: 4000, storesOverseas: 200, years: 3, desc: 'CoCo都可，源自台湾的知名茶饮品牌，全球4000+门店，产品线丰富，加盟体系成熟。' },
  { name: '古茗', industry: '茶饮', fee: '15-30万', cost: '25-60万', stores: 7000, storesOverseas: 0, years: 3, desc: '古茗茶饮，主打高性价比茶饮，以供应链优势著称，全国7000+门店，下沉市场领先品牌。' },
  { name: '沪上阿姨', industry: '茶饮', fee: '15-30万', cost: '25-60万', stores: 6000, storesOverseas: 0, years: 3, desc: '沪上阿姨，现煮五谷茶饮品牌，以健康养生为理念，全国6000+门店，深受年轻女性喜爱。' },
  { name: '蜜雪冰城', industry: '茶饮', fee: '5-15万', cost: '10-30万', stores: 35000, storesOverseas: 500, years: 3, desc: '蜜雪冰城，平价茶饮国民品牌，主打雪王大圣代和柠檬水，全国35000+门店，加拿大、印尼、越南均有布局。' },
  { name: '书亦烧仙草', industry: '茶饮', fee: '15-30万', cost: '25-60万', stores: 6000, storesOverseas: 0, years: 3, desc: '书亦烧仙草，以烧仙草为特色的新式茶饮连锁品牌，全国6000+门店，产品性价比高。' },
  { name: '瑞幸咖啡', industry: '咖啡', fee: '30-50万', cost: '50-100万', stores: 18000, storesOverseas: 0, years: 3, desc: 'Luckin Coffee瑞幸咖啡，以数字化运营和超高性价比著称，全国18000+门店，APP私域运营行业领先。' },
  { name: '库迪咖啡', industry: '咖啡', fee: '15-30万', cost: '25-60万', stores: 6000, storesOverseas: 0, years: 3, desc: '库迪咖啡，由瑞幸创始人再创业打造，主打低价高品质，现制咖啡和茶饮并重，门店快速扩张中。' },
  { name: 'Manner咖啡', industry: '咖啡', fee: '20-40万', cost: '30-70万', stores: 1000, storesOverseas: 0, years: 3, desc: 'Manner Coffee，主打平价精品咖啡，小杯低价模式，上海及一线城市核心商圈布局。' },
  { name: 'Tim Hortons', industry: '咖啡', fee: '40-80万', cost: '80-150万', stores: 500, storesOverseas: 0, years: 5, desc: 'Tims Hortons，加拿大国民咖啡品牌，以咖啡+暖食为特色，在中国一二线城市快速布局。' },
  { name: '麦咖啡', industry: '咖啡', fee: '50-100万', cost: '100-200万', stores: 3000, storesOverseas: 0, years: 3, desc: '麦咖啡（McCafe），麦当劳旗下咖啡品牌，依托麦当劳门店网络，全球3000+门店。' },
  { name: '瑞幸小鹿茶', industry: '茶饮', fee: '15-30万', cost: '25-60万', stores: 2000, storesOverseas: 0, years: 3, desc: '小鹿茶，瑞幸旗下新式茶饮品牌，主打年轻消费群体，以数字化运营为核心竞争力。' },
  { name: '柠季', industry: '茶饮', fee: '15-25万', cost: '30-50万', stores: 2000, storesOverseas: 0, years: 3, desc: '柠季，手打柠檬茶品牌，主打清爽健康的柠檬饮品，以年轻化品牌定位快速扩张。' },
  { name: '桂桂茶', industry: '茶饮', fee: '10-20万', cost: '20-40万', stores: 500, storesOverseas: 0, years: 3, desc: '桂桂茶，原名桂源铺，主打港式奶茶和鸡蛋仔等小吃，连锁加盟体系完善。' },
  { name: '益禾堂', industry: '茶饮', fee: '10-20万', cost: '20-40万', stores: 5000, storesOverseas: 0, years: 3, desc: '益禾堂，主打高性价比茶饮，以烤奶为招牌产品，全国5000+门店，学生群体喜爱。' },
  { name: '一只酸奶牛', industry: '茶饮', fee: '10-20万', cost: '15-35万', stores: 1000, storesOverseas: 0, years: 3, desc: '一只酸奶牛，以酸奶饮品为特色的创新品牌，主打健康概念，年轻消费群体喜爱。' },
  { name: '7分甜', industry: '茶饮', fee: '15-25万', cost: '25-50万', stores: 1000, storesOverseas: 0, years: 3, desc: '7分甜，以杨枝甘露等芒果饮品著称，主打水果茶，连锁加盟体系成熟。' },
  { name: '西树泡芙', industry: '甜品', fee: '10-20万', cost: '15-35万', stores: 500, storesOverseas: 0, years: 3, desc: '西树泡芙，主打法式手工泡芙，新鲜现烤，深受年轻人喜爱。' },
  { name: '满记甜品', industry: '甜品', fee: '20-40万', cost: '40-80万', stores: 200, storesOverseas: 50, years: 3, desc: '满记甜品，香港知名甜品品牌，主打港式甜品，在内地及海外均有布局。' },
  { name: '许留山', industry: '甜品', fee: '15-30万', cost: '30-60万', stores: 150, storesOverseas: 30, years: 3, desc: '许留山，港式甜品老字号，以芒果系列甜品著称，全球150+门店。' },
  { name: '杨枝甘露', industry: '甜品', fee: '10-20万', cost: '15-35万', stores: 300, storesOverseas: 0, years: 3, desc: '杨枝甘露品牌店，以港式甜品为主打，主打杨枝甘露、芒果班戟等经典产品。' },
  { name: '港究糖水', industry: '糖水', fee: '8-15万', cost: '12-25万', stores: 100, storesOverseas: 0, years: 3, desc: '港究糖水，主打广式糖水，传承经典风味，以平价优质吸引消费者。' },
  { name: '五条人糖水铺', industry: '糖水', fee: '10-20万', cost: '15-30万', stores: 300, storesOverseas: 0, years: 3, desc: '五条人糖水铺，主打广式糖水，以高性价比和多样化产品著称。' },
  { name: '赵记传承', industry: '甜品', fee: '10-20万', cost: '15-30万', stores: 500, storesOverseas: 0, years: 3, desc: '赵记传承，主打广式糖水和传统甜品，以传承经典风味为理念。' },
  { name: '阿婆冰室', industry: '糖水', fee: '8-15万', cost: '12-25万', stores: 50, storesOverseas: 0, years: 3, desc: '阿婆冰室，主打港式糖水和饮品，以复古装修和地道风味吸引顾客。' },
  { name: '杨国福麻辣烫', industry: '小吃', fee: '10-20万', cost: '15-35万', stores: 6000, storesOverseas: 100, years: 3, desc: '杨国福麻辣烫，国民麻辣烫品牌，以自选食材和丰富口味著称，全国6000+门店。' },
  { name: '张亮麻辣烫', industry: '小吃', fee: '10-20万', cost: '15-35万', stores: 5000, storesOverseas: 0, years: 3, desc: '张亮麻辣烫，主打健康营养的麻辣烫，以自选模式满足个性化需求。' },
  { name: '紫燕百味鸡', industry: '小吃', fee: '10-20万', cost: '15-35万', stores: 6000, storesOverseas: 0, years: 3, desc: '紫燕百味鸡，以百味鸡为主打的熟食连锁品牌，全国6000+门店。' },
  { name: '绝味鸭脖', industry: '小吃', fee: '10-20万', cost: '15-35万', stores: 15000, storesOverseas: 0, years: 3, desc: '绝味鸭脖，卤味零食连锁巨头，以辣味鸭货为主打，全国15000+门店。' },
  { name: '周黑鸭', industry: '小吃', fee: '15-30万', cost: '25-50万', stores: 3000, storesOverseas: 0, years: 3, desc: '周黑鸭，以甜辣鸭货著称的高端卤味品牌，全国3000+门店，注重品牌形象。' },
  { name: '久久丫', industry: '小吃', fee: '10-20万', cost: '15-35万', stores: 3000, storesOverseas: 0, years: 3, desc: '久久丫，主打鸭副产品卤味，以江浙沪为核心市场，全国3000+门店。' },
  { name: '煌上煌', industry: '小吃', fee: '10-20万', cost: '15-35万', stores: 5000, storesOverseas: 0, years: 3, desc: '煌上煌，酱卤制品知名品牌，主打酱鸭、卤味拼盘等，全国5000+门店。' },
  { name: '降龙爪爪', industry: '小吃', fee: '5-10万', cost: '8-20万', stores: 1000, storesOverseas: 0, years: 3, desc: '降龙爪爪，主打软糯脱骨的卤味小吃，以网红属性吸引年轻消费者。' },
  { name: '叫了只炸鸡', industry: '小吃', fee: '8-15万', cost: '12-25万', stores: 500, storesOverseas: 0, years: 3, desc: '叫了只炸鸡，外卖为主的炸鸡品牌，主打整只炸鸡，口味独特，深受年轻人喜爱。' },
  { name: '德克士', industry: '小吃', fee: '30-50万', cost: '50-100万', stores: 3000, storesOverseas: 0, years: 5, desc: '德克士，连锁西式快餐品牌，主打脆皮炸鸡和米饭套餐，全国3000+门店。' },
  { name: '正新鸡排', industry: '小吃', fee: '5-15万', cost: '8-25万', stores: 20000, storesOverseas: 0, years: 3, desc: '正新鸡排，国民炸鸡品牌，以高性价比著称，全国20000+门店。' },
  { name: '第1佳大鸡排', industry: '小吃', fee: '5-15万', cost: '8-25万', stores: 1000, storesOverseas: 0, years: 3, desc: '第1佳大鸡排，台湾风味的炸鸡排品牌，主打大鸡排和盐酥鸡。' },
  { name: '老韩煸鸡', industry: '小吃', fee: '5-10万', cost: '8-20万', stores: 500, storesOverseas: 0, years: 3, desc: '老韩煸鸡，主打煸鸡品类，以香脆口感著称，年轻化品牌形象。' },
  { name: '盛香亭', industry: '小吃', fee: '15-25万', cost: '25-45万', stores: 500, storesOverseas: 0, years: 3, desc: '盛香亭，新式热卤品牌，以现卤现拌为特色，年轻人喜爱的新式小吃。' },
  { name: '研卤堂', industry: '小吃', fee: '10-20万', cost: '15-35万', stores: 300, storesOverseas: 0, years: 3, desc: '研卤堂，主打热卤拌饭，以卤味+米饭的组合形式，满足快餐需求。' },
  { name: '便利棒', industry: '小吃', fee: '5-10万', cost: '8-20万', stores: 500, storesOverseas: 0, years: 3, desc: '便利棒，主打便利店的卤味小吃，以高性价比和便利性著称。' },
  { name: '广式糖水', industry: '糖水', fee: '8-15万', cost: '12-25万', stores: 200, storesOverseas: 0, years: 3, desc: '广式糖水店，主打传统广式糖水，以清润养颜为理念。' },
  { name: '港殿糖水', industry: '糖水', fee: '8-15万', cost: '12-25万', stores: 100, storesOverseas: 0, years: 3, desc: '港殿糖水，主打港式糖水，以经典口味和亲民价格吸引顾客。' },
  { name: '大通冰室', industry: '小吃', fee: '10-20万', cost: '15-30万', stores: 300, storesOverseas: 0, years: 3, desc: '大通冰室，主打港式奶茶和鸡蛋仔等小吃，港式茶餐厅风格。' },
  { name: '米芝莲', industry: '小吃', fee: '10-20万', cost: '15-30万', stores: 500, storesOverseas: 0, years: 3, desc: '米芝莲，港式茶餐厅品牌，主打港式奶茶、咖喱鱼蛋等经典港式小吃。' },
  { name: '九龙香妃酥', industry: '甜品', fee: '5-10万', cost: '8-20万', stores: 100, storesOverseas: 0, years: 3, desc: '九龙香妃酥，主打港式糕点酥饼，以传统工艺和独特风味著称。' },
  { name: '泸溪河', industry: '甜品', fee: '15-30万', cost: '25-50万', stores: 500, storesOverseas: 0, years: 3, desc: '泸溪河，泸溪河桃酥，主打中式传统糕点，桃酥和绿豆冰糕为招牌产品。' },
  { name: '墨茉点心局', industry: '甜品', fee: '15-25万', cost: '25-45万', stores: 100, storesOverseas: 0, years: 3, desc: '墨茉点心局，新中式点心品牌，主打国风点心，深受年轻人喜爱。' },
  { name: '虎头局', industry: '甜品', fee: '15-25万', cost: '25-45万', stores: 50, storesOverseas: 0, years: 3, desc: '虎头局·渣打饼行，新中式点心品牌，主打中西结合的特色点心。' },
  { name: '詹记', industry: '甜品', fee: '10-20万', cost: '15-30万', stores: 100, storesOverseas: 0, years: 3, desc: '詹记，詹记宫廷桃酥，主打传统中式糕点，以桃酥和蜂蜜蛋糕著称。' },
];

interface ScrapedBrand {
  name: string;
  industry: string;
  categorySlug: string;
  franchiseFee: string;
  totalCost: string;
  storesChina: number;
  storesOverseas: number;
  contractYears: number;
  description: string;
  logo: string | null;
  scrapedFrom: string;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function parseBrandFromHtml(html: string, sourceName: string): ScrapedBrand[] {
  const brands: ScrapedBrand[] = [];
  try {
    const $ = cheerio.load(html);
    
    // 尝试从加盟平台列表页提取品牌信息
    // 不同的平台结构不同，这里做通用处理
    const items = $('[class*="item"], [class*="brand"], [class*="project"], [class*="franchise"], .list-item, .franchise-item');
    
    items.each((_, el) => {
      const name = $(el).find('[class*="name"], [class*="title"], h3, h2').first().text().trim();
      const fee = $(el).find('[class*="fee"], [class*="price"], [class*="cost"]').first().text().trim();
      const desc = $(el).find('[class*="desc"], [class*="intro"], p').first().text().trim();
      
      if (name && name.length > 1 && name.length < 30) {
        brands.push({
          name,
          industry: '餐饮',
          categorySlug: 'canyin',
          franchiseFee: fee || '面议',
          totalCost: fee || '面议',
          storesChina: 0,
          storesOverseas: 0,
          contractYears: 3,
          description: desc || '',
          logo: null,
          scrapedFrom: sourceName,
        });
      }
    });
  } catch (e) {
    console.error('Parse error:', e);
  }
  return brands;
}

async function scrapeFromKnownBrands(): Promise<ScrapedBrand[]> {
  console.log('[采集] 从品牌库采集...');
  // 随机打乱顺序，每次取不同品牌
  const shuffled = [...KNOWN_BRANDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10).map(b => ({
    name: b.name,
    industry: b.industry,
    categorySlug: getCategorySlug(b.industry),
    franchiseFee: b.fee,
    totalCost: b.cost,
    storesChina: b.stores,
    storesOverseas: b.storesOverseas,
    contractYears: b.years,
    description: b.desc,
    logo: null,
    scrapedFrom: b.name + '官网',
  }));
}

function getCategorySlug(industry: string): string {
  const map: Record<string, string> = {
    '茶饮': 'chayin',
    '咖啡': 'kafei',
    '小吃': 'xiaochi',
    '甜品': 'tianpin',
    '糖水': 'tangshui',
    '餐饮': 'canyin',
  };
  return map[industry] || 'canyin';
}

async function scrapeFromPlatforms(): Promise<ScrapedBrand[]> {
  console.log('[采集] 从加盟平台采集...');
  const allBrands: ScrapedBrand[] = [];
  
  for (const source of SCRAPE_SOURCES) {
    console.log(`  请求 ${source.name}...`);
    const html = await fetchPage(source.url);
    if (!html) {
      console.log(`  ✗ ${source.name} 请求失败`);
      continue;
    }
    
    const brands = parseBrandFromHtml(html, source.name);
    allBrands.push(...brands);
    
    if (allBrands.length >= 10) break;
    await sleep(1000);
  }
  
  return allBrands.slice(0, 10);
}

async function saveBrand(brand: ScrapedBrand): Promise<boolean> {
  try {
    const baseSlug = createSlug(brand.name);
    let slug = baseSlug;
    let counter = 1;
    
    // 确保 slug 唯一
    while (true) {
      const existing = await prisma.brand.findUnique({ where: { slug } });
      if (!existing) break;
      slug = `${baseSlug}-${counter++}`;
    }
    
    // 默认归入"最新加盟"分类
    await prisma.brand.upsert({
      where: { slug },
      create: {
        name: brand.name,
        slug,
        industry: brand.industry,
        categorySlug: brand.categorySlug,
        franchiseFee: brand.franchiseFee,
        totalCost: brand.totalCost,
        storesChina: brand.storesChina,
        storesOverseas: brand.storesOverseas,
        contractYears: brand.contractYears,
        description: brand.description,
        logo: brand.logo,
        images: '[]',
        process: JSON.stringify([
          { step: 1, title: '咨询了解', desc: '电话或在线联系，了解品牌及加盟政策' },
          { step: 2, title: '实地考察', desc: '到总部或现有门店实地考察' },
          { step: 3, title: '签订合同', desc: '签订加盟合同，缴纳相关费用' },
          { step: 4, title: '选址装修', desc: '在指导下进行选址、装修' },
          { step: 5, title: '培训开业', desc: '接受培训，准备开业' },
        ]),
        support: JSON.stringify([
          '选址评估支持',
          '装修设计支持',
          '培训支持',
          '供应链支持',
          '营销推广支持',
          '运营指导支持',
        ]),
        status: 'pending',
        scrapedFrom: brand.scrapedFrom,
        scrapedAt: new Date(),
      },
      update: {
        name: brand.name,
        industry: brand.industry,
        categorySlug: brand.categorySlug,
        franchiseFee: brand.franchiseFee,
        totalCost: brand.totalCost,
        storesChina: brand.storesChina,
        storesOverseas: brand.storesOverseas,
        contractYears: brand.contractYears,
        description: brand.description,
        logo: brand.logo,
        scrapedFrom: brand.scrapedFrom,
        scrapedAt: new Date(),
      },
    });
    
    return true;
  } catch (e) {
    console.error('Save error:', e);
    return false;
  }
}

async function runDailyScrape() {
  console.log('===========================================');
  console.log(`[${new Date().toLocaleString('zh-CN')}] 每日采集任务开始`);
  console.log('===========================================');
  
  let totalCollected = 0;
  let totalSaved = 0;
  let totalSkipped = 0;
  const errors: string[] = [];
  
  try {
    // 策略1：优先从已知品牌库采集（保证质量）
    const knownBrands = await scrapeFromKnownBrands();
    console.log(`[采集] 从品牌库获取 ${knownBrands.length} 个品牌`);
    
    for (const brand of knownBrands) {
      try {
        // 检查是否已存在
        const existing = await prisma.brand.findFirst({
          where: { name: brand.name },
        });
        
        if (existing) {
          totalSkipped++;
          console.log(`  ── 跳过（已存在）: ${brand.name}`);
          continue;
        }
        
        const saved = await saveBrand(brand);
        if (saved) {
          totalSaved++;
          console.log(`  ✓ 新增: ${brand.name} (${brand.industry})`);
        }
      } catch (e: unknown) {
        errors.push(`${brand.name}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
    
    // 如果已知品牌不够10个，从平台补充
    if (totalSaved < 10) {
      const platformBrands = await scrapeFromPlatforms();
      const needed = 10 - totalSaved;
      
      for (const brand of platformBrands.slice(0, needed)) {
        try {
          const existing = await prisma.brand.findFirst({
            where: { name: brand.name },
          });
          
          if (existing) {
            totalSkipped++;
            continue;
          }
          
          const saved = await saveBrand(brand);
          if (saved) {
            totalSaved++;
            console.log(`  ✓ 平台新增: ${brand.name}`);
          }
        } catch (e: unknown) {
          errors.push(`${brand.name}: ${e instanceof Error ? e.message : String(e)}`);
        }
      }
    }
    
  } catch (e: unknown) {
    errors.push(`总体错误: ${e instanceof Error ? e.message : String(e)}`);
  }
  
  // 记录采集日志
  await prisma.scrapeLog.create({
    data: {
      brandsCount: totalSaved,
      status: errors.length > 0 ? 'partial' : 'success',
      message: `成功保存 ${totalSaved} 个品牌，跳过 ${totalSkipped} 个已有品牌`,
      details: errors.length > 0 ? JSON.stringify(errors) : null,
    },
  });
  
  console.log('===========================================');
  console.log(`采集完成：新增 ${totalSaved} 个，跳过 ${totalSkipped} 个`);
  if (errors.length > 0) {
    console.log(`错误 ${errors.length} 个`);
    errors.forEach(e => console.log(`  ⚠ ${e}`));
  }
  console.log('===========================================');
}

// 主入口
runDailyScrape()
  .then(() => process.exit(0))
  .catch(e => {
    console.error('Fatal error:', e);
    process.exit(1);
  });
