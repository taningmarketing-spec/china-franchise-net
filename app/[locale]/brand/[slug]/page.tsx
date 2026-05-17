import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { getLocaleParams } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import InquiryForm from '@/components/front/InquiryForm';
import BrandGallery from '@/components/front/BrandGallery';
import BrandCTA from '@/components/front/BrandCTA';
import type { Metadata } from 'next';

const prisma = new PrismaClient();
const baseUrl = process.env.SITE_URL || 'https://www.cnfranchise.com';

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const brand = await prisma.brand.findUnique({ where: { slug: params.slug } });
  if (!brand) return { title: 'Not Found' };
  
  const locale = (params.locale || 'zh') as Locale;
  const i18n = translations[locale];
  const category = await prisma.category.findUnique({ where: { slug: brand.categorySlug } });
  const categoryName = category?.name || brand.industry;
  
  const title = `${brand.name}${categoryName ? ` - ${categoryName}` : ''} ${i18n.brand.franchiseFeeLabel || ''} ${brand.franchiseFee}`;
  const description = `${brand.name}: ${brand.description?.slice(0, 160) || `${i18n.brand.franchiseFee}${brand.franchiseFee}，${i18n.brand.storesChinaLabel || ''}${brand.storesChina}${i18n.brand.storesUnit || ''}`}`;
  const ogImage = brand.banner || brand.logo || `${baseUrl}/og-image.jpg`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/brand/${brand.slug}`,
      siteName: 'cnfranchise.com',
      images: [{ url: ogImage, width: 1200, height: 630, alt: brand.name }],
      locale: locale === 'zh' ? 'zh_CN' : locale === 'en' ? 'en_US' : locale === 'th' ? 'th_TH' : 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/brand/${brand.slug}`,
      languages: {
        'zh-CN': `${baseUrl}/zh/brand/${brand.slug}`,
        'en-US': `${baseUrl}/en/brand/${brand.slug}`,
        'th-TH': `${baseUrl}/th/brand/${brand.slug}`,
        'vi-VN': `${baseUrl}/vi/brand/${brand.slug}`,
      },
    },
  };
}

// Generate structured data for brand page
function generateBrandJsonLd(brand: any, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: brand.name,
    description: brand.description || '',
    url: `${baseUrl}/${locale}/brand/${brand.slug}`,
    logo: brand.logo || '',
    image: brand.banner || brand.logo || '',
    ...(brand.franchiseFee && { priceRange: brand.franchiseFee }),
    ...(categoryName => {
      const cat = brand.categorySlug;
      const industryMap: Record<string, string> = {
        chayin: 'FoodAndBeverages', kafei: 'CafeOrCoffeeShop',
        xiaochi: 'FoodEstablishment', tianpin: 'DessertShop',
        tangshui: 'FoodEstablishment', catering: 'Restaurant',
      };
      return { '@type': (industryMap[cat] || 'FoodAndBeverages') as any };
    })(),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-13802429520',
      contactType: 'sales',
      availableLanguage: ['Chinese', 'English', 'Thai', 'Vietnamese'],
    },
    sameAs: [],
  };
}

const INDUSTRY_COLORS: Record<string, string> = {
  '茶饮': 'bg-emerald-100 text-emerald-700', '咖啡': 'bg-violet-100 text-violet-700',
  '小吃': 'bg-orange-100 text-orange-700', '甜品': 'bg-pink-100 text-pink-700',
  '糖水': 'bg-amber-100 text-amber-700', '餐饮': 'bg-red-100 text-red-700',
};

