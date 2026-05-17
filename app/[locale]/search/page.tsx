import { getLocaleParams, getPageTitle } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  return { title: getPageTitle(locale, 'search') };
}

export default function SearchPage({ params }: { params: { locale: string } }) {
  const locale = getLocaleParams({ params });
  const t = translations[locale];

  return (
    <div className="page-enter">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-4">{locale === 'zh' ? '搜索品牌' : locale === 'en' ? 'Search Brands' : locale === 'th' ? 'ค้นหาแบรนด์' : 'Tìm Kiếm Thương Hiệu'}</h1>
          <form action="/search" method="get" className="max-w-xl mx-auto flex gap-2 mt-6">
            <input type="text" name="q" placeholder={t.home.searchPlaceholder} className="flex-1 px-5 py-3 rounded-xl text-base border border-slate-200 focus:outline-none focus:border-primary" />
            <button type="submit" className="gradient-accent text-white px-8 py-3 rounded-xl font-semibold">{t.home.searchButton}</button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-slate-400">{locale === 'zh' ? '输入关键词搜索加盟品牌' : locale === 'en' ? 'Enter keywords to search franchise brands' : locale === 'th' ? 'ป้อนคำสำคัญเพื่อค้นหาแบรนด์' : 'Nhập từ khóa để tìm kiếm thương hiệu nhượng quyền'}</p>
      </div>
    </div>
  );
}
