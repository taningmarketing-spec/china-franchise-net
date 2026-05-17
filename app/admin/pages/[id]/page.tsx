'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ImageUploader from '@/components/admin/ImageUploader';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

interface CmsPageData {
  id?: string; title: string; slug: string; content: string;
  locale: string; status: string; featuredImg?: string;
  seoTitle?: string; seoDesc?: string; showInNav: boolean; sortOrder: number;
}

const LOCALE_OPTIONS = [
  { value: 'zh', label: '🇨🇳 中文' },
  { value: 'en', label: '🇺🇸 English' },
  { value: 'th', label: '🇹🇭 ไทย' },
  { value: 'vi', label: '🇻🇳 Tiếng Việt' },
];

// 特殊页面 slug（用于前台固定路由）
const SPECIAL_PAGES = ['franchise', 'franchisee', 'about'];

// 自动生成 slug
function autoSlug(title: string, locale: string): string {
  if (locale === 'en') {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  return title.toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 从 HTML 提取纯文本
function extractText(html: string): string {
  if (typeof window === 'undefined') return html;
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

// 自动生成 SEO
function generateSeo(title: string, content: string): { seoTitle: string; seoDesc: string } {
  const plainText = extractText(content);
  const seoTitle = title;
  let seoDesc = plainText.trim();
  if (seoDesc.length > 160) {
    seoDesc = seoDesc.substring(0, 160);
    const lastPeriod = seoDesc.lastIndexOf('。');
    const lastComma = seoDesc.lastIndexOf('，');
    const lastBreak = Math.max(lastPeriod, lastComma);
    if (lastBreak > 100) {
      seoDesc = seoDesc.substring(0, lastBreak + 1);
    } else {
      seoDesc = seoDesc.trim() + '...';
    }
  }
  return { seoTitle, seoDesc };
}

export default function PageEditorPage() {
  const router = useRouter();
  const params = useParams();
  const pageId = params?.id as string;
  const isEdit = !!pageId && pageId !== 'new';

  const [form, setForm] = useState<CmsPageData>({
    title: '', slug: '', content: '',
    locale: 'zh', status: 'draft',
    showInNav: false, sortOrder: 0,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch('/api/pages?admin=true')
      .then(r => r.json())
      .then((pages: CmsPageData[]) => {
        const p = pages.find(pg => pg.id === pageId);
        if (p) setForm(p);
        else setError('页面未找到');
      })
      .catch(() => setError('加载失败'))
      .finally(() => setLoading(false));
  }, [pageId, isEdit]);

  const handleAutoSlug = () => {
    if (!form.title) {
      alert('请先输入标题');
      return;
    }
    setForm(prev => ({ ...prev, slug: autoSlug(prev.title, prev.locale) }));
  };

  const handleAutoSeo = () => {
    if (!form.title || !form.content) {
      alert('请先输入标题和内容');
      return;
    }
    const { seoTitle, seoDesc } = generateSeo(form.title, form.content);
    setForm(prev => ({ ...prev, seoTitle, seoDesc }));
  };

  const handleSave = async (statusVal: string) => {
    if (!form.title || !form.slug) {
      alert('请填写标题和别名');
      return;
    }
    setSaving(true);
    setError(null);
    const payload = { ...form, status: statusVal };
    try {
      if (isEdit && form.id) {
        const res = await fetch('/api/pages', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: form.id }),
        });
        if (!res.ok) throw new Error('保存失败');
      } else {
        const res = await fetch('/api/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || '保存失败');
        }
      }
      router.push('/admin/pages');
    } catch (e: any) {
      setError(e.message || '保存失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  const isSpecialPage = SPECIAL_PAGES.includes(form.slug);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="skeleton h-8 w-48 mx-auto mb-4 rounded-lg" />
        <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="skeleton h-32 w-full rounded-lg" />)}</div>
      </div>
    );
  }

  if (error && !form.title) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-red-600">{error}</p>
        <Link href="/admin/pages" className="text-primary text-sm hover:underline mt-2 inline-block">返回列表</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-4">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/pages" className="text-slate-400 hover:text-slate-600 transition-colors">← 返回</Link>
          <h1 className="text-xl font-extrabold text-slate-800">{isEdit ? '编辑页面' : '新建页面'}</h1>
          {isSpecialPage && (
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
              特殊页面
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleSave('draft')} disabled={saving} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-40 cursor-pointer">💾 保存草稿</button>
          <button onClick={() => handleSave('published')} disabled={saving} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark disabled:opacity-40 cursor-pointer flex items-center gap-1.5">🚀 发布页面</button>
        </div>
      </div>

      {/* 特殊页面提示 */}
      {isSpecialPage && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p className="font-medium text-amber-800">这是特殊页面</p>
              <p className="text-sm text-amber-700 mt-1">
                Slug 为 <code className="bg-amber-100 px-1 rounded">{form.slug}</code> 的页面会覆盖前台的固定路由：
                {form.slug === 'franchise' && ' /franchise（成为加盟商）'}
                {form.slug === 'franchisee' && ' /franchisee（成为加盟主）'}
                {form.slug === 'about' && ' /about（关于我们）'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 基本信息 */}
      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">⚙️ 基本信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">页面标题 *</label>
            <input 
              value={form.title} 
              onChange={e => setForm({ ...form, title: e.target.value })} 
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary" 
              placeholder="例：关于我们、加盟流程..." 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">URL Slug *</label>
            <div className="flex gap-2">
              <input 
                value={form.slug} 
                onChange={e => setForm({ ...form, slug: e.target.value })} 
                className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary font-mono" 
                placeholder="about-us" 
              />
              <button
                type="button"
                onClick={handleAutoSlug}
                className="bg-blue-600 text-white px-3 py-2 rounded-xl text-sm hover:bg-blue-700 whitespace-nowrap"
              >
                ✨ 自动生成
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              访问地址：{SPECIAL_PAGES.includes(form.slug) 
                ? `/${form.slug || '{slug}'}` 
                : `/page/${form.slug || '{slug}'}`}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">语言版本</label>
            <select 
              value={form.locale} 
              onChange={e => setForm({ ...form, locale: e.target.value })} 
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white"
            >
              {LOCALE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">排序</label>
            <input 
              type="number" 
              value={form.sortOrder} 
              onChange={e => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} 
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary" 
            />
          </div>
        </div>

        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={form.showInNav} 
              onChange={e => setForm({ ...form, showInNav: e.target.checked })} 
              className="w-4 h-4 rounded border-slate-300" 
            />
            <span className="text-sm text-slate-600">显示在导航栏</span>
          </label>
          <span className="text-xs text-slate-400">勾选后该页面会出现在前台顶部导航菜单中</span>
        </div>
      </div>

      {/* 封面图 - 使用 ImageUploader */}
      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <ImageUploader
          value={form.featuredImg || ''}
          onChange={url => setForm(prev => ({ ...prev, featuredImg: url }))}
        />
      </div>

      {/* 内容编辑器 - 使用 RichTextEditor */}
      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">📝 页面内容</h2>
        <RichTextEditor
          value={form.content}
          onChange={val => setForm(prev => ({ ...prev, content: val }))}
          placeholder="输入页面内容，支持富文本格式..."
        />
        <p className="text-xs text-gray-400 mt-2">支持加粗、斜体、标题、列表、链接、图片、引用等格式</p>
      </div>

      {/* SEO 设置 */}
      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">🔍 SEO 设置（可选）</h2>
          <button
            type="button"
            onClick={handleAutoSeo}
            className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center gap-1.5"
          >
            <span>🤖</span> 一键智能生成 SEO
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              SEO 标题 <span className="text-gray-400 font-normal text-xs">(建议 60 字符以内)</span>
            </label>
            <input 
              value={form.seoTitle || ''} 
              onChange={e => setForm({ ...form, seoTitle: e.target.value })} 
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary" 
              placeholder="搜索引擎显示的标题" 
              maxLength={80}
            />
            {form.seoTitle && (
              <p className="text-xs text-gray-400 mt-0.5">{form.seoTitle.length}/80 字符</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              SEO 描述 <span className="text-gray-400 font-normal text-xs">(建议 160 字符以内)</span>
            </label>
            <textarea 
              value={form.seoDesc || ''} 
              onChange={e => setForm({ ...form, seoDesc: e.target.value })} 
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary h-20 resize-none" 
              placeholder="搜索引擎显示的描述" 
              maxLength={200}
            />
            {form.seoDesc && (
              <p className={`text-xs mt-0.5 ${form.seoDesc.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                {form.seoDesc.length}/160 字符 {form.seoDesc.length > 160 ? '⚠️ 超出建议长度' : ''}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
