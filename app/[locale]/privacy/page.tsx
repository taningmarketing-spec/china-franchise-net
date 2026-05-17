import { getLocaleParams, getPageTitle } from '@/lib/locale-utils';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  const cmsSlug = locale === 'zh' ? 'privacy' : `privacy-${locale}`;
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });
  if (cmsPage?.seoTitle) return { title: cmsPage.seoTitle, description: cmsPage.seoDesc };
  return { title: getPageTitle(locale, 'privacy') };
}

const sections: Record<string, Array<{ title: string; body: string }>> = {
  zh: [
    { title: '信息收集', body: '我们可能会收集您在使用我们服务时提供的个人信息，包括但不限于姓名、联系电话、电子邮箱等。' },
    { title: '信息使用', body: '收集的信息将用于：响应您的咨询、提供加盟品牌推荐、改进服务质量。未经同意，不会提供给第三方。' },
    { title: '信息保护', body: '采用行业标准的安全措施来保护您的个人信息，防止未经授权的访问、使用或泄露。' },
    { title: 'Cookie 使用', body: '使用 Cookie 来改善浏览体验。您可以选择在浏览器设置中禁用 Cookie。' },
    { title: '政策更新', body: '可能会不时更新本隐私政策。更新后的政策将在网站上公布，建议定期查看。' },
  ],
  en: [
    { title: 'Information Collection', body: 'We may collect personal information you provide when using our services.' },
    { title: 'Information Use', body: 'Your information will be used to respond to inquiries and provide brand recommendations.' },
    { title: 'Data Protection', body: 'We use industry-standard security measures to protect your personal information.' },
    { title: 'Cookie Usage', body: 'We use cookies to improve your browsing experience. You can disable cookies in browser settings.' },
    { title: 'Policy Updates', body: 'We may update this privacy policy from time to time. Changes will be posted on this website.' },
  ],
  th: [
    { title: 'การเก็บรวบรวมข้อมูล', body: 'เราอาจเก็บรวบรวมข้อมูลส่วนบุคคลที่คุณให้ไว้' },
    { title: 'การใช้ข้อมูล', body: 'ข้อมูลจะถูกใช้เพื่อตอบคำถามและแนะนำแบรนด์' },
    { title: 'การปกป้องข้อมูล', body: 'เราใช้มาตรฐานความปลอดภัยระดับอุตสาหกรรม' },
    { title: 'การใช้ Cookie', body: 'เราใช้ Cookie เพื่อปรับปรุงประสบการณ์การใช้งาน' },
    { title: 'อัปเดตนโยบาย', body: 'เราอาจอัปเดตนโยบายนี้เป็นครั้งคราว' },
  ],
  vi: [
    { title: 'Thu Thập Thông Tin', body: 'Chúng tôi có thể thu thập thông tin cá nhân bạn cung cấp khi sử dụng dịch vụ.' },
    { title: 'Sử Dụng Thông Tin', body: 'Thông tin sẽ được sử dụng để trả lời câu hỏi và đề xuất thương hiệu.' },
    { title: 'Bảo Vệ Dữ Liệu', body: 'Chúng tôi sử dụng biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin của bạn.' },
    { title: 'Sử Dụng Cookie', body: 'Chúng tôi sử dụng cookie để cải thiện trải nghiệm duyệt web.' },
    { title: 'Cập Nhật Chính Sách', body: 'Chúng tôi có thể cập nhật chính sách này theo thời gian.' },
  ],
};

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = getLocaleParams({ params });
  const cmsSlug = locale === 'zh' ? 'privacy' : `privacy-${locale}`;
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });

  const title = locale === 'zh' ? '隐私政策'
    : locale === 'en' ? 'Privacy Policy'
    : locale === 'th' ? 'นโยบายความเป็นส่วนตัว'
    : 'Chính Sách Bảo Mật';

  const subtitleMap: Record<string, string> = {
    zh: '我们非常重视您的隐私保护',
    en: 'We take your privacy seriously',
    th: 'เราให้ความสำคัญกับความเป็นส่วนตัว',
    vi: 'Chúng tôi coi trọng quyền riêng tư của bạn',
  };

  return (
    <div className="page-enter">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-4">{title}</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">{subtitleMap[locale] || subtitleMap.zh}</p>
        </div>
      </div>

      {cmsPage ? (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div dangerouslySetInnerHTML={{ __html: cmsPage.content }} className="cms-content" />
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 p-8 space-y-6">
            {sections[locale]?.map(s => (
              <section key={s.title}>
                <h2 className="text-lg font-bold text-slate-800 mb-3">{s.title}</h2>
                <p className="text-slate-600 leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}