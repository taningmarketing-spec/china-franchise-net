'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';

interface Service {
  id: string;
  icon: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  locale: Locale;
}

type ContactMethod = 'wechat' | 'form' | null;

export default function ServiceInquiryModal({ isOpen, onClose, service, locale }: Props) {
  const [contactMethod, setContactMethod] = useState<ContactMethod>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !service) return null;

  const wechatId = 'cnfranchise'; // 客服微信号

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(wechatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.company ? `[${formData.company}] ${formData.message}` : formData.message,
        }),
      });
      if (!res.ok) throw new Error('Failed');
    } catch (err) {
      setIsSubmitting(false);
      return;
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setContactMethod(null);
    setIsSubmitted(false);
    setFormData({ name: '', phone: '', email: '', company: '', message: '' });
    onClose();
  };

  const texts: Record<Locale, {
    title: string;
    subtitle: string;
    wechat: string;
    wechatDesc: string;
    wechatId: string;
    copy: string;
    copied: string;
    form: string;
    formDesc: string;
    name: string;
    phone: string;
    email: string;
    company: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    close: string;
    required: string;
  }> = {
    zh: {
      title: '咨询服务',
      subtitle: '选择您偏好的咨询方式',
      wechat: '微信咨询',
      wechatDesc: '添加客服微信，快速获得专业解答',
      wechatId: '微信号',
      copy: '复制',
      copied: '已复制',
      form: '表单咨询',
      formDesc: '填写表单，我们将尽快与您联系',
      name: '您的姓名 *',
      phone: '联系电话 *',
      email: '电子邮箱',
      company: '公司名称',
      message: '咨询内容',
      messagePlaceholder: '请描述您的出海需求或问题...',
      submit: '提交咨询',
      submitting: '提交中...',
      successTitle: '提交成功！',
      successDesc: '我们的出海顾问将在24小时内与您联系',
      close: '关闭',
      required: '请填写必填项',
    },
    en: {
      title: 'Consultation Service',
      subtitle: 'Choose your preferred contact method',
      wechat: 'WeChat',
      wechatDesc: 'Add our WeChat for quick professional advice',
      wechatId: 'WeChat ID',
      copy: 'Copy',
      copied: 'Copied',
      form: 'Contact Form',
      formDesc: 'Fill out the form and we will contact you soon',
      name: 'Your Name *',
      phone: 'Phone Number *',
      email: 'Email',
      company: 'Company Name',
      message: 'Message',
      messagePlaceholder: 'Please describe your overseas expansion needs...',
      submit: 'Submit Inquiry',
      submitting: 'Submitting...',
      successTitle: 'Submitted Successfully!',
      successDesc: 'Our overseas consultant will contact you within 24 hours',
      close: 'Close',
      required: 'Please fill in required fields',
    },
    th: {
      title: 'บริการให้คำปรึกษา',
      subtitle: 'เลือกวิธีการติดต่อที่คุณต้องการ',
      wechat: 'WeChat',
      wechatDesc: 'เพิ่ม WeChat เพื่อรับคำแนะนำอย่างรวดเร็ว',
      wechatId: 'WeChat ID',
      copy: 'คัดลอก',
      copied: 'คัดลอกแล้ว',
      form: 'แบบฟอร์มติดต่อ',
      formDesc: 'กรอกแบบฟอร์มและเราจะติดต่อคุณโดยเร็วที่สุด',
      name: 'ชื่อของคุณ *',
      phone: 'เบอร์โทรศัพท์ *',
      email: 'อีเมล',
      company: 'ชื่อบริษิท',
      message: 'ข้อความ',
      messagePlaceholder: 'โปรดอธิบายความต้องการในการขยายตลาดต่างประเทศ...',
      submit: 'ส่งคำถาม',
      submitting: 'กำลังส่ง...',
      successTitle: 'ส่งสำเร็จ!',
      successDesc: 'ที่ปรึกษาของเราจะติดต่อคุณภายใน 24 ชั่วโมง',
      close: 'ปิด',
      required: 'กรุณากรอกข้อมูลที่จำเป็น',
    },
    vi: {
      title: 'Dịch vụ tư vấn',
      subtitle: 'Chọn phương thức liên hệ bạn muốn',
      wechat: 'WeChat',
      wechatDesc: 'Thêm WeChat để nhận tư vấn chuyên nghiệp nhanh chóng',
      wechatId: 'WeChat ID',
      copy: 'Sao chép',
      copied: 'Đã sao chép',
      form: 'Biểu mẫu liên hệ',
      formDesc: 'Điền biểu mẫu và chúng tôi sẽ liên hệ bạn sớm',
      name: 'Họ tên *',
      phone: 'Số điện thoại *',
      email: 'Email',
      company: 'Tên công ty',
      message: 'Tin nhắn',
      messagePlaceholder: 'Vui lòng mô tả nhu cầu mở rộng quốc tế của bạn...',
      submit: 'Gửi yêu cầu',
      submitting: 'Đang gửi...',
      successTitle: 'Gửi thành công!',
      successDesc: 'Tư vấn viên của chúng tôi sẽ liên hệ bạn trong 24 giờ',
      close: 'Đóng',
      required: 'Vui lòng điền các trường bắt buộc',
    },
  };

  const t = texts[locale] || texts.zh;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg">{t.title}</h3>
            <p className="text-white/80 text-sm">{service.name[locale]}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {!contactMethod && !isSubmitted && (
            <>
              <p className="text-slate-600 text-center mb-6">{t.subtitle}</p>
              
              <div className="grid grid-cols-2 gap-4">
                {/* WeChat Option */}
                <button
                  onClick={() => setContactMethod('wechat')}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                    💬
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-800">{t.wechat}</div>
                    <div className="text-xs text-slate-500 mt-1">{t.wechatDesc}</div>
                  </div>
                </button>

                {/* Form Option */}
                <button
                  onClick={() => setContactMethod('form')}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                    📝
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-800">{t.form}</div>
                    <div className="text-xs text-slate-500 mt-1">{t.formDesc}</div>
                  </div>
                </button>
              </div>
            </>
          )}

          {contactMethod === 'wechat' && !isSubmitted && (
            <div className="text-center py-4">
              <div className="w-24 h-24 bg-green-500 rounded-2xl flex items-center justify-center text-white text-4xl mx-auto mb-4">
                💬
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{t.wechat}</h4>
              <p className="text-slate-500 text-sm mb-6">{t.wechatDesc}</p>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="text-sm text-slate-500 mb-1">{t.wechatId}</div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl font-mono font-semibold text-slate-800">{wechatId}</span>
                  <button
                    onClick={handleCopyWechat}
                    className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    {copied ? t.copied : t.copy}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setContactMethod(null)}
                className="text-slate-500 hover:text-slate-700 text-sm"
              >
                ← {t.close}
              </button>
            </div>
          )}

          {contactMethod === 'form' && !isSubmitted && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t.name}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t.company}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t.message}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder={t.messagePlaceholder}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setContactMethod(null)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  {t.close}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? t.submitting : t.submit}
                </button>
              </div>
            </form>
          )}

          {isSubmitted && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-3xl mx-auto mb-4">
                ✓
              </div>
              <h4 className="font-bold text-slate-800 text-lg mb-2">{t.successTitle}</h4>
              <p className="text-slate-500 mb-6">{t.successDesc}</p>
              <button
                onClick={handleClose}
                className="px-8 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
              >
                {t.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
