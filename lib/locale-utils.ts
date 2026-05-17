import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';

export function getLocaleParams({ params }: { params: { locale: string } }): Locale {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();
  return locale;
}

// 页面标题翻译
const pageTitles: Record<Locale, Record<string, string>> = {
  zh: {
    home: 'cnfranchise.com - 餐饮茶饮咖啡小吃甜品糖水品牌加盟搜索',
    about: '关于我们 - cnfranchise.com',
    contact: '联系我们 - cnfranchise.com',
    privacy: '隐私政策 - cnfranchise.com',
    terms: '使用条款 - cnfranchise.com',
    categories: '全部分类 - cnfranchise.com',
    search: '搜索品牌 - cnfranchise.com',
    brands: '品牌列表 - cnfranchise.com',
  },
  en: {
    home: 'China Franchise Net - Find Your Perfect Franchise',
    about: 'About Us - China Franchise Net',
    contact: 'Contact Us - China Franchise Net',
    privacy: 'Privacy Policy - China Franchise Net',
    terms: 'Terms of Service - China Franchise Net',
    categories: 'All Categories - China Franchise Net',
    search: 'Search Brands - China Franchise Net',
    brands: 'All Brands - China Franchise Net',
  },
  th: {
    home: 'China Franchise Net - ค้นหาแฟรนไชส์ที่เหมาะกับคุณ',
    about: 'เกี่ยวกับเรา - China Franchise Net',
    contact: 'ติดต่อเรา - China Franchise Net',
    privacy: 'นโยบายความเป็นส่วนตัว - China Franchise Net',
    terms: 'ข้อกำหนดการใช้งาน - China Franchise Net',
    categories: 'หมวดหมู่ทั้งหมด - China Franchise Net',
    search: 'ค้นหาแบรนด์ - China Franchise Net',
    brands: 'รายการแบรนด์ - China Franchise Net',
  },
  vi: {
    home: 'China Franchise Net - Tìm Nhượng Quyền Phù Hợp',
    about: 'Về Chúng Tôi - China Franchise Net',
    contact: 'Liên Hệ - China Franchise Net',
    privacy: 'Chính Sách Bảo Mật - China Franchise Net',
    terms: 'Điều Khoản Dịch Vụ - China Franchise Net',
    categories: 'Tất Cả Danh Mục - China Franchise Net',
    search: 'Tìm Kiếm Thương Hiệu - China Franchise Net',
    brands: 'Tất Cả Thương Hiệu - China Franchise Net',
  },
};

export function getPageTitle(locale: Locale, page: string): string {
  return pageTitles[locale]?.[page] || pageTitles.zh[page] || '';
}
