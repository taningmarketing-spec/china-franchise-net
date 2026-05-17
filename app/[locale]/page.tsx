import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { getLocaleParams, getPageTitle } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import BrandCard from '@/components/front/BrandCard';
import BrandShowcase from '@/components/front/BrandShowcase';
import CategoryBrands from '@/components/front/CategoryBrands';
import NewsSection from '@/components/front/NewsSection';
import type { Metadata } from 'next';

// Force dynamic rendering to ensure fresh data on each request
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();
const baseUrl = process.env.SITE_URL || 'https://www.cnfranchise.com';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  const t = translations[locale];
  
  return {
    title: getPageTitle(locale, 'home'),
    description: t.home.seoDescription || (locale === 'zh' 
      ? 'cnfranchise.com - 中国领先的餐饮茶饮咖啡加盟品牌搜索平台。收录100+知名品牌，覆盖茶饮、咖啡、小吃、甜品、糖水等行业，提供加盟费、条件、流程等详细信息，助您找到最适合的创业项目。'
      : locale === 'en'
      ? 'cnfranchise.com - Leading China F&B franchise search platform. 100+ brands across tea, coffee, snack, dessert industries. Detailed franchise fees, requirements and processes to help you find the perfect business opportunity.'
      : `cnfranchise.com - ${t.home.subtitle?.replace(/<[^>]+>/g, '').slice(0, 160) || ''}`
    ),
    openGraph: {
      type: 'website',
      url: `${baseUrl}/${locale}`,
      title: getPageTitle(locale, 'home'),
      description: t.home.seoDescription || '',
      images: [{ url: `${baseUrl}/og-default.jpg`, width: 1200, height: 630, alt: 'cnfranchise.com' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: getPageTitle(locale, 'home'),
      images: [`${baseUrl}/og-default.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
    },
  };
}

export default async function LocaleHomePage({ params }: { params: { locale: string } }) {
  const locale = getLocaleParams({ params });
  const t = translations[locale];

  // 从数据库动态加载分类
  const dbCategories = await prisma.category.findMany({
    orderBy: { sort: 'asc' },
  });

  // 获取每个分类的品牌数
  const brandCounts = await prisma.brand.groupBy({
    by: ['categorySlug'],
    where: { status: 'published' },
    _count: true,
  });
  const countMap = Object.fromEntries(brandCounts.map(c => [c.categorySlug, c._count]));

  // 获取热门品牌（首页展示用）
  const hotBrands = await prisma.brand.findMany({
    where: { status: 'published', isHot: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  // 获取所有品牌（按分类分组）
  const allBrands = await prisma.brand.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
  });

  // 构建分类+品牌数据结构
  const categoriesWithBrands = dbCategories.map(cat => ({
    category: cat,
    brands: allBrands.filter(b => b.categorySlug === cat.slug).slice(0, 4),
  }));

  const BUDGET_LINKS = locale === 'zh'
    ? [{ label: '5万以下', query: '?maxCost=50000' }, { label: '10万以下', query: '?maxCost=100000' }, { label: '20万以下', query: '?maxCost=200000' }, { label: '50万以下', query: '?maxCost=500000' }, { label: '50万以上', query: '?minCost=500000' }]
    : locale === 'en'
    ? [{ label: '< 50K CNY', query: '?maxCost=50000' }, { label: '< 100K CNY', query: '?maxCost=100000' }, { label: '< 200K CNY', query: '?maxCost=200000' }, { label: '< 500K CNY', query: '?maxCost=500000' }, { label: '> 500K CNY', query: '?minCost=500000' }]
    : locale === 'th'
    ? [{ label: 'น้อยกว่า 5หมื่น', query: '?maxCost=50000' }, { label: 'น้อยกว่า 10หมื่น', query: '?maxCost=100000' }, { label: 'น้อยกว่า 20หมื่น', query: '?maxCost=200000' }, { label: 'น้อยกว่า 50หมื่น', query: '?maxCost=500000' }, { label: 'มากกว่า 50หมื่น', query: '?minCost=500000' }]
    : [{ label: '< 50K NDT', query: '?maxCost=50000' }, { label: '< 100K NDT', query: '?maxCost=100000' }, { label: '< 200K NDT', query: '?maxCost=200000' }, { label: '< 500K NDT', query: '?maxCost=500000' }, { label: '> 500K NDT', query: '?minCost=500000' }];

  return (
    <div className="page-enter">
      {/* Hero 区域 */}
      <section className="gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            {t.home.title}
          </h1>
          <p className="text-base md:text-lg text-blue-100 mb-8 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t.home.subtitle.replace('<br />', '<br class="hidden md:block" />') }} />

          <form action={`/${locale}/search`} method="get" className="max-w-2xl mx-auto flex gap-2">
            <input type="text" name="q" placeholder={t.home.searchPlaceholder} className="flex-1 px-5 py-3.5 rounded-xl text-slate-800 text-base shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30" aria-label={t.home.searchPlaceholder} />
            <button type="submit" className="gradient-accent text-white px-8 py-3.5 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
              {t.home.searchButton}
            </button>
          </form>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="text-blue-200 text-sm mr-1">{t.home.quickFilter}</span>
            {BUDGET_LINKS.map(link => (
              <Link key={link.label} href={`/${locale}/search${link.query}`} className="px-3 py-1 bg-white/15 hover:bg-white/25 rounded-full text-sm transition-all backdrop-blur-sm">{link.label}</Link>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="text-center"><div className="text-2xl md:text-3xl font-bold">100+</div><div className="text-blue-200 text-xs md:text-sm">{t.home.stats.brands}</div></div>
            <div className="text-center border-x border-white/20"><div className="text-2xl md:text-3xl font-bold">8</div><div className="text-blue-200 text-xs md:text-sm">{t.home.stats.industries}</div></div>
            <div className="text-center"><div className="text-2xl md:text-3xl font-bold">{t.home.stats.daily}</div><div className="text-blue-200 text-xs md:text-sm">{t.home.stats.dailyLabel || t.home.stats.daily}</div></div>
          </div>
        </div>
      </section>

      {/* 分类快捷入口 */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">{t.home.categories}</h2>
          <Link href={`/${locale}/brands`} className="text-sm text-primary font-medium hover:underline">{t.home.viewAll}</Link>
        </div>
        <nav aria-label="Brand categories">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {dbCategories.map(cat => (
              <Link key={cat.slug} href={`/${locale}/category/${cat.slug}`} className="group flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-card transition-all">
                <div className="cat-icon mb-2 group-hover:scale-110 transition-transform" style={{ background: `${cat.color || '#1a56db'}18` }}><span>{cat.icon || '📁'}</span></div>
                <span className="font-semibold text-sm text-slate-800 mb-0.5">{cat.name}</span>
                <span className="text-[11px] text-slate-400 leading-tight">{cat.desc || ''}</span>
              </Link>
            ))}
          </div>
        </nav>
      </section>

      {/* 最新加入品牌 */}
      <BrandShowcase locale={locale as any} brands={hotBrands} />

      {/* 各分类品牌推荐 */}
      <CategoryBrands locale={locale as any} categoriesWithBrands={categoriesWithBrands} />

      {/* 最新资讯 */}
      <NewsSection locale={locale} />

      {/* 为什么选择我们 */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-10">{t.home.whyChooseUs}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Object.entries(t.home.features as Record<string, {title: string; desc: string}>) as [string, {title: string; desc: string}][]).map(([key, feat]) => (
              <div key={key} className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="text-4xl mb-3">{key === 'reliable' ? '🔍' : key === 'dailyUpdate' ? '📅' : key === 'transparent' ? '💰' : '📱'}</div>
                <h3 className="font-bold text-slate-800 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced JSON-LD for homepage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: locale === 'zh' ? 'cnfranchise.com 中国加盟网' : 'cnfranchise.com China Franchise Net',
          alternateName: 'China Franchise Net',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/${locale}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }),
      }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: locale === 'zh' ? '热门加盟品牌' : 'Hot Franchise Brands',
          description: locale === 'zh' ? '推荐的热门餐饮茶饮加盟品牌' : 'Recommended hot F&B franchise brands',
          numberOfItems: hotBrands.length,
          itemListElement: hotBrands.map((brand, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${baseUrl}/${locale}/brand/${brand.slug}`,
            name: brand.name,
            image: brand.banner || brand.logo,
          })),
        }),
      }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t.nav.home || 'Home', item: `${baseUrl}/${locale}/` },
          ],
        }),
      }} />
    </div>
  );
}
