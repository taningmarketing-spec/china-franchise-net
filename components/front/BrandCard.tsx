import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { translations } from '@/lib/i18n';

interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    banner: string | null;
    industry: string;
    categorySlug: string;
    franchiseFee: string;
    totalCost: string;
    storesChina: number;
    storesOverseas: number;
    advantage: string | null;
    highlights: string | null;
    status: string;
  };
  locale?: Locale;
}

export default function BrandCard({ brand, locale = 'zh' }: BrandCardProps) {
  const t = translations[locale] || translations.zh;
  const labels = t.home.brandCard;
  const bt = t.brandTranslations?.[brand.slug];
  const displayName = bt?.name || brand.name;
  const displayIndustry = bt?.industry || brand.industry;

  return (
    <Link
      href={`/brand/${brand.slug}`}
      className="block bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all group"
    >
      {/* 顶部：主图 + 右上角Logo */}
      <div className="relative h-44 bg-slate-100 overflow-hidden">
        {brand.banner ? (
          <img src={brand.banner} alt={displayName} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-6xl opacity-20">🏪</span>
          </div>
        )}

        {/* 右上角 Logo */}
        <div className="absolute top-3 right-3 w-16 h-12 bg-white/95 backdrop-blur-sm rounded-md shadow-sm flex items-center justify-center overflow-hidden p-1">
          {brand.logo ? (
            <img src={brand.logo} alt="" className="w-full h-full object-contain" />
          ) : (
            <span className="text-xs font-bold text-slate-400">{displayName.slice(0, 4)}</span>
          )}
        </div>

        {/* 最大优势标签 */}
        {brand.advantage && (
          <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-block bg-orange-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded shadow-sm truncate max-w-full">
              {bt?.advantage || brand.advantage}
            </span>
          </div>
        )}
      </div>

      {/* 底部：品牌名 + 数据行 */}
      <div className="p-4">
        <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-base group-hover:text-primary transition-colors">{displayName}</h3>
          {brand.logo && (
            <img src={brand.logo} alt="" className="h-5 w-auto object-contain opacity-70" />
          )}
        </div>

        <div className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between py-1.5">
            <span className="text-slate-500">{labels.franchiseFee}</span>
            <span className="font-bold text-primary">{brand.franchiseFee}</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-slate-500">{labels.storesChina} / {labels.storesOverseas}</span>
            <span className="font-semibold text-slate-700">
              {brand.storesChina > 0 ? brand.storesChina.toLocaleString() : '-'}
              {brand.storesOverseas > 0 ? ` / ${brand.storesOverseas.toLocaleString()}` : ''}
            </span>
          </div>
          {brand.highlights && (
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">{t.home.brandCard.highlights}</span>
              <span className="font-medium text-orange-600 text-xs max-w-[120px] truncate" title={brand.highlights}>{brand.highlights}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}