import Link from 'next/link';
import { getLocaleParams } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  return {
    title: locale === 'zh' ? '海外加盟学院 - cnfranchise.com'
      : locale === 'en' ? 'Overseas Franchise Academy - China Franchise Net'
      : 'Học viện nhượng quyền quốc tế',
  };
}

const categories = {
  zh: [
    { slug: 'overseas-dynamic', icon: '📰', name: '海外加盟动态', desc: '追踪全球特许经营最新动态，掌握行业前沿资讯', color: '#1a56db', articleCount: 0 },
    { slug: 'overseas-case', icon: '🏆', name: '品牌出海案例', desc: '深度解析成功出海案例，借鉴成功经验避坑', color: '#10b981', articleCount: 0 },
    { slug: 'overseas-tips', icon: '💡', name: '海外加盟常识', desc: '从零了解海外加盟知识体系，建立系统性认知', color: '#8b5cf6', articleCount: 0 },
    { slug: 'overseas-policy', icon: '📋', name: '海外特许政策', desc: '各国特许经营法规政策解读，合规合法开展加盟', color: '#f59e0b', articleCount: 0 },
  ],
  en: [
    { slug: 'overseas-dynamic', icon: '📰', name: 'Overseas Franchise Trends', desc: 'Track global franchise trends and industry news', color: '#1a56db', articleCount: 0 },
    { slug: 'overseas-case', icon: '🏆', name: 'Brand Expansion Cases', desc: 'Deep analysis of successful overseas expansion cases', color: '#10b981', articleCount: 0 },
    { slug: 'overseas-tips', icon: '💡', name: 'Franchise Knowledge', desc: 'Learn franchise knowledge from scratch', color: '#8b5cf6', articleCount: 0 },
    { slug: 'overseas-policy', icon: '📋', name: 'Franchise Policies', desc: 'International franchise regulations and compliance', color: '#f59e0b', articleCount: 0 },
  ],
  th: [
    { slug: 'overseas-dynamic', icon: '📰', name: 'แนวโน้มแฟรนไชส์ต่างประเทศ', desc: 'ติดตามแนวโน้มแฟรนไชส์ทั่วโลก', color: '#1a56db', articleCount: 0 },
    { slug: 'overseas-case', icon: '🏆', name: 'กรณีศึกษาการออกสู่ตลาด', desc: 'วิเคราะห์กรณีศึกษาความสำเร็จในต่างประเทศ', color: '#10b981', articleCount: 0 },
    { slug: 'overseas-tips', icon: '💡', name: 'ความรู้แฟรนไชส์', desc: 'เรียนรู้พื้นฐานความรู้แฟรนไชส์', color: '#8b5cf6', articleCount: 0 },
    { slug: 'overseas-policy', icon: '📋', name: 'นโยบายแฟรนไชส์', desc: 'กฎระเบียบและการปฏิบัติตามข้อกำหนด', color: '#f59e0b', articleCount: 0 },
  ],
  vi: [
    { slug: 'overseas-dynamic', icon: '📰', name: 'Xu hướng nhượng quyền quốc tế', desc: 'Theo dõi xu hướng nhượng quyền toàn cầu', color: '#1a56db', articleCount: 0 },
    { slug: 'overseas-case', icon: '🏆', name: 'Case thương hiệu vượt biên', desc: 'Phân tích chuyên sâu các trường hợp mở rộng quốc tế thành công', color: '#10b981', articleCount: 0 },
    { slug: 'overseas-tips', icon: '💡', name: 'Kiến thức nhượng quyền', desc: 'Tìm hiểu kiến thức nhượng quyền từ đầu', color: '#8b5cf6', articleCount: 0 },
    { slug: 'overseas-policy', icon: '📋', name: 'Chính sách nhượng quyền', desc: 'Quy định và tuân thủ nhượng quyền quốc tế', color: '#f59e0b', articleCount: 0 },
  ],
};

const categoryMeta: Record<string, { icon: string; color: string }> = {
  'overseas-dynamic': { icon: '📰', color: '#1a56db' },
  'overseas-case': { icon: '🏆', color: '#10b981' },
  'overseas-tips': { icon: '💡', color: '#8b5cf6' },
  'overseas-policy': { icon: '📋', color: '#f59e0b' },
};

const defaultImages: Record<string, string> = {
  'overseas-dynamic': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
  'overseas-case': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  'overseas-tips': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  'overseas-policy': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
};

export default async function AcademyPage({ params }: { params: { locale: string } }) {
  const locale = getLocaleParams({ params });
  const t = translations[locale] || translations.zh;
  const cats = (categories as any)[locale] || categories.zh;

  // Fetch 3 most recent articles for featured section
  const featuredArticles = await prisma.article.findMany({
    where: { locale, status: 'published' },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      featuredImg: true,
      category: true,
      publishedAt: true,
    },
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            {locale === 'zh' ? '海外加盟知识平台' : locale === 'en' ? 'Overseas Franchise Knowledge Platform' : 'Nền tảng kiến thức nhượng quyền quốc tế'}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {locale === 'zh' ? '海外加盟学院' : locale === 'en' ? 'Overseas Franchise Academy' : 'Học viện Nhượng quyền Quốc tế'}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {locale === 'zh' ? '系统学习海外加盟知识，掌握品牌出海必备技能，让您的国际化之路更顺畅'
              : locale === 'en' ? 'Systematically learn overseas franchise knowledge and master the skills needed for international expansion'
              : 'Học kiến thức nhượng quyền quốc tế một cách có hệ thống'}
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">
              {locale === 'zh' ? '四大知识板块' : locale === 'en' ? 'Four Knowledge Sections' : 'Bốn phần kiến thức chính'}
            </h2>
            <p className="text-slate-500">
              {locale === 'zh' ? '从资讯到案例，从常识到政策，全方位武装您的出海知识'
                : locale === 'en' ? 'From trends to cases, knowledge to policies - equip yourself for international expansion'
                : 'Từ xu hướng đến case study, từ kiến thức đến chính sách'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cats.map((cat: any) => (
              <Link
                key={cat.slug}
                href={`/${locale}/academy/${cat.slug}`}
                className="group bg-white border-2 border-slate-100 rounded-2xl p-8 hover:border-slate-200 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                    style={{ background: `${cat.color}15` }}
                  >
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">{cat.name}</h3>
                      <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{cat.desc}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full" style={{ background: `${cat.color}15`, color: cat.color }}>
                        {locale === 'zh' ? '查看文章' : locale === 'en' ? 'View Articles' : 'Xem bài viết'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content - Real Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              {locale === 'zh' ? '热门推荐' : locale === 'en' ? 'Featured Articles' : 'Bài viết nổi bật'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => {
                const meta = categoryMeta[article.category] || { icon: '📄', color: '#6b7280' };
                const img = article.featuredImg || defaultImages[article.category] || defaultImages['overseas-dynamic'];
                return (
                  <Link
                    key={article.slug}
                    href={`/${locale}/academy/article/${article.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    {/* Cover Image */}
                    <div className="h-44 overflow-hidden relative" style={{ background: `${meta.color}15` }}>
                      <img
                        src={img}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ background: `${meta.color}cc` }}>
                          {meta.icon} {article.category.replace('overseas-', '')}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors leading-snug mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-sm text-slate-500 line-clamp-2 mb-2">{article.excerpt}</p>
                      )}
                      <span className="text-xs text-slate-400">{locale === 'zh' ? '点击阅读 →' : locale === 'en' ? 'Read More →' : 'Đọc thêm →'}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
