import Link from 'next/link';
import { getLocaleParams } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

// 硬编码内容（作为 fallback）
const whyItems = {
  zh: [
    { icon: '🎯', title: '品牌背书，降低风险', desc: '成熟的品牌和标准化运营体系，让创业更有保障，降低试错成本' },
    { icon: '📈', title: '成熟商业模式，快速盈利', desc: '经过市场验证的商业模式、供应链和产品体系，快速实现盈利' },
    { icon: '🤝', title: '全程培训支持', desc: '总部提供从选址到运营的全流程培训与指导，无经验也能开店' },
    { icon: '📱', title: '数字化运营工具', desc: '提供全套数字化门店管理系统，数据化经营，降低管理难度' },
    { icon: '🌏', title: '出海发展机会', desc: '部分品牌提供海外加盟支持，助力有志向海外发展的创业者' },
    { icon: '💰', title: '多元盈利模式', desc: '总部持续研发新品，提供多元商品组合，提升门店坪效和人效' },
  ],
  en: [
    { icon: '🎯', title: 'Brand Endorsement, Reduced Risk', desc: 'Mature brand and standardized operations reduce entrepreneurial risk and trial costs' },
    { icon: '📈', title: 'Proven Business Model', desc: 'Market-tested business model, supply chain, and product system for quick profitability' },
    { icon: '🤝', title: 'Full Training Support', desc: 'HQ provides comprehensive training from location selection to operations' },
    { icon: '📱', title: 'Digital Operations Tools', desc: 'Complete digital store management system, data-driven operations' },
    { icon: '🌏', title: 'Overseas Expansion', desc: 'Some brands offer overseas franchise support for international entrepreneurs' },
    { icon: '💰', title: 'Diversified Revenue', desc: 'Continuous new product R&D provides diversified product mix to boost store efficiency' },
  ],
  th: [
    { icon: '🎯', title: 'แบรนด์รับประกัน', desc: 'แบรนด์ที่มีชื่อเสียงลดความเสี่ยง' },
    { icon: '📈', title: 'รูปแบบธุรกิจที่พิสูจน์แล้ว', desc: 'ระบบที่ผ่านการทดสอบตลาด' },
    { icon: '🤝', title: 'การฝึกอบรมเต็มรูปแบบ', desc: 'การสนับสนุนการฝึกอบรมจากสำนักงานใหญ่' },
    { icon: '📱', title: 'เครื่องมือดิจิทัล', desc: 'ระบบการจัดการร้านดิจิทัล' },
    { icon: '🌏', title: 'โอกาสต่างประเทศ', desc: 'การสนับสนุนแฟรนไชส์ต่างประเทศ' },
    { icon: '💰', title: 'รายได้หลากหลาย', desc: 'รูปแบบรายได้ที่หลากหลาย' },
  ],
  vi: [
    { icon: '🎯', title: 'Thương hiệu đảm bảo', desc: 'Thương hiệu nổi tiếng giảm rủi ro' },
    { icon: '📈', title: 'Mô hình đã được kiểm chứng', desc: 'Hệ thống đã qua thử nghiệm thị trường' },
    { icon: '🤝', title: 'Đào tạo toàn diện', desc: 'Hỗ trợ đào tạo từ trụ sở chính' },
    { icon: '📱', title: 'Công cụ kỹ thuật số', desc: 'Hệ thống quản lý cửa hàng số' },
    { icon: '🌏', title: 'Cơ hội quốc tế', desc: 'Hỗ trợ nhượng quyền quốc tế' },
    { icon: '💰', title: 'Thu nhập đa dạng', desc: 'Mô hình thu nhập đa dạng' },
  ],
};

