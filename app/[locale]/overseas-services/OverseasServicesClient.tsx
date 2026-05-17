'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import type { OverseasService } from '@/lib/overseas-services';

interface Props {
  locale: Locale;
  services: OverseasService[];
}

export default function OverseasServicesClient({ locale, services }: Props) {
  const router = useRouter();

  const titles: Record<Locale, { main: string; subtitle: string; cta: string; learnMore: string }> = {
    zh: {
      main: '出海服务',
      subtitle: '为中国品牌出海提供一站式解决方案，覆盖法务、人力、财税、物流等10大核心领域',
      cta: '马上咨询',
      learnMore: '了解更多',
    },
    en: {
      main: 'Overseas Services',
      subtitle: 'One-stop solutions for Chinese brands going global, covering 10 core areas including legal, HR, finance, and logistics',
      cta: 'Inquire Now',
      learnMore: 'Learn More',
    },
    th: {
      main: 'บริการต่างประเทศ',
      subtitle: 'โซลูชันครบวงจรสำหรับแบรนด์จีนที่จะขยายตลาดต่างประเทศ ครอบคลุม 10 ด้านหลัก',
      cta: 'สอบถามทันที',
      learnMore: 'เรียนรู้เพิ่มเติม',
    },
    vi: {
      main: 'Dịch vụ xuất khẩu',
      subtitle: 'Giải pháp toàn diện cho thương hiệu Trung Quốc vươn ra thế giới, bao gồm 10 lĩnh vực cốt lõi',
      cta: 'Tư vấn ngay',
      learnMore: 'Tìm hiểu thêm',
    },
  };

  const title = titles[locale] || titles.zh;

  // 获取多语言字段
  const getLocalizedName = (service: OverseasService) => {
    if (locale === 'en' && service.nameEn) return service.nameEn;
    if (locale === 'th' && service.nameTh) return service.nameTh;
    if (locale === 'vi' && service.nameVi) return service.nameVi;
    return service.name;
  };

  const getLocalizedDescription = (service: OverseasService) => {
    if (locale === 'en' && service.descriptionEn) return service.descriptionEn;
    if (locale === 'th' && service.descriptionTh) return service.descriptionTh;
    if (locale === 'vi' && service.descriptionVi) return service.descriptionVi;
    return service.description || '';
  };

  const handleCardClick = (serviceId: string) => {
    router.push(`/${locale}/overseas-services/${serviceId}`);
  };

  // 默认图标（如果没有设置）
  const defaultIcon = 'https://images.unsplash.com/photo-1454165753643-538c06f48be3?w=400&h=300&fit=crop';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">{title.main}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {title.subtitle}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">
              {locale === 'zh' ? '暂无服务数据' : 'No services available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.serviceId)}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              >
                {/* Image Area */}
                <div className="h-44 relative overflow-hidden bg-slate-100">
                  <Image
                    src={service.icon || defaultIcon}
                    alt={getLocalizedName(service)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    unoptimized
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                    {getLocalizedName(service)}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 min-h-[40px]">
                    {getLocalizedDescription(service)}
                  </p>

                  {/* CTA Button */}
                  <button
                    className="w-full py-2.5 px-4 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark active:scale-[0.98] transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(service.serviceId);
                    }}
                  >
                    {title.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              {locale === 'zh' ? '需要定制化出海方案？' : 
               locale === 'en' ? 'Need a customized overseas expansion plan?' :
               locale === 'th' ? 'ต้องการแผนขยายตลาดต่างประเทศแบบกำหนดเอง?' :
               'Cần kế hoạch mở rộng quốc tế tùy chỉnh?'}
            </h2>
            <p className="text-slate-500 mb-6 max-w-2xl mx-auto">
              {locale === 'zh' ? '我们的出海顾问团队将为您提供专业的咨询服务，帮助您制定最适合的出海策略' :
               locale === 'en' ? 'Our overseas expansion consultants will provide professional advisory services to help you develop the best strategy' :
               locale === 'th' ? 'ที่ปรึกษาการขยายตลาดต่างประเทศของเราจะให้บริการที่ปรึกษาอย่างมืออาชีพ' :
               'Đội ngũ tư vấn mở rộng quốc tế của chúng tôi sẽ cung cấp dịch vụ tư vấn chuyên nghiệp'}
            </p>
            <button
              onClick={() => router.push(`/${locale}/overseas-services/${services[0]?.serviceId || 'legal'}`)}
              className="inline-flex items-center gap-2 py-3 px-8 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark active:scale-[0.98] transition-all"
            >
              {title.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
