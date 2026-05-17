'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUploader from '@/components/admin/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';

const LANGUAGES = [
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
] as const;

interface AdvantageItem {
  icon: string;
  text: string;
}

interface FormData {
  serviceId: string;
  name: string;
  nameEn: string;
  nameTh: string;
  nameVi: string;
  icon: string;
  gallery: string;
  description: string;
  descriptionEn: string;
  descriptionTh: string;
  descriptionVi: string;
  content: string;
  contentEn: string;
  contentTh: string;
  contentVi: string;
  advantages: string;
  advantagesEn: string;
  advantagesTh: string;
  advantagesVi: string;
  sortOrder: number;
  status: string;
}

const emptyForm: FormData = {
  serviceId: '',
  name: '',
  nameEn: '',
  nameTh: '',
  nameVi: '',
  icon: '',
  gallery: '[]',
  description: '',
  descriptionEn: '',
  descriptionTh: '',
  descriptionVi: '',
  content: '',
  contentEn: '',
  contentTh: '',
  contentVi: '',
  advantages: '[]',
  advantagesEn: '[]',
  advantagesTh: '[]',
  advantagesVi: '[]',
  sortOrder: 0,
  status: 'active',
};

function parseGallery(jsonStr: string): string[] {
  try {
    const arr = JSON.parse(jsonStr);
    if (Array.isArray(arr)) return arr.filter(Boolean).slice(0, 3);
    return [];
  } catch { return []; }
}

function parseAdvantages(jsonStr: string): AdvantageItem[] {
  try {
    const arr = JSON.parse(jsonStr);
    if (Array.isArray(arr)) return arr.slice(0, 5);
    return [];
  } catch { return []; }
}

const ADVANTAGE_ICONS = ['💰', '🏢', '📋', '🤝', '🌐', '🚀', '📊', '🔧', '💡', '⭐'];

