const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', '[locale]', 'brands', 'page.tsx');

const content = `import { PrismaClient } from '@prisma/client';
import { getLocaleParams, getPageTitle } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import BrandCard from '@/components/front/BrandCard';
import BrandsPageClient from './BrandsPageClient';
import type { Metadata } from 'next';

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  return { title: getPageTitle(locale, 'brands') };
}

export default async function BrandsPage({ params, searchParams }: { params: { locale: string }; searchParams: { category?: string; q?: string; page?: string } }) {
  const locale = getLocaleParams({ params });
  const t = translations[locale];
  const page = parseInt(searchParams.page || '1');
  const pageSize = 12;
  const categorySlug = searchParams.category || '';
  const searchQuery = searchParams.q || '';

  // 获取所有分类
  const categories = await prisma.category.findMany({
    orderBy: { sort: 'asc' },
  });

  // 构建查询条件
  const where: any = { status: 'published' };
  if (categorySlug) where.categorySlug = categorySlug;
  if (searchQuery) {
    where.OR = [
      { name: { contains: searchQuery } },
      { industry: { contains: searchQuery } },
      { advantage: { contains: searchQuery } },
    ];
  }

  // 获取品牌和总数
  const [brands, total] = await Promise.all([
    prisma.brand.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.brand.count({ where }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  // 分类品牌计数
  const categoryCounts = await prisma.brand.groupBy({
    by: ['categorySlug'],
    where: { status: 'published' },
    _count: true,
  });
  const countMap = Object.fromEntries(categoryCounts.map(c => [c.categorySlug, c._count]));

  // 页面标题
  const titles: Record<string, string> = {
    zh: '\u54c1\u724c\u5217\u8868',
    en: 'All Brands',
    th: '\u0e23\u0e32\u0e22\u0e01\u0e32\u0e23\u0e41\u0e1a\u0e23\u0e19\u0e14\u0e4c\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14',
    vi: 'T\u1ea5t c\u1ea3 th\u01b0\u01a1ng hi\u1ec7u',
  };
  const subtitles: Record<string, string> = {
    zh: '\u6d4f\u89c8\u6240\u6709\u52a0\u76df\u54c1\u724c\uff0c\u627e\u5230\u6700\u9002\u5408\u60a8\u7684\u521b\u4e1a\u9879\u76ee',
    en: 'Browse all franchise brands and find your ideal business',
    th: '\u0e14\u0e39\u0e41\u0e1a\u0e23\u0e19\u0e14\u0e4c\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14\u0e41\u0e25\u0e30\u0e2b\u0e32\u0e18\u0e38\u0e23\u0e01\u0e34\u0e08\u0e17\u0e35\u0e48\u0e40\u0e2b\u0e21\u0e32\u0e30\u0e2a\u0e21\u0e01\u0e31\u0e1a\u0e04\u0e38\u0e13',
    vi: 'Duy\u1ec7t t\u1ea5t c\u1ea3 th\u01b0\u01a1ng hi\u1ec7u v\u00e0 t\u00ecm d\u1ef1 \u00e1n ph\u00f9 h\u1ee3p v\u1edbi b\u1ea1n',
  };
  const emptyMsgs: Record<string, string> = {
    zh: '\u6682\u65e0\u7b26\u5408\u6761\u4ef6\u7684\u54c1\u724c',
    en: 'No brands match your criteria',
    th: '\u0e44\u0e21\u0e48\u0e21\u0e35\u0e41\u0e1a\u0e23\u0e19\u0e14\u0e4c\u0e17\u0e35\u0e48\u0e15\u0e23\u0e07\u0e01\u0e31\u0e1a\u0e40\u0e07\u0e37\u0e48\u0e2d\u0e19\u0e44\u0e02',
    vi: 'Kh\u00f4ng c\u00f3 th\u01b0\u01a1ng hi\u1ec7u ph\u00f9 h\u1ee3p',
  };
  const allLabels: Record<string, string> = {
    zh: '\u5168\u90e8\u54c1\u724c',
    en: 'All Brands',
    th: '\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14',
    vi: 'T\u1ea5t c\u1ea3',
  };
  const resultLabels: Record<string, string> = {
    zh: '\u4e2a\u7ed3\u679c',
    en: 'results',
    th: '\u0e1c\u0e25\u0e25\u0e31\u0e1e\u0e18\u0e4c',
    vi: 'k\u1ebft qu\u1ea3',
  };

  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{titles[locale] || titles.zh}</h1>
          <p className="text-slate-500">{subtitles[locale] || subtitles.zh}</p>
          {total > 0 && (
            <p className="mt-2 text-sm text-slate-400">
              {total} {resultLabels[locale] || resultLabels.zh}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 分类标签 */}
        <div className="flex flex-wrap gap-2 mb-8">
          <a
            href={\`/\${locale}/brands\${searchQuery ? '?q=' + encodeURIComponent(searchQuery) : ''}\`}
            className={\`px-4 py-2 rounded-full text-sm font-medium transition-all \${
              !categorySlug
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }\`}
          >
            {allLabels[locale] || allLabels.zh}
          </a>
          {categories.map(cat => (
            <a
              key={cat.slug}
              href={\`/\${locale}/brands?category=\${cat.slug}\${searchQuery ? '&q=' + encodeURIComponent(searchQuery) : ''}\`}
              className={\`px-4 py-2 rounded-full text-sm font-medium transition-all \${
                categorySlug === cat.slug
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }\`}
            >
              {cat.icon} {cat.name}
              <span className="ml-1 text-xs opacity-70">({countMap[cat.slug] || 0})</span>
            </a>
          ))}
        </div>

        {/* 品牌网格 */}
        {brands.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {brands.map(brand => (
              <BrandCard key={brand.id} brand={brand} locale={locale as any} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <div className="text-5xl mb-4">\u{1F50D}</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">{emptyMsgs[locale] || emptyMsgs.zh}</h3>
            <a href={\`/\${locale}/brands\`} className="text-primary hover:underline text-sm">
              {locale === 'zh' ? '\u6e05\u9664\u7b5b\u9009' : locale === 'en' ? 'Clear filters' : locale === 'th' ? '\u0e25\u0e49\u0e32\u0e07\u0e15\u0e31\u0e27\u0e01\u0e23\u0e2d\u0e07' : 'X\u00f3a b\u1ed9 l\u1ecdc'}
            </a>
          </div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {page > 1 && (
              <a
                href={\`/\${locale}/brands?page=\${page - 1}\${categorySlug ? '&category=' + categorySlug : ''}\${searchQuery ? '&q=' + encodeURIComponent(searchQuery) : ''}\`}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 hover:border-primary hover:text-primary transition-all"
              >
                {\u2190} {locale === 'zh' ? '\u4e0a\u4e00\u9875' : 'Prev'}
              </a>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .map((p, idx, arr) => {
                const showEllipsis = idx > 0 && p - arr[idx - 1] > 1;
                return (
                  <span key={p} className="flex items-center gap-2">
                    {showEllipsis && <span className="text-slate-400">...</span>}
                    <a
                      href={\`/\${locale}/brands?page=\${p}\${categorySlug ? '&category=' + categorySlug : ''}\${searchQuery ? '&q=' + encodeURIComponent(searchQuery) : ''}\`}
                      className={\`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all \${
                        p === page
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                      }\`}
                    >
                      {p}
                    </a>
                  </span>
                );
              })}

            {page < totalPages && (
              <a
                href={\`/\${locale}/brands?page=\${page + 1}\${categorySlug ? '&category=' + categorySlug : ''}\${searchQuery ? '&q=' + encodeURIComponent(searchQuery) : ''}\`}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 hover:border-primary hover:text-primary transition-all"
              >
                {locale === 'zh' ? '\u4e0b\u4e00\u9875' : 'Next'} {\u2192}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(filePath, content, 'utf8');
console.log('Written:', filePath, '- Size:', fs.statSync(filePath).size, 'bytes');
