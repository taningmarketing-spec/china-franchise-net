import { getLocaleParams, getPageTitle } from '@/lib/locale-utils';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  const cmsSlug = locale === 'zh' ? 'terms' : `terms-${locale}`;
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });
  if (cmsPage?.seoTitle) return { title: cmsPage.seoTitle, description: cmsPage.seoDesc };
  return { title: getPageTitle(locale, 'terms') };
}

const sections: Record<string, Array<{ title: string; body: string }>> = {
  zh: [
    { title: '服务说明', body: 'cnfranchise.com提供加盟品牌信息展示、搜索和咨询服务。我们努力确保信息的准确性和时效性，但不保证所有信息的绝对准确。' },
    { title: '用户责任', body: '用户在使用本服务时，应遵守相关法律法规，不得发布违法、虚假或侵权内容。' },
    { title: '知识产权', body: '本网站的所有内容均受知识产权保护。未经授权，禁止复制、修改或用于商业用途。' },
    { title: '免责声明', body: '提供的加盟信息仅供参考，不构成投资建议。用户在做出加盟决策前，应自行核实相关信息并承担相应风险。' },
    { title: '条款修改', body: '我们保留随时修改本条款的权利。修改后的条款将在网站上公布。' },
  ],
  en: [
    { title: 'Service Description', body: 'China Franchise Net provides franchise brand information display, search and consulting services.' },
    { title: 'User Responsibility', body: 'Users must comply with relevant laws and regulations when using our services.' },
    { title: 'Intellectual Property', body: 'All content on this website is protected by intellectual property rights.' },
    { title: 'Disclaimer', body: 'Franchise information provided is for reference only and does not constitute investment advice.' },
    { title: 'Terms Modification', body: 'We reserve the right to modify these terms at any time.' },
  ],
  th: [
    { title: 'คำอธิบายบริการ', body: 'China Franchise Net ให้บริการแสดงข้อมูล ค้นหา และปรึกษาแฟรนไชส์' },
    { title: 'ความรับผิดชอบของผู้ใช้', body: 'ผู้ใช้ต้องปฏิบัติตามกฎหมายที่เกี่ยวข้อง' },
    { title: 'ทรัพย์สินทางปัญญา', body: 'เนื้อหาทั้งหมดบนเว็บไซต์นี้ได้รับคุ้มครองโดยลิขสิทธิ์' },
    { title: 'การจำกัดความรับผิด', body: 'ข้อมูลแฟรนไชส์ที่ให้ไว้เพื่ออ้างอิงเท่านั้น' },
    { title: 'การแก้ไขข้อกำหนด', body: 'เราสงวนสิทธิ์ในการแก้ไขข้อกำหนดเหล่านี้' },
  ],
  vi: [
    { title: 'Mô Tả Dịch Vụ', body: 'China Franchise Net cung cấp dịch vụ hiển thị, tìm kiếm và tư vấn thông tin nhượng quyền.' },
    { title: 'Trách Nhiệm Người Dùng', body: 'Người dùng phải tuân thủ các luật và quy định liên quan khi sử dụng dịch vụ của chúng tôi.' },
    { title: 'Sở Hữu Trí Tuệ', body: 'Tất cả nội dung trên trang web này được bảo vệ bởi quyền sở hữu trí tuệ.' },
    { title: 'Miễn Trừ Trách Nhiệm', body: 'Thông tin nhượng quyền được cung cấp chỉ để tham khảo.' },
    { title: 'Sửa Đổi Điều Khoản', body: 'Chúng tôi giữ quyền sửa đổi các điều khoản này bất cứ lúc nào.' },
  ],
};

export default async function TermsPage({ params }: { params: { locale: string } }) {
  const locale = getLocaleParams({ params });
  const cmsSlug = locale === 'zh' ? 'terms' : `terms-${locale}`;
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });

  const title = locale === 'zh' ? '使用条款'
    : locale === 'en' ? 'Terms of Service'
    : locale === 'th' ? 'ข้อกำหนดการใช้งาน'
    : 'Điều Khoản Dịch Vụ';

  const subtitleMap: Record<string, string> = {
    zh: '使用我们的服务前，请仔细阅读以下条款',
    en: 'Please read the following terms carefully before using our services',
    th: 'โปรดอ่านข้อกำหนดต่อไปนี้ก่อนใช้บริการ',
    vi: 'Vui lòng đọc kỹ các điều khoản sau trước khi sử dụng dịch vụ',
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