const steps = {
  zh: [
    { num: '01', title: '选择品牌', desc: '浏览平台海量品牌，筛选适合自己的行业、预算和城市' },
    { num: '02', title: '联系咨询', desc: '填写咨询表单或直接联系品牌方，了解详细加盟条件' },
    { num: '03', title: '实地考察', desc: '前往品牌总部实地考察，体验产品，了解运营模式' },
    { num: '04', title: '签约缴费', desc: '签订加盟合同，缴纳加盟费用，获取品牌授权' },
    { num: '05', title: '选址装修', desc: '总部协助选址，统装统配，快速完成装修开业' },
    { num: '06', title: '培训开业', desc: '接受系统培训，配备开业支持，正式开业运营' },
  ],
  en: [
    { num: '01', title: 'Choose a Brand', desc: 'Browse platform brands, filter by industry, budget, and city' },
    { num: '02', title: 'Contact & Inquire', desc: 'Fill inquiry form or contact brand directly to learn franchise conditions' },
    { num: '03', title: 'On-site Visit', desc: 'Visit brand HQ, experience products, understand operations' },
    { num: '04', title: 'Sign & Pay', desc: 'Sign franchise contract, pay fees, obtain brand authorization' },
    { num: '05', title: 'Location & Renovation', desc: 'HQ assists with location selection, unified decoration, quick opening' },
    { num: '06', title: 'Training & Launch', desc: 'Receive systematic training, opening support, officially launch operations' },
  ],
  th: [
    { num: '01', title: 'เลือกแบรนด์', desc: 'เลือกแบรนด์ที่เหมาะสม' },
    { num: '02', title: 'ติดต่อสอบถาม', desc: 'ติดต่อเจ้าของแบรนด์' },
    { num: '03', title: 'เยี่ยมชม', desc: 'เยี่ยมชมสำนักงานใหญ่' },
    { num: '04', title: 'เซ็นสัญญา', desc: 'เซ็นสัญญาและชำระเงิน' },
    { num: '05', title: 'ตกแต่ง', desc: 'เลือกทำเลและตกแต่ง' },
    { num: '06', title: 'เปิดร้าน', desc: 'ฝึกอบรมและเปิดร้าน' },
  ],
  vi: [
    { num: '01', title: 'Chọn thương hiệu', desc: 'Chọn thương hiệu phù hợp' },
    { num: '02', title: 'Liên hệ', desc: 'Liên hệ chủ sở hữu' },
    { num: '03', title: 'Tham quan', desc: 'Tham quan trụ sở chính' },
    { num: '04', title: 'Ký hợp đồng', desc: 'Ký hợp đồng và thanh toán' },
    { num: '05', title: 'Trang trí', desc: 'Chọn vị trí và trang trí' },
    { num: '06', title: 'Khai trương', desc: 'Đào tạo và khai trương' },
  ],
};

const titles = {
  zh: { hero: '找到最适合您的加盟项目', sub: '海量优质品牌，专业顾问服务，助力您创业成功' },
  en: { hero: 'Find Your Perfect Franchise', sub: 'Quality brands and professional consulting for your entrepreneurial success' },
  th: { hero: 'หาแฟรนไชส์ที่เหมาะกับคุณ', sub: 'แบรนด์คุณภาพและที่ปรึกษามืออาชีพ' },
  vi: { hero: 'Tìm dự án nhượng quyền phù hợp', sub: 'Thương hiệu chất lượng và tư vấn chuyên nghiệp' },
};

// 生成元数据
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  
  // 尝试从 CMS 获取
  const cmsSlug = locale === 'zh' ? 'franchisee' : `franchisee-${locale}`;
  
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });
  
  if (cmsPage?.seoTitle) {
    return { title: cmsPage.seoTitle, description: cmsPage.seoDesc };
  }
  
  const titleMap: Record<string, string> = {
    zh: '成为加盟主 - cnfranchise.com',
    en: 'Become a Franchisee - China Franchise Net',
    th: 'เป็นผู้รับแฟรนไชส์ - China Franchise Net',
    vi: 'Trở thành Bên nhận nhượng quyền',
  };
  
  return { title: titleMap[locale] || titleMap.zh };
}