export default function OverseasServiceNewPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [activeTab, setActiveTab] = useState<'zh' | 'en' | 'th' | 'vi'>('zh');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [advantageItems, setAdvantageItems] = useState<AdvantageItem[]>([]);

  const getNameField = (lang: string) => {
    switch (lang) {
      case 'en': return 'nameEn';
      case 'th': return 'nameTh';
      case 'vi': return 'nameVi';
      default: return 'name';
    }
  };

  const getDescriptionField = (lang: string) => {
    switch (lang) {
      case 'en': return 'descriptionEn';
      case 'th': return 'descriptionTh';
      case 'vi': return 'descriptionVi';
      default: return 'description';
    }
  };

  const getContentField = (lang: string) => {
    switch (lang) {
      case 'en': return 'contentEn';
      case 'th': return 'contentTh';
      case 'vi': return 'contentVi';
      default: return 'content';
    }
  };

  const getAdvantagesField = (lang: string) => {
    switch (lang) {
      case 'en': return 'advantagesEn';
      case 'th': return 'advantagesTh';
      case 'vi': return 'advantagesVi';
      default: return 'advantages';
    }
  };

  useEffect(() => {
    setGalleryImages(parseGallery(form.gallery));
  }, [form.gallery]);

  useEffect(() => {
    const advField = getAdvantagesField(activeTab);
    setAdvantageItems(parseAdvantages(form[advField] as string));
  }, [form[getAdvantagesField(activeTab) as keyof FormData] as string]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/overseas-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || '保存失败');
      }

      router.push('/admin/overseas-services');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateGalleryImage = (index: number, url: string) => {
    const newImages = [...galleryImages];
    newImages[index] = url;
    setGalleryImages(newImages);
    setForm({ ...form, gallery: JSON.stringify(newImages.filter(Boolean)) });
  };

  const removeGalleryImage = (index: number) => {
    const newImages = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(newImages);
    setForm({ ...form, gallery: JSON.stringify(newImages) });
  };

  const addGallerySlot = () => {
    if (galleryImages.length >= 3) return;
    const newImages = [...galleryImages, ''];
    setGalleryImages(newImages);
    setForm({ ...form, gallery: JSON.stringify(newImages.filter(Boolean)) });
  };

  const updateAdvantageText = (index: number, text: string) => {
    const field = getAdvantagesField(activeTab);
    const updated = [...advantageItems];
    updated[index] = { ...updated[index], text };
    setAdvantageItems(updated);
    setForm({ ...form, [field]: JSON.stringify(updated) });
  };

  const updateAdvantageIcon = (index: number, icon: string) => {
    const field = getAdvantagesField(activeTab);
    const updated = [...advantageItems];
    updated[index] = { ...updated[index], icon };
    setAdvantageItems(updated);
    setForm({ ...form, [field]: JSON.stringify(updated) });
  };

  const addAdvantage = () => {
    if (advantageItems.length >= 5) return;
    const field = getAdvantagesField(activeTab);
    const updated = [...advantageItems, { icon: '💡', text: '' }];
    setAdvantageItems(updated);
    setForm({ ...form, [field]: JSON.stringify(updated) });
  };

  const removeAdvantage = (index: number) => {
    const field = getAdvantagesField(activeTab);
    const updated = advantageItems.filter((_, i) => i !== index);
    setAdvantageItems(updated);
    setForm({ ...form, [field]: JSON.stringify(updated) });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/overseas-services" className="text-slate-500 hover:text-slate-700">
          &larr; 返回列表
        </Link>
        <h1 className="text-2xl font-bold">新建出海服务</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息 */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b border-slate-100 pb-2">基本信息</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                服务ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.serviceId}
                onChange={e => setForm({ ...form, serviceId: e.target.value })}
                placeholder="如：legal, ip, logistics"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-slate-400 mt-1">唯一标识，用于URL路径，只能用英文、数字、连字符</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                排序
              </label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={e => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 轮播图片上传（最多3张） */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              轮播图片
              <span className="text-slate-400 font-normal ml-2">（最多3张，用于详情页顶部轮播展示）</span>
            </label>
            
            <div className="space-y-3">
              {galleryImages.map((imgUrl, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="mt-7 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <ImageUploader
                      value={imgUrl}
                      onChange={(url) => updateGalleryImage(idx, url)}
                      placeholder={`图片 ${idx + 1} URL 或上传`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="mt-7 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors shrink-0"
                    title="删除此图片"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              {galleryImages.length < 3 && (
                <button
                  type="button"
                  onClick={addGallerySlot}
                  className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  添加图片（{galleryImages.length}/3）
                </button>
              )}
              
              {galleryImages.length === 0 && (
                <p className="text-xs text-slate-400 mt-1">未上传图片时，详情页将使用图标作为默认展示</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              状态
            </label>
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              className="w-full max-w-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">已启用</option>
              <option value="inactive">已禁用</option>
            </select>
          </div>
        </div>

        {/* 多语言内容 */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b border-slate-100 pb-2">多语言内容</h2>
          
          <div className="flex gap-2 border-b border-slate-200">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setActiveTab(lang.code as typeof activeTab)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === lang.code
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                服务名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form[getNameField(activeTab) as keyof FormData] as string}
                onChange={e => setForm({ ...form, [getNameField(activeTab)]: e.target.value })}
                placeholder={activeTab === 'zh' ? '如：法务咨询' : `服务名称 (${LANGUAGES.find(l => l.code === activeTab)?.label})`}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={activeTab === 'zh'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                简短描述
              </label>
              <textarea
                value={form[getDescriptionField(activeTab) as keyof FormData] as string}
                onChange={e => setForm({ ...form, [getDescriptionField(activeTab)]: e.target.value })}
                placeholder="用于列表页展示的简短描述"
                rows={2}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                详情页内容
              </label>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <RichTextEditor
                  value={form[getContentField(activeTab) as keyof FormData] as string}
                  onChange={value => setForm({ ...form, [getContentField(activeTab)]: value })}
                  placeholder="输入详情页内容..."
                />
              </div>
            </div>

            {/* 优势列表编辑 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  优势列表
                  <span className="text-slate-400 font-normal ml-2">（最多5项，每项含图标+文案）</span>
                </label>
                <button
                  type="button"
                  onClick={addAdvantage}
                  disabled={advantageItems.length >= 5}
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 disabled:opacity-40 transition-colors"
                >
                  + 添加优势
                </button>
              </div>
              <div className="space-y-2">
                {advantageItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <select
                      value={item.icon}
                      onChange={e => updateAdvantageIcon(idx, e.target.value)}
                      className="w-12 text-center border border-slate-200 rounded-lg px-1 py-1.5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0 bg-white"
                    >
                      {ADVANTAGE_ICONS.map(ico => (
                        <option key={ico} value={ico}>{ico}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={item.text}
                      onChange={e => updateAdvantageText(idx, e.target.value)}
                      placeholder={`优势 ${idx + 1} 文案（该语言）`}
                      className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdvantage(idx)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-colors shrink-0"
                      title="删除"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {advantageItems.length === 0 && (
                  <p className="text-xs text-slate-400 py-2">暂无优势，请点击"+ 添加优势"新增</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存'}
          </button>
          <Link
            href="/admin/overseas-services"
            className="px-6 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  );
}
