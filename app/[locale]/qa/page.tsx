import Link from 'next/link';
import { getLocaleParams } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  return {
    title: locale === 'zh' ? '海外加盟Q&A - cnfranchise.com'
      : locale === 'en' ? 'Overseas Franchise Q&A - China Franchise Net'
      : 'Hỏi đáp Nhượng quyền Quốc tế',
  };
}

export default async function QaPage({ params }: { params: { locale: string } }) {
  const locale = getLocaleParams({ params });
  const t = translations[locale] || translations.zh;

  // 从数据库读取FAQ
  const faqList = await prisma.faq.findMany({
    where: {
      locale,
      status: 'published',
    },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {locale === 'zh' ? '海外加盟Q&A' : locale === 'en' ? 'Overseas Franchise Q&A' : 'Hỏi Đáp Nhượng Quyền Quốc Tế'}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {locale === 'zh' ? '解答您在海外加盟过程中的常见疑问，助力您的国际化发展之路'
              : locale === 'en' ? 'Answers to common questions about overseas franchise, supporting your international development journey'
              : 'Giải đáp thắc mắc phổ biến trong quá trình nhượng quyền quốc tế'}
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-8">
            {locale === 'zh' ? '常见问题' : locale === 'en' ? 'Common Questions' : 'Câu hỏi phổ biến'}
          </h2>
          <div className="space-y-4">
            {faqList.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <div className="text-4xl mb-3">📝</div>
                <p>{locale === 'zh' ? '暂无问答，敬请期待...' : locale === 'en' ? 'No FAQs yet, stay tuned...' : 'Chưa có câu hỏi, hãy chờ...'}</p>
              </div>
            ) : faqList.map((faq, i) => (
              <details key={faq.id} className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-bold text-slate-800 group-hover:text-primary transition-colors">{faq.question}</span>
                  </div>
                  <span className="shrink-0 text-slate-400 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 ml-11">
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 bg-gradient-to-br from-primary/5 to-indigo-50 rounded-2xl p-8 text-center border border-primary/10">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              {locale === 'zh' ? '还有其他问题？' : locale === 'en' ? 'Have More Questions?' : 'Bạn có thêm câu hỏi?'}
            </h3>
            <p className="text-slate-500 mb-4 text-sm">
              {locale === 'zh' ? '我们的顾问团队随时为您解答' : locale === 'en' ? 'Our consultant team is always here to help' : 'Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ'}
            </p>
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all">
              {locale === 'zh' ? '咨询顾问 →' : 'Contact a Consultant →'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
