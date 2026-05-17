import Link from 'next/link';
import { getLocaleParams } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

// 硬编码内容（作为 fallback）
const franchiseSteps = {
  zh: [
    { step: '01', title: '品牌诊断与定位', desc: '深入了解您的品牌现状，分析核心优势，确定加盟定位与市场策略' },
    { step: '02', title: '标准化体系建设', desc: '搭建完整的运营标准化体系（SOP），包括选址、培训、供应链、营销等全流程' },
    { step: '03', title: '法律文件准备', desc: '准备特许经营合同、加盟手册等法律文件，确保合规运营' },
    { step: '04', title: '试点运营验证', desc: '选取试点门店验证模型，收集数据，优化运营流程' },
    { step: '05', title: '全国招商推广', desc: '通过平台多渠道推广，精准对接意向加盟商，高效扩张' },
  ],
  en: [
    { step: '01', title: 'Brand Diagnosis & Positioning', desc: 'Analyze your brand status and identify core advantages to determine franchise positioning and market strategy' },
    { step: '02', title: 'Standard System Building', desc: 'Build complete operation standards (SOP) covering location selection, training, supply chain, and marketing' },
    { step: '03', title: 'Legal Documentation', desc: 'Prepare franchise contracts and manuals, ensuring compliant operations' },
    { step: '04', title: 'Pilot Operation Verification', desc: 'Test store model, collect data, and optimize operations' },
    { step: '05', title: 'Nationwide Recruitment', desc: 'Multi-channel promotion through the platform, connecting with qualified franchisees' },
  ],
  th: [
    { step: '01', title: 'วินิจฉัยแบรนด์', desc: 'วิเคราะห์สถานะแบรนด์และจุดแข็งหลัก' },
    { step: '02', title: 'สร้างระบบมาตรฐาน', desc: 'สร้างมาตรฐานการดำเนินงานที่สมบูรณ์' },
    { step: '03', title: 'จัดทำเอกสาร', desc: 'เตรียมสัญญาและคู่มือแฟรนไชส์' },
    { step: '04', title: 'ทดสอบการดำเนินงาน', desc: 'ทดสอบรูปแบบร้านและปรับปรุง' },
    { step: '05', title: 'ขยายทั่วประเทศ', desc: 'โปรโมตผ่านแพลตฟอร์มและหาผู้รับสิทธิ์' },
  ],
  vi: [
    { step: '01', title: 'Chẩn đoán thương hiệu', desc: 'Phân tích trạng thái thương hiệu và lợi thế cốt lõi' },
    { step: '02', title: 'Xây dựng hệ thống', desc: 'Xây dựng hệ thống vận hành chuẩn hóa' },
    { step: '03', title: 'Chuẩn bị tài liệu', desc: 'Chuẩn bị hợp đồng và sổ tay nhượng quyền' },
    { step: '04', title: 'Thử nghiệm', desc: 'Kiểm tra mô hình cửa hàng và tối ưu hóa' },
    { step: '05', title: 'Mở rộng', desc: 'Quảng bá đa kênh và tìm đối tác' },
  ],
};

const benefits = {
  zh: [
    { icon: '🚀', title: '快速规模化扩张', desc: '借助加盟商资源实现轻资产快速扩张，降低直营开店成本' },
    { icon: '💰', title: '多元化收入来源', desc: '收取加盟费、品牌管理费、供应链利润等多重收入' },
    { icon: '🌏', title: '品牌全国覆盖', desc: '通过加盟网络快速覆盖全国各线城市，提升品牌知名度' },
    { icon: '📊', title: '降低运营风险', desc: '加盟商承担门店运营风险，总部聚焦品牌与产品研发' },
  ],
  en: [
    { icon: '🚀', title: 'Rapid Scale Expansion', desc: 'Leverage franchisee resources for asset-light growth and reduced direct store costs' },
    { icon: '💰', title: 'Diversified Revenue', desc: 'Multiple income streams from franchise fees, management fees, and supply chain margins' },
    { icon: '🌏', title: 'Nationwide Brand Coverage', desc: 'Quickly cover cities nationwide through franchise network, increasing brand awareness' },
    { icon: '📊', title: 'Reduced Operational Risk', desc: 'Franchisees bear store operation risks while HQ focuses on brand and product R&D' },
  ],
  th: [
    { icon: '🚀', title: 'ขยายตัวเร็ว', desc: 'ใช้ทรัพยากรผู้รับสิทธิ์เพื่อการเติบโต' },
    { icon: '💰', title: 'รายได้หลากหลาย', desc: 'รายได้จากค่าธรรมเนียมและการจัดการ' },
    { icon: '🌏', title: 'ครอบคลุมทั่วประเทศ', desc: 'ขยายเครือข่ายแฟรนไชส์ทั่วประเทศ' },
    { icon: '📊', title: 'ลดความเสี่ยง', desc: 'ผู้รับสิทธิ์รับความเสี่ยงการดำเนินงาน' },
  ],
  vi: [
    { icon: '🚀', title: 'Mở rộng nhanh', desc: 'Tận dụng nguồn lực để tăng trưởng' },
    { icon: '💰', title: 'Thu nhập đa dạng', desc: 'Nhiều nguồn thu từ phí nhượng quyền' },
    { icon: '🌏', title: 'Bao phủ toàn quốc', desc: 'Mở rộng mạng lưới nhượng quyền' },
    { icon: '📊', title: 'Giảm rủi ro', desc: 'Đối tác chịu rủi ro vận hành' },
  ],
};

