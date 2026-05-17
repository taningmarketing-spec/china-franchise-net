import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { translations } from '@/lib/i18n';
import type { Brand, Category } from '@prisma/client';

interface CategoryWithBrands {
  category: Category;
  brands: Brand[];
}

interface CategoryBrandsProps {
  locale: Locale;
  categoriesWithBrands: CategoryWithBrands[];
}

export default function CategoryBrands({ locale, categoriesWithBrands }: CategoryBrandsProps) {
  const t = translations[locale] || translations.zh;

  const labels = {
    zh: { storesChina: '中国门店', storesOverseas: '海外门店', fee: '加盟费' },
    en: { storesChina: 'CN Stores', storesOverseas: 'Overseas Stores', fee: 'Franchise Fee' },
    th: { storesChina: 'สาขาจีน', storesOverseas: 'สาขาต่างประเทศ', fee: 'ค่าธรรมเนียม' },
    vi: { storesChina: 'Cửa hàng TQ', storesOverseas: 'Cửa hàng HQ', fee: 'Phí nhượng quyền' },
  };
  const l = labels[locale] || labels.zh;

  // 过滤掉没有品牌的分类
  const validCategories = categoriesWithBrands.filter(({ brands }) => brands.length > 0);

  if (validCategories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          {t.home.categoryBrands || (locale === 'zh' ? '出海品牌推荐' : locale === 'en' ? 'Overseas Brands' : locale === 'th' ? 'แบรนด์สำหรับต่างประเทศ' : 'Thương hiệu vãng lai')}
        </h2>
      </div>

      {validCategories.map(({ category, brands }) => {
        return (
          <div key={category.id} className="mb-8">
            {/* 分类名称 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                <span className="text-2xl">{category.icon || '📁'}</span>
                {category.name}
              </h3>
              <Link 
                href={`/${locale}/category/${category.slug}`}
                className="text-sm text-primary font-medium hover:underline"
              >
                {locale === 'zh' ? '查看更多' : 
                 locale === 'en' ? 'View More' :
                 locale === 'th' ? 'ดูเพิ่มเติม' :
                 'Xem thêm'} →
              </Link>
            </div>

            {/* 4个品牌卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {brands.map(brand => (
                <Link
                  key={brand.id}
                  href={`/${locale}/brand/${brand.slug}`}
                  className="block bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all group"
                >
                  {/* 顶部图片 */}
                  <div className="relative h-32 bg-slate-100 overflow-hidden">
                    {brand.banner ? (
                      <img src={brand.banner} alt={brand.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 flex items-center justify-center">
                        <span className="text-4xl opacity-20">🏪</span>
                      </div>
                    )}
                    
                    {/* 右上角 Logo */}
                    <div className="absolute top-2 right-2 w-12 h-10 bg-white/95 backdrop-blur-sm rounded-md shadow-sm flex items-center justify-center overflow-hidden p-1">
                      {brand.logo ? (
                        <img src={brand.logo} alt="" className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400">{brand.name.slice(0, 2)}</span>
                      )}
                    </div>
                  </div>

                  {/* 底部信息 */}
                  <div className="p-3">
                    <h4 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-primary transition-colors truncate">
                      {brand.name}
                    </h4>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{l.fee}</span>
                      <span className="font-bold text-primary">{brand.franchiseFee}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
