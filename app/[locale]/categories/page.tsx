import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { getLocaleParams } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import type { Metadata } from 'next';
import BrandCard from '@/components/front/BrandCard';

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  return { title: translations[locale]?.home?.categories || '行业分类' };
}

export default async function CategoriesPage({ params }: { params: { locale: string } }) {
  const locale = getLocaleParams({ params });
  const t = translations[locale] || translations.zh;
  const home = t.home as any;

  // 获取所有分类（按 sort 排序）
  const dbCategories = await prisma.category.findMany({
    orderBy: { sort: 'asc' },
  });

  // 获取每个分类的品牌数
  const categoryCounts = await prisma.brand.groupBy({
    by: ['categorySlug'],
    where: { status: 'published' },
    _count: true,
  });
  const countMap = Object.fromEntries(categoryCounts.map(c => [c.categorySlug, c._count]));

  // 热点项目：isHot=true 的品牌，限 4 个
  const hotBrands = await prisma.brand.findMany({
    where: { status: 'published', isHot: true },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  // 新出海项目：isHot=false 的品牌，按 createdAt 升序取前 4 个
  const newBrands = await prisma.brand.findMany({
    where: { status: 'published', isHot: false },
    take: 4,
    orderBy: { createdAt: 'asc' },
  });

  // 分类导航标签
  const categoryLabels: Record<string, { title: string; subtitle: string }> = {
    zh: { title: '热门行业分类', subtitle: '浏览所有加盟品牌分类，找到最适合您的创业项目' },
    en: { title: 'Popular Categories', subtitle: 'Browse all categories and find your perfect franchise' },
    th: { title: 'หมวดหมู่ยอดนิยม', subtitle: 'ดูหมวดหมู่ทั้งหมด' },
    vi: { title: 'Danh mục phổ biến', subtitle: 'Duyệt tất cả danh mục' },
  };
  const catLang = categoryLabels[locale] || categoryLabels.zh;

  return (
    <div className="page-enter">
      {/* Page Hero */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-4">{home.categories}</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">{catLang.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ═══ 热点项目 ═══ */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-sm">🔥</div>
              <h2 className="text-xl font-bold text-slate-800">{home.hotProjects || '热点项目'}</h2>
            </div>
            <Link href={`/${locale}/brands`} className="text-sm text-primary hover:underline font-medium">
              {home.viewAll || '查看全部'} →
            </Link>
          </div>

          {hotBrands.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {hotBrands.map(brand => (
                <BrandCard key={brand.id} brand={brand} locale={locale as any} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white rounded-2xl border border-slate-100">
              <div className="text-4xl mb-3">🔥</div>
              <p className="text-slate-400">{home.noHotProjects || '暂无热点项目'}</p>
            </div>
          )}
        </section>

        {/* ═══ 新出海项目 ═══ */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-sm">🌏</div>
              <h2 className="text-xl font-bold text-slate-800">{home.newOverseasProjects || '新出海项目'}</h2>
            </div>
            <Link href={`/${locale}/brands`} className="text-sm text-primary hover:underline font-medium">
              {home.viewAll || '查看全部'} →
            </Link>
          </div>

          {newBrands.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {newBrands.map(brand => (
                <BrandCard key={brand.id} brand={brand} locale={locale as any} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white rounded-2xl border border-slate-100">
              <div className="text-4xl mb-3">🌏</div>
              <p className="text-slate-400">{home.noNewProjects || '暂无新出海项目'}</p>
            </div>
          )}
        </section>

        {/* ═══ 行业分类 ═══ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">📂</div>
            <h2 className="text-xl font-bold text-slate-800">{home.categories}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dbCategories.map(cat => (
              <Link key={cat.slug} href={`/${locale}/category/${cat.slug}`} className="group bg-white rounded-2xl border border-slate-100 p-6 hover:border-slate-200 hover:shadow-card transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: `${(cat.color || '#1a56db')}15` }}>
                    {cat.icon || '📁'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors">{cat.name}</h3>
                    <p className="text-sm text-slate-400">{countMap[cat.slug] || 0} {locale === 'zh' ? '个品牌' : locale === 'en' ? 'brands' : locale === 'th' ? 'แบรนด์' : 'thương hiệu'}</p>
                  </div>
                </div>
                {cat.desc && (
                  <p className="text-sm text-slate-500 leading-relaxed">{cat.desc}</p>
                )}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}