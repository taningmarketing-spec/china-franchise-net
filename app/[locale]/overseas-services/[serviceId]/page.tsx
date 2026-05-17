import type { Locale } from '@/lib/i18n';
import { translations } from '@/lib/i18n';
import ServiceDetailClient from './ServiceDetailClient';
import { getOverseasService, getOverseasServices } from '@/lib/overseas-services';
import { notFound } from 'next/navigation';

interface Props {
  params: { locale: string; serviceId: string };
}

export async function generateMetadata({ params }: Props) {
  const { locale, serviceId } = await Promise.resolve(params);
  const service = await getOverseasService(serviceId);
  const localeKey = locale as Locale;
  const t = translations[localeKey] || translations.zh;

  if (!service) {
    return { title: 'Service Not Found | China Franchise Net' };
  }

  // 获取多语言名称
  const name = localeKey === 'en' && service.nameEn ? service.nameEn :
               localeKey === 'th' && service.nameTh ? service.nameTh :
               localeKey === 'vi' && service.nameVi ? service.nameVi :
               service.name;

  return {
    title: `${name} - ${t.nav?.overseasServices || '出海服务'} | cnfranchise.com`,
    description: service.description || '',
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, serviceId } = await Promise.resolve(params);
  const service = await getOverseasService(serviceId);

  if (!service) {
    notFound();
  }

  // 获取相关服务（排除当前服务）
  const allServices = await getOverseasServices();
  const relatedServices = allServices.filter(s => s.serviceId !== serviceId);

  return (
    <ServiceDetailClient 
      service={service} 
      relatedServices={relatedServices}
      locale={locale as Locale} 
    />
  );
}
