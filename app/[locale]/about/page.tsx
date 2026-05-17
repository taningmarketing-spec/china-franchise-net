import { getLocaleParams, getPageTitle } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

// 硬编码内容（作为 fallback）
const aboutContent: Record<string, { mission: string; services: Array<{ icon: string; title: string; desc: string }> }> = {
  zh: {
    mission: 'cnfranchise.com成立于2026年，是国内领先的加盟品牌信息平台。我们致力于收录餐饮、茶饮、咖啡、小吃、甜品、糖水等热门行业的优质加盟品牌，为创业者提供真实、透明、全面的加盟信息，帮助每一位创业者找到最适合自己的创业项目。',
    services: [
      { icon: '🔍', title: '品牌搜索', desc: '海量品牌库，精准搜索' },
      { icon: '📊', title: '数据对比', desc: '费用、条件一目了然' },
      { icon: '📱', title: '在线咨询', desc: '专业顾问一对一服务' },
      { icon: '📅', title: '每日更新', desc: '持续收录新品牌' },
    ],
  },
  en: {
    mission: 'China Franchise Net was founded in 2026 and is a leading franchise brand information platform in China. We are committed to curating quality franchise brands in catering, tea, coffee, snacks, desserts and more.',
    services: [
      { icon: '🔍', title: 'Brand Search', desc: 'Massive brand library' },
      { icon: '📊', title: 'Data Comparison', desc: 'Fees & conditions at a glance' },
      { icon: '📱', title: 'Online Inquiry', desc: 'Professional consultant service' },
      { icon: '📅', title: 'Daily Updates', desc: 'New brands added daily' },
    ],
  },
  th: {
    mission: 'China Franchise Net ก่อตั้งในปี 2026 เป็นแพลตฟอร์มข้อมูลแฟรนไชส์ชั้นนำในประเทศจีน',
    services: [
      { icon: '🔍', title: 'ค้นหาแบรนด์', desc: 'ไลบรารี่แบรนด์ขนาดใหญ่' },
      { icon: '📊', title: 'เปรียบเทียบข้อมูล', desc: 'ค่าธรรมเนียมและเงื่อนไข' },
      { icon: '📱', title: 'สอบถามออนไลน์', desc: 'บริการที่ปรึกษา' },
      { icon: '📅', title: 'อัปเดตทุกวัน', desc: 'แบรนด์ใหม่ทุกวัน' },
    ],
  },
  vi: {
    mission: 'China Franchise Net được thành lập năm 2026, là nền tảng thông tin nhượng quyền hàng đầu tại Trung Quốc.',
    services: [
      { icon: '🔍', title: 'Tìm Kiếm Thương Hiệu', desc: 'Thư viện thương hiệu lớn' },
      { icon: '📊', title: 'So Sánh Dữ Liệu', desc: 'Phí và điều kiện rõ ràng' },
      { icon: '📱', title: 'Tư Vấn Trực Tuyến', desc: 'Dịch vụ tư vấn chuyên nghiệp' },
      { icon: '📅', title: 'Cập Nhật Hàng Ngày', desc: 'Thương hiệu mới mỗi ngày' },
    ],
  },
};

// 生成元数据
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  
  // 尝试从 CMS 获取
  const cmsSlug = locale === 'zh' ? 'about' : `about-${locale}`;
  
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });
  
  if (cmsPage?.seoTitle) {
    return { title: cmsPage.seoTitle, description: cmsPage.seoDesc };
  }
  
  return { title: getPageTitle(locale, 'about') };
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale = getLocaleParams({ params });
  const t = translations[locale];
  
  // 尝试从 CMS 获取页面内容
  const cmsSlug = locale === 'zh' ? 'about' : `about-${locale}`;
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });
  
  // 如果有 CMS 内容，使用 CMS 内容；否则使用硬编码
  const content = cmsPage ? null : (aboutContent[locale] || aboutContent.zh);

  const pageTitle = locale === 'zh' ? '关于我们' 
    : locale === 'en' ? 'About Us' 
    : locale === 'th' ? 'เกี่ยวกับเรา' 
    : 'Về Chúng Tôi';

  return (
    <div className="page-enter">
      {/* 页面标题区 */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-4">{pageTitle}</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">{t?.home?.subtitle?.slice(0, 50) || ''}...</p>
        </div>
      </div>
      
      {/* CMS 内容 */}
      {cmsPage ? (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div dangerouslySetInnerHTML={{ __html: cmsPage.content }} className="cms-content" />
        </div>
      ) : (
        /* 硬编码 fallback 内容 */
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                {locale === 'zh' ? '我们的使命' : locale === 'en' ? 'Our Mission' : locale === 'th' ? 'พันธกิจของเรา' : 'Sứ Mệnh'}
              </h2>
              <p className="text-slate-600 leading-relaxed">{content?.mission}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                {locale === 'zh' ? '我们的服务' : locale === 'en' ? 'Our Services' : locale === 'th' ? 'บริการของเรา' : 'Dịch Vụ Của Chúng Tôi'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content?.services.map(item => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-medium text-slate-800">{item.title}</div>
                      <div className="text-sm text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
