import { PrismaClient } from '@prisma/client';
import { getLocaleParams, getPageTitle } from '@/lib/locale-utils';
import BrandCard from '@/components/front/BrandCard';
import type { Metadata } from 'next';

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  return { title: getPageTitle(locale, 'brands') };
}

export default async function BrandsPage({ params, searchParams }: { params: { locale: string }; searchParams: { category?: string; q?: string; page?: string } }) {
  const locale = getLocaleParams({ params });
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
    zh: '品牌列表',
    en: 'All Brands',
    th: 'รายการแบรนด์ทั้งหมด',
    vi: 'Tất cả thương hiệu',
  };
  const subtitles: Record<string, string> = {
    zh: '浏览所有加盟品牌，找到最适合您的创业项目',
    en: 'Browse all franchise brands and find your ideal business',
    th: 'ดูแบรนด์ทั้งหมดและหาธุรกิจที่เหมาะสมกับคุณ',
    vi: 'Duyệt tất cả thương hiệu và tìm dự án phù hợp với bạn',
  };
  const emptyMsgs: Record<string, string> = {
    zh: '暂无符合条件的品牌',
    en: 'No brands match your criteria',
    th: 'ไม่มีแบรนด์ที่ตรงกับเงื่อนไข',
    vi: 'Không có thương hiệu phù hợp',
  };
  const allLabels: Record<string, string> = {
    zh: '全部品牌',
    en: 'All Brands',
    th: 'ทั้งหมด',
    vi: 'Tất cả',
  };
  const resultLabels: Record<string, string> = {
    zh: '个结果',
    en: 'results',
    th: 'ผลลัพธ์',
    vi: 'kết quả',
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
            href={`/${locale}/brands${searchQuery ? '?q=' + encodeURIComponent(searchQuery) : ''}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !categorySlug
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {allLabels[locale] || allLabels.zh}
          </a>
          {categories.map(cat => (
            <a
              key={cat.slug}
              href={`/${locale}/brands?category=${cat.slug}${searchQuery ? '&q=' + encodeURIComponent(searchQuery) : ''}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                categorySlug === cat.slug
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
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
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">{emptyMsgs[locale] || emptyMsgs.zh}</h3>
            <a href={`/${locale}/brands`} className="text-primary hover:underline text-sm">
              {locale === 'zh' ? '清除筛选' : locale === 'en' ? 'Clear filters' : locale === 'th' ? 'ล้างตัวกรอง' : 'Xóa bộ lọc'}
            </a>
          </div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {page > 1 && (
              <a
                href={`/${locale}/brands?page=${page - 1}${categorySlug ? '&category=' + categorySlug : ''}${searchQuery ? '&q=' + encodeURIComponent(searchQuery) : ''}`}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 hover:border-primary hover:text-primary transition-all"
              >
                {'←'} {locale === 'zh' ? '上一页' : 'Prev'}
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
                      href={`/${locale}/brands?page=${p}${categorySlug ? '&category=' + categorySlug : ''}${searchQuery ? '&q=' + encodeURIComponent(searchQuery) : ''}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                        p === page
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                      }`}
                    >
                      {p}
                    </a>
                  </span>
                );
              })}

            {page < totalPages && (
              <a
                href={`/${locale}/brands?page=${page + 1}${categorySlug ? '&category=' + categorySlug : ''}${searchQuery ? '&q=' + encodeURIComponent(searchQuery) : ''}`}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 hover:border-primary hover:text-primary transition-all"
              >
                {locale === 'zh' ? '下一页' : 'Next'} {'→'}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