export default async function BrandPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = getLocaleParams({ params });
  const brand = await prisma.brand.findUnique({ where: { slug: params.slug } });
  if (!brand) notFound();

  await prisma.brand.update({ where: { id: brand.id }, data: { viewCount: { increment: 1 } } });

  // 获取真实分类信息
  const category = await prisma.category.findUnique({ where: { slug: brand.categorySlug } });
  const categoryName = category?.name || brand.industry;
  const categoryColor = category?.color || '#64748b';

  // 动态行业标签颜色
  const tagBgHex = categoryColor + '20';
  const tagTextHex = categoryColor;
  const tagClass = category ? '' : (INDUSTRY_COLORS[brand.industry] || 'bg-slate-100 text-slate-600');
  const tagStyle = category ? { backgroundColor: tagBgHex, color: tagTextHex } : {};

  // i18n
  const i18n = translations[locale];
  const b = i18n.brand;

  // 品牌资料图片
  let brandImages: string[] = [];
  try { brandImages = JSON.parse(brand.images || '[]'); } catch {}
  let processSteps: Array<{ step: number; title: string; desc: string }> = [];
  let support: string[] = [];
  try { processSteps = JSON.parse(brand.process || '[]'); } catch {}
  try { support = JSON.parse(brand.support || '[]'); } catch {}

  const relatedBrands = await prisma.brand.findMany({
    where: { status: 'published', categorySlug: brand.categorySlug, NOT: { id: brand.id } },
    take: 4,
  });

  // JSON-LD structured data
  const jsonLd = generateBrandJsonLd(brand, locale);

  return (
    <div className="page-enter">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 面包屑 + BreadcrumbList JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: b.home, item: `${baseUrl}/${locale}/` },
            { '@type': 'ListItem', position: 2, name: categoryName, item: `${baseUrl}/${locale}/category/${brand.categorySlug}` },
            { '@type': 'ListItem', position: 3, name: brand.name, item: `${baseUrl}/${locale}/brand/${brand.slug}` },
          ],
        }),
      }} />

      {/* 面包屑 */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href={`/${locale}/`} className="hover:text-primary">{b.home}</Link>
            <span>/</span>
            <Link href={`/${locale}/category/${brand.categorySlug}`} className="hover:text-primary">{categoryName}</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">{brand.name}</span>
          </nav>
        </div>
      </div>

      {/* 品牌头部区域 - 左侧Logo/主图 + 右侧信息 */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* 左侧 - 品牌主图/Logo */}
            <div className="w-full md:w-72 shrink-0">
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                {brand.banner ? (
                  <img src={brand.banner} alt={`${brand.name} ${categoryName} brand banner`} className="w-full aspect-square object-cover" />
                ) : brand.logo ? (
                  <img src={brand.logo} alt={`${brand.name} logo`} className="w-full aspect-square object-contain p-8 bg-slate-50" />
                ) : (
                  <div className="w-full aspect-square bg-slate-50 flex items-center justify-center text-6xl">
                    {category?.icon || b.categoryIcon}
                  </div>
                )}
              </div>
            </div>

            {/* 右侧 - 品牌信息 */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{brand.name}</h1>
                <span className={`tag-pill ${category ? '' : tagClass}`} style={category ? tagStyle : {}}>{categoryName}</span>
              </div>

              {/* 4个数据卡 */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { l: b.franchiseFee, v: brand.franchiseFee, c: 'text-blue-600' },
                  { l: b.storesChina, v: brand.storesChina > 0 ? `${brand.storesChina.toLocaleString()}${b.storesUnit}` : '-', c: 'text-blue-600 font-bold' },
                  { l: b.storesOverseas, v: brand.storesOverseas > 0 ? `${brand.storesOverseas.toLocaleString()}${b.storesUnit}` : '-', c: 'text-emerald-600 font-bold' },
                  { l: b.industry, v: categoryName, c: 'text-slate-800' },
                ].map(item => (
                  <div key={item.l} className="bg-slate-50 rounded-xl p-3.5 text-center">
                    <div className="text-xs text-slate-400 mb-1">{item.l}</div>
                    <div className={`font-bold text-base ${item.c}`}>{item.v}</div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-5">{brand.description}</p>

              <div className="flex flex-wrap gap-3">
                <BrandCTA brandName={brand.name} locale={locale} />
                <Link href={`/${locale}/category/${brand.categorySlug}`} className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-all inline-flex items-center">{b.backToList}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* 品牌资料模块 */}
            {(brand.brandStory || brand.videoUrl || brand.brandFeatures || brandImages.length > 0) && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-5">🏷️ {b.brandMaterials}</h2>
                {brand.videoUrl && (
                  <div className="mb-5">
                    <div className="text-xs font-semibold text-slate-500 mb-2">{b.brandVideo}</div>
                    <div className="rounded-xl overflow-hidden aspect-video max-w-2xl border border-slate-100">
                      <iframe
                        src={brand.videoUrl.includes('youtube') ? brand.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/') : brand.videoUrl}
                        className="w-full h-full" allowFullScreen title={`${brand.name} brand video`} loading="lazy"
                      />
                    </div>
                  </div>
                )}
                {brand.brandStory && (
                  <div className="mb-5 p-5 bg-amber-50 border border-amber-100 rounded-xl">
                    <div className="text-xs font-semibold text-amber-500 mb-2">{b.brandStoryTitle || b.brandStory}</div>
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{brand.brandStory}</p>
                  </div>
                )}
                {brandImages.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-slate-500 mb-3">{b.brandGalleryLabel}</div>
                    <div className="grid grid-cols-3 gap-3">
                      {brandImages.map((img, i) => (
                        <a key={i} href={img} target="_blank" rel="noopener noreferrer" className="aspect-video rounded-lg overflow-hidden bg-slate-100 hover:opacity-80 transition-opacity">
                          <img src={img} alt={`${brand.name} photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {brand.brandFeatures && (
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="text-xs font-semibold text-slate-500 mb-2">{b.brandFeaturesLabel || b.brandFeatures}</div>
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{brand.brandFeatures}</p>
                  </div>
                )}
              </div>
            )}
            {/* 加盟流程 */}
            {processSteps.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6">{b.processTitle}</h2>
                <div className="space-y-0">{processSteps.map((item, i) => (
                  <div key={i} className="step-item py-3"><div className="step-dot">{item.step}</div><div><h4 className="font-semibold text-slate-800 text-sm">{item.title}</h4><p className="text-slate-500 text-xs mt-0.5">{item.desc}</p></div></div>
                ))}</div>
              </div>
            )}
            {/* 品牌支持 */}
            {support.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-5">{b.supportTitle}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {support.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span className="text-sm text-slate-700">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <BrandGallery brand={brand} />
          </div>
          <div className="space-y-6">
            <div id="inquiry"><InquiryForm brandId={brand.id} brandName={brand.name} locale={locale} /></div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-800 mb-4">{b.basicInfo}</h3>
              <div className="space-y-3">
                {[[b.source, brand.scrapedFrom || b.official], [b.storesChina, brand.storesChina > 0 ? `${brand.storesChina}${b.storesUnit}` : '-'], [b.storesOverseas, brand.storesOverseas > 0 ? `${brand.storesOverseas}${b.storesUnit}` : '-'], [b.highlights, brand.highlights || b.none], [b.viewCount, `${brand.viewCount}`]].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-400">{label}</span><span className="text-sm font-medium text-slate-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {relatedBrands.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-800 mb-5">{b.relatedBrands}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedBrands.map(rb => (
                <Link key={rb.id} href={`/${locale}/brand/${rb.slug}`} className="brand-card bg-white rounded-xl border border-slate-100 overflow-hidden p-3">
                  <div className="h-20 bg-slate-50 rounded-lg mb-2 flex items-center justify-center text-3xl">{b.categoryIcon}</div>
                  <div className="font-semibold text-sm text-slate-800 mb-1 truncate">{rb.name}</div>
                  <div className="text-xs text-slate-400">{rb.franchiseFee}{b.feeSuffix}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
