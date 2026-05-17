'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { OverseasService } from '@/lib/overseas-services';

interface Props {
  service: OverseasService;
  relatedServices: OverseasService[];
  locale: Locale;
}

export default function ServiceDetailClient({ service, relatedServices, locale }: Props) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 构建图片列表：优先使用 gallery 字段，回退到 icon
  const images = (() => {
    if (service.gallery) {
      try {
        const parsed = JSON.parse(service.gallery);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]) return parsed;
      } catch {}
    }
    // 回退到 icon 或默认图
    return [service.icon || 'https://images.unsplash.com/photo-1454165753643-538c06f48be3?w=1200&h=600&fit=crop'];
  })();

  const totalSlides = images.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // 自动播放（3秒切换）
  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [nextSlide, totalSlides]);

  /** Parse advantages JSON safely */
  const parseAdvantages = (jsonStr: string | null | undefined): { icon: string; text: string }[] => {
    if (!jsonStr) return [];
    try {
      const arr = JSON.parse(jsonStr);
      if (Array.isArray(arr)) return arr;
      return [];
    } catch { return []; }
  };

  /** Get advantages list for current locale */
  const getAdvantages = (): { icon: string; text: string }[] => {
    let field = 'advantages';
    if (locale === 'en') field = 'advantagesEn';
    else if (locale === 'th') field = 'advantagesTh';
    else if (locale === 'vi') field = 'advantagesVi';
    const raw = (service as any)[field];
    const parsed = parseAdvantages(raw);
    if (parsed.length > 0) return parsed;
    return parseAdvantages(service.advantages);
  };

  const advantages = getAdvantages();

  const labels: Record<string, Record<string, string>> = {
    zh: {
      ctaText: '免费咨询',
      heroTag: '出海服务',
      relatedTitle: '相关服务',
      viewDetail: '查看详情',
      serviceIntro: '服务介绍',
      share: '分享至',
    },
    en: {
      ctaText: 'Free Consultation',
      heroTag: 'Overseas Services',
      relatedTitle: 'Related Services',
      viewDetail: 'View Details',
      serviceIntro: 'Service Introduction',
      share: 'Share',
    },
    th: {
      ctaText: 'ปรึกษาฟรี',
      heroTag: 'บริการต่างประเทศ',
      relatedTitle: 'บริการที่เกี่ยวข้อง',
      viewDetail: 'ดูรายละเอียด',
      serviceIntro: 'แนะนำบริการ',
      share: 'แชร์',
    },
    vi: {
      ctaText: 'Tư vấn miễn phí',
      heroTag: 'Dịch vụ xuất khẩu',
      relatedTitle: 'Dịch vụ liên quan',
      viewDetail: 'Xem chi tiết',
      serviceIntro: 'Giới thiệu dịch vụ',
      share: 'Chia sẻ',
    },
  };

  const l = labels[locale] || labels.zh;

  const getName = (s: OverseasService) => {
    if (locale === 'en' && s.nameEn) return s.nameEn;
    if (locale === 'th' && s.nameTh) return s.nameTh;
    if (locale === 'vi' && s.nameVi) return s.nameVi;
    return s.name;
  };

  const getDescription = () => {
    if (locale === 'en' && service.descriptionEn) return service.descriptionEn;
    if (locale === 'th' && service.descriptionTh) return service.descriptionTh;
    if (locale === 'vi' && service.descriptionVi) return service.descriptionVi;
    return service.description || '';
  };

  const getContent = () => {
    if (locale === 'en' && service.contentEn) return service.contentEn;
    if (locale === 'th' && service.contentTh) return service.contentTh;
    if (locale === 'vi' && service.contentVi) return service.contentVi;
    return service.content || '';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href={`/${locale}`} className="hover:text-primary transition-colors">
              {locale === 'zh' ? '首页' : locale === 'en' ? 'Home' : locale === 'th' ? 'หน้าแรก' : 'Trang chủ'}
            </Link>
            <span className="text-slate-300">/</span>
            <Link href={`/${locale}/overseas-services`} className="hover:text-primary transition-colors">
              {l.heroTag}
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-primary font-medium">{getName(service)}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Card - Image Gallery + Info */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Image Carousel (1-3 images) */}
            <div className="relative h-80 lg:h-[420px] bg-slate-100 overflow-hidden group">
              {/* Images */}
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${getName(service)} - ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                    priority={idx === 0}
                  />
                </div>
              ))}

              {/* Navigation Arrows (show only when > 1 image) */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`transition-all duration-300 rounded-full ${
                          idx === currentSlide
                            ? 'w-6 h-2.5 bg-white shadow-md'
                            : 'w-2 h-2 bg-white/60 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right: Title + Advantages + CTA */}
            <div className="p-6 md:p-10 flex flex-col">
              {/* Title & Subtitle */}
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                {getName(service)}
              </h1>
              <p className="text-slate-400 text-sm mb-6">
                {getDescription()}
              </p>

              {/* Advantages List */}
              <div className="space-y-3 mb-8 flex-1">
                {advantages.length > 0 ? (
                  advantages.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-base mt-0.5 shrink-0">{item.icon}</span>
                      <span className="text-slate-500 text-sm">{item.text}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm">暂无优势内容（请在后台编辑）</p>
                )}
              </div>

              {/* CTA Button Row */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <button
                  className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
                  onClick={() => router.push(`/${locale}/contact`)}
                >
                  {l.ctaText}
                </button>
                <button
                  className="px-4 py-3 text-slate-400 hover:text-slate-600 transition-colors text-sm flex items-center gap-1.5"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: getName(service),
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  {l.share}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Service Introduction Section */}
        <div className="mb-8">
          {/* Section Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="px-4 py-1.5 bg-primary text-white font-bold text-sm rounded-l-lg rounded-r-md shadow-sm">
                {l.serviceIntro}
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              <span className="text-xs text-slate-400 uppercase tracking-wider hidden sm:block">
                SERVICE INTRODUCTION
              </span>
              <svg className="w-4 h-4 text-slate-300 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 18z" />
              </svg>
            </div>
          </div>

          {/* Rich Text Content */}
          {getContent() && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8">
              <div 
                className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: getContent() }}
              />
            </div>
          )}
          
          {!getContent() && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8">
              <p className="text-slate-500">
                {locale === 'zh' ? '暂无详细内容' : 'No detailed content available'}
              </p>
            </div>
          )}
        </div>

        {/* Related Services - Below Content */}
        {relatedServices.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {l.relatedTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedServices.map((related) => (
                <Link
                  key={related.id}
                  href={`/${locale}/overseas-services/${related.serviceId}`}
                  className="group block"
                >
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                    <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                      <Image
                        src={related.icon || 'https://images.unsplash.com/photo-1454165753643-538c06f48be3?w=200&h=200&fit=crop'}
                        alt={getName(related)}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h4 className="text-sm font-medium text-slate-800 group-hover:text-primary transition-colors line-clamp-2">
                        {getName(related)}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {l.viewDetail} →
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
