import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { translations, locales } from '@/lib/i18n';
import LocaleClientLayout from '@/components/front/LocaleClientLayout';

const baseUrl = process.env.SITE_URL || 'https://www.cnfranchise.com';

const localeMeta: Record<string, { title: string; description: string; lang: string; keywords: string }> = {
  zh: {
    title: 'cnfranchise.com - 餐饮茶饮咖啡小吃甜品糖水品牌加盟搜索平台',
    description: 'cnfranchise.com收录餐饮、茶饮、咖啡、小吃、甜品、糖水等行业加盟品牌，提供加盟费、条件、流程等详细信息。挞柠柠檬茶、霸王茶姬、瑞幸咖啡等知名品牌加盟机会，助您找到最适合的创业项目。',
    lang: 'zh-CN',
    keywords: '品牌加盟,餐饮加盟,茶饮加盟,咖啡加盟,小吃加盟,甜品加盟,柠檬茶加盟,挞柠加盟,霸王茶姬加盟,瑞幸加盟,海外加盟,中国特许经营,franchise China',
  },
  en: {
    title: 'cnfranchise.com - Food & Beverage Franchise Search Platform | China Franchise Opportunities',
    description: 'Discover top food, beverage, coffee, dessert and snack franchise brands in China. Detailed information on franchise fees, requirements, and processes to help you find the perfect business opportunity. Taning Lemon Tea, Bawang Chaji, Luckin Coffee and more.',
    lang: 'en-US',
    keywords: 'China franchise, food franchise, beverage franchise, coffee franchise, tea franchise, dessert franchise, Taning franchise, Bawang Chaji franchise, Luckin Coffee franchise, overseas franchise, F&B franchise opportunities',
  },
  th: {
    title: 'cnfranchise.com - แพลตฟอร์มค้นหาแฟรนไชส์อาหารและเครื่องดื่ม | โอกาสแฟรนไชส์จีน',
    description: 'ค้นพบแบรนด์แฟรนไชส์อาหาร เครื่องดื่ม กาแฟ ขนมหวาน และของว่างชั้นนำในจีน ข้อมูลละเอียดเกี่ยวกับค่าแฟรนไชส์ ข้อกำหนด และขั้นตอนการเป็นเจ้าของแฟรนไชส์',
    lang: 'th-TH',
    keywords: 'แฟรนไชส์จีน, แฟรนไชส์อาหาร, แฟรนไชส์เครื่องดื่ม, แฟรนไชส์ชา, แฟรนไชส์กาแฟ, แฟรนไชส์ต่างประเทศ, โอกาสทำธุรกิจจีน, franchise Thailand',
  },
  vi: {
    title: 'cnfranchise.com - Nền tảng Tìm kiếm Nhượng quyền F&B | Cơ hội Nhượng quyền Trung Quốc',
    description: 'Khám phá các thương hiệu nhượng quyền thực phẩm, đồ uống, cà phê, tráng miệng hàng đầu Trung Quốc. Thông tin chi tiết về phí, điều kiện và quy trình nhượng quyền để giúp bạn tìm cơ hội kinh doanh hoàn hảo.',
    lang: 'vi-VN',
    keywords: 'nhượng quyền Trung Quốc, nhượng quyền F&B, nhượng quyền trà sữa, nhượng quyền cà phê, nhượng quyền đồ ăn, cơ hội kinh doanh Trung Quốc, franchise Vietnam',
  },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const meta = localeMeta[locale] || localeMeta.zh;

  return {
    title: {
      default: meta.title,
      template: `%s | cnfranchise.com`,
    },
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      type: 'website',
      locale: meta.lang,
      url: `${baseUrl}/${locale}`,
      siteName: 'cnfranchise.com',
      title: meta.title,
      description: meta.description,
      images: [{ url: `${baseUrl}/og-default.jpg`, width: 1200, height: 630, alt: 'cnfranchise.com' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/og-default.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'zh-CN': `${baseUrl}/zh`,
        'en-US': `${baseUrl}/en`,
        'th-TH': `${baseUrl}/th`,
        'vi-VN': `${baseUrl}/vi`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params }: Props) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const t = translations[locale] || translations.zh;
  const nav = t.nav;
  const footer = t.footer;
  const home = t.home;

  // Category items from translations
  const categoryItems: [string, string][] = [
    [nav.tea || '茶饮', 'chayin'],
    [nav.coffee || '咖啡', 'kafei'],
    [nav.snack || '小吃', 'xiaochi'],
    [nav.dessert || '甜品', 'tianpin'],
    [nav.tangshui || '糖水', 'tangshui'],
    [nav.food || '餐饮', 'catering'],
  ];
  // Budget items from translations
  const budgetItems: [string, string][] = [
    [footer.fiveK || '5万以下', '?maxCost=5'],
    [footer.tenK || '10万以下', '?maxCost=10'],
    [footer.twentyK || '20万以下', '?maxCost=20'],
    [footer.fiftyK || '50万以下', '?maxCost=50'],
  ];

  return (
    <LocaleClientLayout locale={locale}>
      {children}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="text-white font-bold text-lg mb-3">{footer.tagline}</div>
              <p className="text-slate-500 text-xs leading-relaxed">{footer.slogan}</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">{footer.hotIndustries}</h4>
              <ul className="space-y-2 text-xs">
                {categoryItems.map(([name, slug]) => (
                  <li key={slug}><Link href={`/${locale}/category/${slug}`} className="hover:text-white transition-colors">{name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">{footer.budget}</h4>
              <ul className="space-y-2 text-xs">
                {budgetItems.map(([label, qs]) => (
                  <li key={qs}><Link href={`/${locale}/brands${qs}`} className="hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">{footer.aboutUs}</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{footer.aboutUs}</Link></li>
                <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{footer.privacy}</Link></li>
                <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{footer.terms}</Link></li>
                <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{footer.contact}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
            <p>{footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Global JSON-LD: Organization + WebSite + SearchAction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'cnfranchise.com',
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            description: localeMeta[locale]?.description || '',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+86-13802429520',
              contactType: 'sales',
              availableLanguage: ['Chinese', 'English', 'Thai', 'Vietnamese'],
            },
            sameAs: [],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: locale === 'zh' ? 'cnfranchise.com 中国加盟网' : 'cnfranchise.com China Franchise Net',
            url: baseUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${baseUrl}/${locale}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </LocaleClientLayout>
  );
}
