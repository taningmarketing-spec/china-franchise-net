import Link from 'next/link';
import { getLocaleParams } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import AcademyArticleList from '@/components/front/AcademyArticleList';

export async function generateMetadata({ params }: { params: { locale: string; category: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  const catNames: Record<string, any> = {
    'overseas-dynamic': locale === 'zh' ? '海外加盟动态' : locale === 'en' ? 'Overseas Franchise Trends' : 'Xu hướng nhượng quyền quốc tế',
    'overseas-case': locale === 'zh' ? '品牌出海案例' : locale === 'en' ? 'Brand Expansion Cases' : 'Case thương hiệu vượt biên',
    'overseas-tips': locale === 'zh' ? '海外加盟常识' : locale === 'en' ? 'Franchise Knowledge' : 'Kiến thức nhượng quyền',
    'overseas-policy': locale === 'zh' ? '海外特许政策' : locale === 'en' ? 'Franchise Policies' : 'Chính sách nhượng quyền',
  };
  const title = catNames[params.category] || params.category;
  return {
    title: `${title} - ${locale === 'zh' ? '海外加盟学院' : 'Overseas Franchise Academy'}`,
  };
}

const catMeta: Record<string, any> = {
  'overseas-dynamic': {
    icon: '📰', color: '#1a56db',
    zh: { name: '海外加盟动态', desc: '追踪全球特许经营最新动态，掌握行业前沿资讯' },
    en: { name: 'Overseas Franchise Trends', desc: 'Track global franchise trends and industry latest updates' },
  },
  'overseas-case': {
    icon: '🏆', color: '#10b981',
    zh: { name: '品牌出海案例', desc: '深度解析成功出海案例，借鉴成功经验避坑' },
    en: { name: 'Brand Expansion Cases', desc: 'Deep analysis of successful overseas expansion cases' },
  },
  'overseas-tips': {
    icon: '💡', color: '#8b5cf6',
    zh: { name: '海外加盟常识', desc: '从零了解海外加盟知识体系，建立系统性认知' },
    en: { name: 'Franchise Knowledge', desc: 'Learn franchise knowledge from scratch, build systematic understanding' },
  },
  'overseas-policy': {
    icon: '📋', color: '#f59e0b',
    zh: { name: '海外特许政策', desc: '各国特许经营法规政策解读，合规合法开展加盟' },
    en: { name: 'Franchise Policies', desc: 'International franchise regulations and compliance guide' },
  },
};

type SearchParams = { page?: string; limit?: string };

export default async function AcademyCategoryPage({
  params,
  searchParams,
}: {
  params: { locale: string; category: string };
  searchParams: SearchParams;
}) {
  const locale = getLocaleParams({ params });
  const { category } = params;
  const meta = catMeta[category];

  if (!meta) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <Link href={`/${locale}/academy`} className="text-primary hover:underline">← Back to Academy</Link>
      </div>
    );
  }

  const t = translations[locale] || translations.zh;
  const info = (meta as any)[locale] || meta.zh;

  // Pagination params
  const page = Math.max(1, parseInt(searchParams?.page || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams?.limit || '10')));
  const skip = (page - 1) * limit;

  // Fetch articles with pagination
  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where: { category, locale, status: 'published' },
      orderBy: [{ sortOrder: 'asc' }, { publishedAt: 'desc' }],
      skip,
      take: limit,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        featuredImg: true,
        publishedAt: true,
        viewCount: true,
      },
    }),
    prisma.article.count({
      where: { category, locale, status: 'published' },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);
  const baseUrl = `/${locale}/academy/${category}`;

  return (
    <div>
      {/* Category Hero */}
      <section className="text-white" style={{ background: `linear-gradient(135deg, ${meta.color}ee 0%, ${meta.color}88 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link href={`/${locale}/academy`} className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-6">
            ← {locale === 'zh' ? '海外加盟学院' : locale === 'en' ? 'Overseas Franchise Academy' : 'Học viện'}
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">{meta.icon}</div>
            <div>
              <h1 className="text-3xl font-bold">{info.name}</h1>
              <p className="text-white/80 mt-1">{info.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article List with Pagination */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AcademyArticleList
            articles={articles}
            locale={locale}
            category={category}
            currentPage={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            baseUrl={baseUrl}
          />
        </div>
      </section>
    </div>
  );
}
