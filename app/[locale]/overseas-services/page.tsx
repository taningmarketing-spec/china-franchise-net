import type { Locale } from '@/lib/i18n';
import { translations } from '@/lib/i18n';
import { getOverseasServices } from '@/lib/overseas-services';
import OverseasServicesClient from './OverseasServicesClient';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props) {
  const locale = params.locale as Locale;
  const t = translations[locale] || translations.zh;
  
  const titles: Record<Locale, string> = {
    zh: '出海服务 - 为中国品牌出海提供一站式解决方案 | cnfranchise.com',
    en: 'Overseas Services - One-stop Solution for Chinese Brands Going Global | China Franchise Net',
    th: 'บริการต่างประเทศ - โซลูชันครบวงจรสำหรับแบรนด์จีน | China Franchise Net',
    vi: 'Dịch vụ xuất khẩu - Giải pháp toàn diện cho thương hiệu Trung Quốc | China Franchise Net',
  };
  
  const descriptions: Record<Locale, string> = {
    zh: '提供海外法务、知识产权、跨境物流、海外人力、海外财税、海外支付/金融、海外选址/地产、海外公关/媒体、海外展会、海外售后/客服等10大出海服务，助力中国品牌成功出海。',
    en: 'Comprehensive overseas services including legal, IP, logistics, HR, finance, PR, exhibitions and more to help Chinese brands expand globally.',
    th: 'บริการครบวงจรรวมถึงกฎหมาย ทรัพย์สินทางปัญญา โลจิสติกส์ บุคลากร การเงิน และอื่นๆ',
    vi: 'Dịch vụ toàn diện bao gồm pháp lý, sở hữu trí tuệ, logistics, nhân sự, tài chính và nhiều hơn nữa',
  };
  
  return {
    title: titles[locale] || titles.zh,
    description: descriptions[locale] || descriptions.zh,
  };
}

export default async function OverseasServicesPage({ params }: Props) {
  const locale = params.locale as Locale;
  const services = await getOverseasServices();
  
  return <OverseasServicesClient locale={locale} services={services} />;
}
