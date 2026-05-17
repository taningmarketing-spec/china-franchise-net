import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 仅支持中文和英文，已屏蔽泰文(th)和越南文(vi)
const locales: string[] = ['zh', 'en'];
const defaultLocale = 'zh';
const ADMIN_TOKEN = 'cnfranchise_admin_session_v1';

function getLocale(request: NextRequest): string {
  // 从路径获取
  const segments = request.nextUrl.pathname.split('/');
  const locale = segments[1];
  if (locales.includes(locale)) return locale;

  // 从 accept-language 头获取（仅支持 zh/en）
  const acceptLang = request.headers.get('accept-language') || '';
  for (const lang of acceptLang.split(',').map(l => l.split(';')[0].trim().toLowerCase())) {
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('zh')) return 'zh';
  }

  return defaultLocale;
}

function isAdminAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token');
  return token?.value === ADMIN_TOKEN;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const localeInPath = segments[0];

  // 管理员认证保护
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!isAdminAuthenticated(request)) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  // 检查是否已有 locale 前缀
  if (locales.includes(localeInPath)) {
    // 已有 locale，放行
    return NextResponse.next();
  }

  // 静态资源、API、admin 不需要 locale
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 重定向到默认 locale（不添加前缀）或检测到的 locale
  const locale = getLocale(request);

  if (locale === defaultLocale) {
    // 默认语言重定向到 /zh 前缀
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // 其他语言添加前缀并重定向
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|favicon|.*\\..*).*)'],
};
