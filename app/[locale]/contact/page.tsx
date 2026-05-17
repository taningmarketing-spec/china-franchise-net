import { getLocaleParams, getPageTitle } from '@/lib/locale-utils';
import { prisma } from '@/lib/prisma';
import ContactForm from '@/components/front/ContactForm';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  const cmsSlug = locale === 'zh' ? 'contact' : `contact-${locale}`;
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });
  if (cmsPage?.seoTitle) return { title: cmsPage.seoTitle, description: cmsPage.seoDesc };
  return { title: getPageTitle(locale, 'contact') };
}

const hardcoded: Record<string, {
  title: string;
  subtitle: string;
  name: string; phone: string; email: string; msg: string; submit: string;
  addressLabel: string;
  contactTitle: string; formTitle: string;
  address: string; emailAddr: string; phoneNum: string;
  successTitle: string; successDesc: string; errorText: string;
  submitting: string; privacyNote: string;
}> = {
  zh: {
    title: '联系我们', subtitle: '如果您有任何问题或合作意向，欢迎通过以下方式联系我们',
    name: '您的姓名 *', phone: '联系电话 *', email: '电子邮箱', msg: '咨询内容', submit: '提交咨询',
    addressLabel: '地址',
    contactTitle: '联系方式', formTitle: '在线咨询',
    address: '广州市海珠区昌岗东路257号13楼', emailAddr: 'contact@cnfranchise.com', phoneNum: '+86 138 0242 9520',
    successTitle: '提交成功！', successDesc: '顾问将在24小时内联系您，请保持电话畅通', errorText: '请填写姓名和电话',
    submitting: '提交中...', privacyNote: '您的信息仅用于联系用途，不会泄露给第三方',
  },
  en: {
    title: 'Contact Us', subtitle: 'If you have any questions or cooperation intentions, please contact us',
    name: 'Your Name *', phone: 'Phone Number *', email: 'Email Address', msg: 'Your Message', submit: 'Submit',
    addressLabel: 'Address',
    contactTitle: 'Contact Info', formTitle: 'Online Inquiry',
    address: '13F, No.257 Changgang East Rd, Haizhu, Guangzhou', emailAddr: 'contact@cnfranchise.com', phoneNum: '+86 138 0242 9520',
    successTitle: 'Submitted!', successDesc: 'Our consultant will contact you within 24 hours', errorText: 'Name and phone are required',
    submitting: 'Submitting...', privacyNote: 'Your information is used for contact purposes only',
  },
  th: {
    title: 'ติดต่อเรา', subtitle: 'หากคุณมีคำถามหรือต้องการร่วมมือ กรุณาติดต่อเรา',
    name: 'ชื่อของคุณ *', phone: 'เบอร์โทรศัพท์ *', email: 'อีเมล', msg: 'ข้อความ', submit: 'ส่ง',
    addressLabel: 'ที่อยู่',
    contactTitle: 'ข้อมูลติดต่อ', formTitle: 'สอบถามออนไลน์',
    address: '13F, No.257 Changgang East Rd, Haizhu, Guangzhou', emailAddr: 'contact@cnfranchise.com', phoneNum: '+86 138 0242 9520',
    successTitle: 'ส่งสำเร็จ!', successDesc: 'ที่ปรึกษาจะติดต่อคุณภายใน 24 ชั่วโมง', errorText: 'กรุณากรอกชื่อและเบอร์โทร',
    submitting: 'กำลังส่ง...', privacyNote: 'ข้อมูลของคุณจะใช้เพื่อการติดต่อเท่านั้น',
  },
  vi: {
    title: 'Liên Hệ', subtitle: 'Nếu bạn có câu hỏi hoặc muốn hợp tác, vui lòng liên hệ với chúng tôi',
    name: 'Họ Tên *', phone: 'Số Điện Thoại *', email: 'Email', msg: 'Nội Dung', submit: 'Gửi',
    addressLabel: 'Địa Chỉ',
    contactTitle: 'Thông Tin Liên Hệ', formTitle: 'Tư Vấn Trực Tuyến',
    address: '13F, No.257 Changgang East Rd, Haizhu, Guangzhou', emailAddr: 'contact@cnfranchise.com', phoneNum: '+86 138 0242 9520',
    successTitle: 'Gửi thành công!', successDesc: 'Tư vấn viên sẽ liên hệ bạn trong 24 giờ', errorText: 'Vui lòng điền họ tên và số điện thoại',
    submitting: 'Đang gửi...', privacyNote: 'Thông tin của bạn chỉ dùng để liên hệ',
  },
};

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const locale = getLocaleParams({ params });
  const cmsSlug = locale === 'zh' ? 'contact' : `contact-${locale}`;
  const cmsPage = await prisma.cmsPage.findFirst({
    where: { slug: cmsSlug, locale, status: 'published' },
  });
  const c = hardcoded[locale] || hardcoded.zh;

  return (
    <div className="page-enter">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-4">{c.title}</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">{c.subtitle}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 联系信息 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6">{c.contactTitle}</h2>
              <div className="space-y-4">
                {[
                  ['📧', c.emailAddr, 'Email'],
                  ['📱', c.phoneNum, locale === 'zh' ? '电话' : locale === 'en' ? 'Phone' : locale === 'th' ? 'โทรศัพท์' : 'Điện Thoại'],
                  ['📍', c.address, c.addressLabel],
                ].map(([icon, val, label]) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-xl shrink-0">{icon}</div>
                    <div><div className="font-medium text-slate-800">{label}</div><div className="text-sm text-slate-500">{val}</div></div>
                  </div>
                ))}
              </div>
            </div>
            {/* 联系表单 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6">{c.formTitle}</h2>
              <ContactForm
                labels={{ name: c.name, phone: c.phone, email: c.email, msg: c.msg, submit: c.submit }}
                successTitle={c.successTitle}
                successDesc={c.successDesc}
                errorText={c.errorText}
                submitting={c.submitting}
                privacyNote={c.privacyNote}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