const titles = {
  zh: { hero: '让您的品牌插上加盟的翅膀', sub: '专业加盟发展服务，助力品牌规模化成长' },
  en: { hero: 'Scale Your Brand with Franchise', sub: 'Professional franchise development services for brand growth' },
  th: { hero: 'ขยายแบรนด์ด้วยแฟรนไชส์', sub: 'บริการพัฒนาแฟรนไชส์มืออาชีพ' },
  vi: { hero: 'Phát triển thương hiệu với nhượng quyền', sub: 'Dịch vụ phát triển nhượng quyền chuyên nghiệp' },
};

// 生成元数据
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  
  const cmsSlug = locale === 'zh' ? 'franchise' : `franchise-${locale}`;
  
  // 尝试从 CMS 获取
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });
  
  if (cmsPage?.seoTitle) {
    return { title: cmsPage.seoTitle, description: cmsPage.seoDesc };
  }
  
  const titleMap: Record<string, string> = {
    zh: '成为加盟商 - cnfranchise.com',
    en: 'Become a Franchisor - China Franchise Net',
    th: 'เป็นผู้รับสิทธิ์แฟรนไชส์ - China Franchise Net',
    vi: 'Trở thành Bên nhượng quyền',
  };
  
  return { title: titleMap[locale] || titleMap.zh };
}

export default async function FranchisePage({ params }: { params: { locale: string } }) {
  const locale = getLocaleParams({ params });
  const t = translations[locale] || translations.zh;
  
  // 尝试从 CMS 获取页面内容
  const cmsSlug = locale === 'zh' ? 'franchise' : `franchise-${locale}`;
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });
  
  // 如果有 CMS 内容，使用 CMS 内容；否则使用硬编码
  const steps = cmsPage ? null : ((franchiseSteps as any)[locale] || franchiseSteps.zh);
  const benefitList = cmsPage ? null : ((benefits as any)[locale] || benefits.zh);
  const title = cmsPage ? null : ((titles as any)[locale] || titles.zh);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            {locale === 'zh' ? '品牌加盟发展服务' : locale === 'en' ? 'Brand Franchise Development' : 'Dịch vụ phát triển nhượng quyền'}
          </div>
          
          {/* Hero 区域始终显示标题，CMS 内容在下方单独区域渲染 */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {cmsPage?.title || title?.hero || (locale === 'zh' ? '让您的品牌插上加盟的翅膀' : 'Scale Your Brand with Franchise')}
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            {locale === 'zh' ? '专业加盟发展服务，助力品牌规模化成长' : locale === 'en' ? 'Professional franchise development services for brand growth' : 'Dịch vụ phát triển nhượng quyền chuyên nghiệp'}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#process" className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all">
              {locale === 'zh' ? '了解加盟流程' : 'View Process'}
            </a>
            <a href="#contact" className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all">
              {locale === 'zh' ? '立即咨询' : 'Contact Us Now'}
            </a>
          </div>
        </div>
      </section>

      {/* Benefits - 仅在没有 CMS 内容时显示硬编码 */}
      {!cmsPage && benefitList && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">
              {locale === 'zh' ? '为什么选择加盟发展？' : locale === 'en' ? 'Why Choose Franchise Development?' : 'Tại sao chọn phát triển nhượng quyền?'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefitList.map((b: any, i: number) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                  <div className="text-4xl mb-3">{b.icon}</div>
                  <h3 className="font-bold text-slate-800 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CMS 内容区域 - 仅在此处渲染 CMS 内容 */}
      {cmsPage && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div dangerouslySetInnerHTML={{ __html: cmsPage.content }} className="cms-content" />
          </div>
        </section>
      )}

      {/* Process - 仅在没有 CMS 内容时显示硬编码 */}
      {!cmsPage && steps && (
        <section id="process" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">
              {locale === 'zh' ? '加盟发展五步法' : locale === 'en' ? '5-Step Franchise Development' : 'Quy trình 5 bước phát triển nhượng quyền'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {steps.map((s: any, i: number) => (
                <div key={i} className="relative bg-white rounded-2xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-lg mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 text-xl">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Brands */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            {locale === 'zh' ? '成功案例' : locale === 'en' ? 'Success Stories' : 'Câu chuyện thành công'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: '霸王茶姬', desc: locale === 'zh' ? '从云南小店到全球4000+门店，中国茶饮出海标杆品牌' : 'From Yunnan shop to 4000+ stores worldwide', icon: '🍵', color: '#10b981' },
              { name: '瑞幸咖啡', desc: locale === 'zh' ? '数字化运营领先，18000+门店，中国咖啡第一品牌' : 'Digital operations leader, 18000+ stores', icon: '☕', color: '#8b5cf6' },
              { name: '杨国福麻辣烫', desc: locale === 'zh' ? '国民麻辣烫第一品牌，6000+门店，遍布全国及海外' : '6000+ stores nationwide and overseas', icon: '🔥', color: '#ef4444' },
            ].map((b: any, i: number) => (
              <div key={i} className="border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4" style={{ background: `${b.color}15` }}>{b.icon}</div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{b.name}</h3>
                <p className="text-sm text-slate-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-16 bg-gradient-to-br from-primary to-blue-700 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {locale === 'zh' ? '准备好开启您的加盟之旅了吗？' : 'Ready to Start Your Franchise Journey?'}
          </h2>
          <p className="text-slate-200 mb-8">
            {locale === 'zh' ? '专业顾问团队将为您提供一对一的加盟发展咨询服务' : 'Our professional consultants will provide one-on-one franchise development consultation'}
          </p>
          <a href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-all text-lg">
            {locale === 'zh' ? '立即咨询 →' : 'Contact Us Now →'}
          </a>
        </div>
      </section>
    </div>
  );
}
