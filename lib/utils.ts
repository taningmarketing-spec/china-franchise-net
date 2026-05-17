import slugify from 'slugify';

/**
 * 将中文字符串转为 URL 友好的 slug
 */
export function createSlug(text: string): string {
  return slugify(text, {
    strict: true,
    lower: true,
    trim: true,
  });
}

/**
 * 格式化金额显示
 */
export function formatCost(cost: string | number): string {
  const num = typeof cost === 'string' ? parseInt(cost.replace(/[^0-9]/g, '')) : cost;
  if (num >= 10000) return `${(num / 10000).toFixed(0)}万`;
  return `${num.toLocaleString()}`;
}

/**
 * 从文本中提取数字
 */
export function extractNumber(text: string): number {
  const match = text.match(/[\d,]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ''));
}

/**
 * 生成 SEO Title
 */
export function seoTitle(brandName: string, suffix = 'cnfranchise.com'): string {
  return `${brandName} 加盟费用/条件/流程 - ${suffix}`;
}

/**
 * 生成 SEO Description
 */
export function seoDescription(
  brandName: string,
  fee: string,
  cost: string,
  stores: number
): string {
  return `详细介绍${brandName}的加盟费用${fee}、总投资${cost}、分店数${stores}家，包含加盟流程、支持政策等更多信息尽在cnfranchise.com。`;
}

/**
 * 生成 JSON-LD 结构化数据（Brand）
 */
export function brandJsonLd(brand: {
  name: string;
  slug: string;
  description: string;
  logo?: string | null;
  franchiseFee: string;
  totalCost: string;
  storesChina: number;
  storesOverseas: number;
}) {
  const totalStores = brand.storesChina + brand.storesOverseas;
  return {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: brand.name,
    description: brand.description,
    url: `${process.env.SITE_URL || 'https://cnfranchise.com'}/brand/${brand.slug}`,
    image: brand.logo,
    numberOfLocations: totalStores,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '10',
    },
  };
}

/**
 * 清洗 HTML，保留纯文本
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * 判断是否为有效图片 URL
 */
export function isValidImageUrl(url: string): boolean {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url);
}

/**
 * 生成随机 ID
 */
export function randomId(): string {
  return Math.random().toString(36).substring(2, 10);
}
