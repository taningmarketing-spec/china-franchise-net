'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';

interface ContactModalProps {
  brandName?: string;
  isOpen: boolean;
  onClose: () => void;
  locale?: string;
}

interface ContactMethod {
  id: string;
  icon: React.ReactNode;
  label: string;
  labelEn: string;
  value: string;
  color: string;
  bgColor: string;
  action: 'copy' | 'link' | 'tel';
  link?: string;
}

const WechatIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#07C160">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89l-.007-.033zm-2.713 2.609c.535 0 .969.44.969.982a.976.976 0 01-.97.982.976.976 0 01-.969-.982c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.97.982.976.976 0 01-.969-.982c0-.542.434-.982.97-.982z"/>
  </svg>
);

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

const localeLabels = {
  zh: { weChat: '微信咨询', whatsApp: 'WhatsApp 咨询', phone: '电话咨询', email: '邮件咨询', copied: '✓ 已复制', copy: '复制', open: '打开', call: '拨打', title: '选择联系方式', subtitle: 'Choose Contact Method', workHours: '工作时间：周一至周六 9:00-18:00 (GMT+8)', consulting: '咨询' },
  en: { weChat: 'WeChat', whatsApp: 'WhatsApp', phone: 'Phone', email: 'Email', copied: '✓ Copied', copy: 'Copy', open: 'Open', call: 'Call', title: 'Choose Contact Method', subtitle: 'Choose Contact Method', workHours: 'Hours: Mon-Sat 9:00-18:00 (GMT+8)', consulting: 'Consulting' },
  th: { weChat: 'สอบถามผ่าน WeChat', whatsApp: 'สอบถาม WhatsApp', phone: 'โทรศัพท์', email: 'อีเมล', copied: '✓ คัดลอกแล้ว', copy: 'คัดลอก', open: 'เปิด', call: 'โทร', title: 'เลือกวิธีติดต่อ', subtitle: 'เลือกวิธีติดต่อ', workHours: 'เวลาทำการ: จันทร์-เสาร์ 09:00-18:00 (GMT+8)', consulting: 'สอบถาม' },
  vi: { weChat: 'WeChat', whatsApp: 'WhatsApp', phone: 'Điện thoại', email: 'Email', copied: '✓ Đã sao chép', copy: 'Sao chép', open: 'Mở', call: 'Gọi', title: 'Chọn phương thức liên hệ', subtitle: 'Chọn phương thức liên hệ', workHours: 'Giờ làm việc: Thứ 2-Thứ 7 09:00-18:00 (GMT+8)', consulting: 'Tư vấn' },
};

export default function ContactModal({ brandName, isOpen, onClose, locale = 'zh' }: ContactModalProps) {
  const { settings } = useSettings();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([]);
  const l = (localeLabels as any)[locale] || localeLabels.zh;

  useEffect(() => {
    const methods: ContactMethod[] = [
      {
        id: 'wechat',
        icon: <WechatIcon />,
        label: l.weChat,
        labelEn: 'WeChat',
        value: settings.contactWechat,
        color: '#07C160',
        bgColor: '#07C16010',
        action: 'copy',
      },
      {
        id: 'whatsapp',
        icon: <WhatsappIcon />,
        label: l.whatsApp,
        labelEn: 'WhatsApp',
        value: settings.contactWhatsapp,
        color: '#25D366',
        bgColor: '#25D36610',
        action: 'link',
        link: `https://wa.me/${settings.contactWhatsapp.replace(/\D/g, '')}?text=Hi%2C%20I%20am%20interested%20in%20franchise%20opportunities.`,
      },
      {
        id: 'phone',
        icon: <PhoneIcon />,
        label: l.phone,
        labelEn: 'Phone Call',
        value: settings.contactPhone,
        color: '#1a56db',
        bgColor: '#1a56db10',
        action: 'tel',
        link: `tel:${settings.contactPhone.replace(/\D/g, '')}`,
      },
      {
        id: 'email',
        icon: <EmailIcon />,
        label: l.email,
        labelEn: 'Email',
        value: settings.contactEmail,
        color: '#ea580c',
        bgColor: '#ea580c10',
        action: 'link',
        link: `mailto:${settings.contactEmail}?subject=Franchise%20Inquiry&body=Hi%2C%20I%20am%20interested%20in%20franchise%20opportunities.`,
      },
    ];
    setContactMethods(methods);
  }, [settings, l]);

  if (!isOpen) return null;

  const handleAction = (method: ContactMethod) => {
    switch (method.action) {
      case 'copy':
        navigator.clipboard.writeText(method.value);
        setCopiedId(method.id);
        setTimeout(() => setCopiedId(null), 2000);
        break;
      case 'link':
        if (method.link) window.open(method.link, '_blank');
        break;
      case 'tel':
        if (method.link) window.location.href = method.link;
        break;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
          <div className="gradient-primary text-white px-6 py-5 text-center relative">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-lg">×</button>
            <div className="text-3xl mb-2">💬</div>
            <h2 className="text-xl font-bold">{l.title}</h2>
            <p className="text-blue-200 text-sm mt-1">{l.subtitle}</p>
            {brandName && (
              <p className="text-blue-300 text-xs mt-2 bg-white/10 rounded-full px-3 py-1 inline-block">
                {l.consulting}：{brandName}
              </p>
            )}
          </div>

          <div className="p-5 space-y-3">
            {contactMethods.map(method => (
              <button
                key={method.id}
                onClick={() => handleAction(method)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all"
                style={{ backgroundColor: copiedId === method.id ? method.bgColor : undefined }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: method.bgColor }}>
                  {method.icon}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-semibold text-slate-800 text-sm">{method.label}</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">{method.labelEn}</div>
                  <div className="text-xs text-slate-500 mt-1 truncate">{method.value}</div>
                </div>
                <div className="shrink-0">
                  {copiedId === method.id ? (
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: method.color }}>{l.copied}</span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: method.color }}>
                      {method.action === 'copy' ? l.copy : method.action === 'link' ? l.open : l.call}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="px-5 pb-5 pt-0">
            <p className="text-[11px] text-slate-400 text-center leading-relaxed">{l.workHours}</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoom-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-in { animation-duration: 200ms; animation-timing-function: ease-out; animation-fill-mode: both; }
        .fade-in { animation-name: fade-in; }
        .zoom-in { animation-name: zoom-in; }
      `}</style>
    </>
  );
}