export default async function FranchiseePage({ params }: { params: { locale: string } }) {
  const locale = getLocaleParams({ params });
  const t = translations[locale] || translations.zh;
  
  // 尝试从 CMS 获取页面内容
  const cmsSlug = locale === 'zh' ? 'franchisee' : `franchisee-${locale}`;
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });
  
  // 如果有 CMS 内容，使用 CMS 内容；否则使用硬编码
  const items = cmsPage ? null : ((whyItems as any)[locale] || whyItems.zh);
  const stepList = cmsPage ? null : ((steps as any)[locale] || steps.zh);
  const title = cmsPage ? null : ((titles as any)[locale] || titles.zh);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            {locale === 'zh' ? '加盟创业服务' : 'Franchise Entrepreneurial Services'}
          </div>
          
          {cmsPage ? (
            <div dangerouslySetInnerHTML={{ __html: cmsPage.content }} className="cms-content text-white" />
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{title.hero}</h1>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">{title.sub}</p>
            </>
          )}
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/${locale}/categories`} className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-all">
              {locale === 'zh' ? '浏览加盟品牌' : 'Browse Franchise Brands'}
            </Link>
            <a href="#contact" className="px-8 py-3 bg-primary/80 text-white font-bold rounded-xl hover:bg-primary transition-all border border-white/20">
              {locale === 'zh' ? '免费咨询顾问' : 'Free Consultation'}
            </a>
          </div>
        </div>
      </section>

      {/* Why Join - 仅在没有 CMS 内容时显示硬编码 */}
      {!cmsPage && items && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">
              {locale === 'zh' ? '为什么选择加盟创业？' : locale === 'en' ? 'Why Choose Franchise Entrepreneurship?' : 'Tại sao chọn khởi nghiệp nhượng quyền?'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item: any, i: number) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 hover:shadow-md transition-all flex gap-4">
                  <div className="text-3xl shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CMS 额外内容区域 */}
      {cmsPage && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div dangerouslySetInnerHTML={{ __html: cmsPage.content }} className="cms-content" />
          </div>
        </section>
      )}

      {/* Steps - 仅在没有 CMS 内容时显示硬编码 */}
      {!cmsPage && stepList && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-4">
              {locale === 'zh' ? '加盟创业六步走' : locale === 'en' ? '6 Steps to Franchise Success' : '6 bước thành công nhượng quyền'}
            </h2>
            <p className="text-center text-slate-500 mb-12">
              {locale === 'zh' ? '从选择品牌到开业运营，我们全程陪伴' : 'From brand selection to operations, we are with you every step'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stepList.map((s: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm flex gap-4 items-start hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-lg shrink-0">
                    {s.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brands Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {locale === 'zh' ? '热门加盟品牌' : locale === 'en' ? 'Popular Franchise Brands' : 'Thương hiệu nhượng quyền phổ biến'}
            </h2>
            <Link href={`/${locale}/categories`} className="text-primary font-medium hover:underline">
              {locale === 'zh' ? '查看全部品牌 →' : 'View All Brands →'}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: '挞柠柠檬茶', fee: '15-25万', stores: '480+ / 海外20', tag: '茶饮', icon: '🍋', color: '#10b981' },
              { name: '瑞幸咖啡', fee: '面议', stores: '17500+ / 海外500', tag: '咖啡', icon: '☕', color: '#8b5cf6' },
              { name: '杨国福麻辣烫', fee: '面议', stores: '5800+ / 海外200', tag: '小吃', icon: '🔥', color: '#ef4444' },
            ].map((b: any, i: number) => (
              <Link key={i} href={`/${locale}/brand/${b.slug || 'tanning-ningcc'}`} className="border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${b.color}15` }}>{b.icon}</div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{b.name}</h3>
                    <span className="text-xs text-slate-400">{b.tag}</span>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div><span className="text-slate-400">{locale === 'zh' ? '加盟费：' : 'Fee: '}</span><span className="font-medium text-primary">{b.fee}</span></div>
                  <div><span className="text-slate-400">{locale === 'zh' ? '门店：' : 'Stores: '}</span><span className="font-medium">{b.stores}</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-16 bg-gradient-to-br from-primary to-blue-700 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {locale === 'zh' ? '还在犹豫？让顾问帮您分析！' : 'Not Sure? Let Our Consultants Help!'}
          </h2>
          <p className="text-slate-200 mb-8">
            {locale === 'zh' ? '专业顾问团队根据您的预算、地域和兴趣，精准推荐最适合您的加盟品牌' : 'Professional consultants will recommend the most suitable franchise brand based on your budget, location, and interests'}
          </p>
          <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-all text-lg">
            {locale === 'zh' ? '立即预约顾问 →' : 'Book a Consultant Now →'}
          </Link>
        </div>
      </section>
    </div>
  );
}
