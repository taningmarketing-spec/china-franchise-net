import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://cnfranchise.com'),
  title: {
    default: 'cnfranchise.com - 餐饮茶饮咖啡小吃甜品糖水品牌加盟搜索',
    template: '%s | cnfranchise.com',
  },
  description: 'cnfranchise.com，收录餐饮、茶饮、咖啡、小吃、甜品、糖水等行业加盟品牌，提供加盟费、条件、流程等详细信息，助您找到最适合的创业项目。',
  keywords: ['加盟', '特许经营', '餐饮加盟', '茶饮加盟', '咖啡加盟', '小吃加盟', '创业', '投资'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    siteName: 'cnfranchise.com',
    title: 'cnfranchise.com - 餐饮茶饮咖啡小吃甜品糖水品牌加盟搜索',
    description: '收录餐饮、茶饮、咖啡、小吃、甜品、糖水等行业加盟品牌，提供加盟费、条件、流程等详细信息',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'cnfranchise.com',
            url: process.env.SITE_URL || 'https://cnfranchise.com',
            description: 'cnfranchise.com，收录餐饮、茶饮、咖啡、小吃、甜品、糖水等行业加盟品牌',
            sameAs: [],
          }),
        }} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
