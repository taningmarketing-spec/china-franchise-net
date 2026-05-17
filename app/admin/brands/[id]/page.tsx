'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface BrandData {
  id?: string;
  name: string;
  industry: string;
  franchiseFee: string;
  totalCost: string;
  storesChina: string;
  storesOverseas: string;
  advantage: string;
  highlights: string;
  logo: string;
  banner: string;
  description: string;
  status: string;
  // 扩展字段
  cooperationMode: string;
  contractYears: string;
  deliveryArea: string;
  brandStory: string;
  videoUrl: string;
  brandFeatures: string;
  // SEO 字段
  seoTitle: string;
  seoDesc: string;
  seoKeywords: string;
}

export default function BrandFormPage() {
  const params = useParams();
  const router = useRouter();
  const brandId = params?.id as string;
  const isNew = brandId === 'new';

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [formData, setFormData] = useState<BrandData>({
    name: '', industry: '茶饮', franchiseFee: '', totalCost: '',
    storesChina: '', storesOverseas: '', advantage: '', highlights: '',
    logo: '', banner: '', description: '', status: 'pending',
    cooperationMode: '', contractYears: '', deliveryArea: '',
    brandStory: '', videoUrl: '', brandFeatures: '',
    // SEO 字段
    seoTitle: '', seoDesc: '', seoKeywords: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerUrlRef = useRef<HTMLInputElement>(null);
  const logoUrlRef = useRef<HTMLInputElement>(null);

  // 加载品牌数据
  useEffect(() => {
    if (isNew) return;
    fetch(`/api/brands/${brandId}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setErrors([data.error]); return; }
        const b = data.brand;
        setFormData({
          name: b.name || '',
          industry: b.industry || '茶饮',
          franchiseFee: b.franchiseFee || '',
          totalCost: b.totalCost || '',
          storesChina: String(b.storesChina || ''),
          storesOverseas: String(b.storesOverseas || ''),
          advantage: b.advantage || '',
          highlights: b.highlights || '',
          logo: b.logo || '',
          banner: b.banner || '',
          description: b.description || '',
          status: b.status || 'pending',
          cooperationMode: b.cooperationMode || '',
          contractYears: b.contractYears != null ? String(b.contractYears) : '',
          deliveryArea: b.deliveryArea || '',
          brandStory: b.brandStory || '',
          videoUrl: b.videoUrl || '',
          brandFeatures: b.brandFeatures || '',
          // SEO 字段
          seoTitle: b.seoTitle || '',
          seoDesc: b.seoDesc || '',
          seoKeywords: b.seoKeywords || '',
        });
        setLogoPreview(b.logo || '');
        setBannerPreview(b.banner || '');
      })
      .catch(() => setErrors(['加载品牌数据失败']))
      .finally(() => setLoading(false));
  }, [brandId, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get('name') as string,
      industry: fd.get('industry') as string,
      categorySlug: fd.get('industry') as string,
      franchiseFee: fd.get('franchiseFee') as string,
      totalCost: fd.get('totalCost') as string,
      storesChina: parseInt(fd.get('storesChina') as string) || 0,
      storesOverseas: parseInt(fd.get('storesOverseas') as string) || 0,
      advantage: fd.get('advantage') as string || null,
      highlights: fd.get('highlights') as string || null,
      logo: fd.get('logo') as string || null,
      banner: fd.get('banner') as string || null,
      description: fd.get('description') as string || null,
      status: fd.get('status') as string || 'pending',
      // 新字段
      cooperationMode: fd.get('cooperationMode') as string || null,
      contractYears: fd.get('contractYears') as string || null,
      deliveryArea: fd.get('deliveryArea') as string || null,
      brandStory: fd.get('brandStory') as string || null,
      videoUrl: fd.get('videoUrl') as string || null,
      brandFeatures: fd.get('brandFeatures') as string || null,
      // SEO 字段
      seoTitle: fd.get('seoTitle') as string || null,
      seoDesc: fd.get('seoDesc') as string || null,
      seoKeywords: fd.get('seoKeywords') as string || null,
    };

    try {
      const url = isNew ? '/api/brands' : `/api/brands/${brandId}`;
      const method = isNew ? 'POST' : 'PUT';
      const r = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      if (r.ok) {
        setSaved(true);
        if (!isNew) {
          // 编辑成功后跳转回列表
          setTimeout(() => router.push('/admin/brands'), 1500);
        }
      } else {
        setErrors([data.error || '保存失败']);
      }
    } catch {
      setErrors(['网络错误，请重试']);
    } finally {
      setSubmitting(false);
    }
  };

  // 上传图片
  const handleUpload = async (file: File, type: 'banner' | 'logo') => {
    if (type === 'banner') setUploadingBanner(true);
    else setUploadingLogo(true);

    try {
      const formData_ = new FormData();
      formData_.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData_ });
      const result = await res.json();

      if (result.success) {
        const url = result.url;
        if (type === 'banner') {
          setBannerPreview(url);
          const input = bannerUrlRef.current;
          if (input) {
            const nativeSet = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
            nativeSet.call(input, url);
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
        } else {
          setLogoPreview(url);
          const input = logoUrlRef.current;
          if (input) {
            const nativeSet = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
            nativeSet.call(input, url);
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      } else {
        alert(result.error || '上传失败');
      }
    } catch {
      alert('上传失败，请重试');
    } finally {
      if (type === 'banner') setUploadingBanner(false);
      else setUploadingLogo(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file, type);
    e.target.value = '';
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => setBannerPreview(e.target.value);
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => setLogoPreview(e.target.value);

  const clearImage = (type: 'banner' | 'logo') => {
    if (type === 'banner') {
      setBannerPreview('');
      const input = bannerUrlRef.current;
      if (input) {
        const nativeSet = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
        nativeSet.call(input, '');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } else {
      setLogoPreview('');
      const input = logoUrlRef.current;
      if (input) {
        const nativeSet = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
        nativeSet.call(input, '');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  // 加载中
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="flex items-center gap-3 text-slate-500">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25"/><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"/></svg>
          加载品牌数据...
        </div>
      </div>
    );
  }

  // 保存成功
  if (saved && isNew) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-3">✅</div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">品牌已创建！</h2>
        <Link href="/admin/brands" className="text-primary hover:underline">返回列表</Link>
      </div>
    );
  }

  if (saved && !isNew) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-3">✅</div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">品牌已更新！</h2>
        <p className="text-slate-500 text-sm mb-3">正在跳转回列表...</p>
        <Link href="/admin/brands" className="text-primary hover:underline">返回列表</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/brands" className="text-slate-400 hover:text-slate-600">← 品牌列表</Link>
        <h1 className="text-xl font-extrabold text-slate-800">{isNew ? '新增品牌' : `编辑品牌：${formData.name}`}</h1>
      </div>

      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {errors.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-100 p-6 space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：表单字段 */}
          <div className="lg:col-span-2 space-y-4">

            {/* 基本信息 */}
            <fieldset className="border border-slate-200 rounded-xl p-4">
              <legend className="text-sm font-semibold text-slate-700 px-2">📋 基本信息</legend>
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">品牌名称 *</label>
                  <input name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="例：瑞幸咖啡" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">行业 *</label>
                  <select name="industry" value={formData.industry} onChange={handleChange} required
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                    <option value="茶饮">茶饮</option>
                    <option value="咖啡">咖啡</option>
                    <option value="小吃">小吃</option>
                    <option value="甜品">甜品</option>
                    <option value="糖水">糖水</option>
                    <option value="餐饮">餐饮</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">状态</label>
                  <select name="status" value={formData.status} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                    <option value="pending">待发布</option>
                    <option value="published">已发布</option>
                    <option value="draft">草稿</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">最大优势（卡片橙色标签）</label>
                  <input name="advantage" value={formData.advantage} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="例：手打柠檬茶开创者" />
                  <p className="text-[11px] text-slate-400 mt-0.5">显示在品牌卡片主图下方的橙色横条，建议不超过15字</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">项目亮点</label>
                  <input name="highlights" value={formData.highlights} onChange={handleChange} maxLength={100}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="例：5年海外市场经验、供应链强大" />
                  <p className="text-[11px] text-slate-400 mt-0.5">显示在品牌卡片数据区下方，字数100字以内</p>
                </div>
              </div>
            </fieldset>

            {/* 图片设置 */}
            <fieldset className="border border-slate-200 rounded-xl p-4">
              <legend className="text-sm font-semibold text-slate-700 px-2">🖼️ 图片设置</legend>
              <div className="space-y-4 pt-2">

                {/* Banner */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">主图（Banner）</label>
                  <div className="flex gap-2">
                    <input ref={bannerUrlRef} name="banner" defaultValue={formData.banner} onChange={handleBannerChange}
                      className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      placeholder="https://... 或点击右侧上传" />
                    <button type="button" onClick={() => bannerInputRef.current?.click()} disabled={uploadingBanner}
                      className="px-4 py-2.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-xs font-medium hover:bg-blue-100 disabled:opacity-50 transition-colors whitespace-nowrap flex items-center gap-1.5">
                      {uploadingBanner ? (
                        <><svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25"/><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"/></svg>上传中...</>
                      ) : (
                        <><svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>上传图片</>
                      )}
                    </button>
                    <input ref={bannerInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" className="hidden" onChange={e => handleFileChange(e, 'banner')} />
                  </div>
                  {bannerPreview && (
                    <div className="mt-2 relative inline-block rounded-lg overflow-hidden border border-slate-200">
                      <img src={bannerPreview} alt="Banner预览" className="h-28 w-auto max-w-full object-cover rounded-lg" />
                      <button type="button" onClick={() => clearImage('banner')}
                        className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center text-xs transition-colors">✕</button>
                    </div>
                  )}
                  <p className="text-[11px] text-slate-400 mt-1">支持 JPG/PNG/GIF/WebP，最大 5MB。推荐尺寸 400×250px</p>
                </div>

                {/* Logo */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">品牌 Logo</label>
                  <div className="flex gap-2">
                    <input ref={logoUrlRef} name="logo" defaultValue={formData.logo} onChange={handleLogoChange}
                      className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      placeholder="https://... 或点击右侧上传" />
                    <button type="button" onClick={() => logoInputRef.current?.click()} disabled={uploadingLogo}
                      className="px-4 py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg text-xs font-medium hover:bg-emerald-100 disabled:opacity-50 transition-colors whitespace-nowrap flex items-center gap-1.5">
                      {uploadingLogo ? (
                        <><svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25"/><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"/></svg>上传中...</>
                      ) : (
                        <><svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>上传图片</>
                      )}
                    </button>
                    <input ref={logoInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" className="hidden" onChange={e => handleFileChange(e, 'logo')} />
                  </div>
                  {logoPreview && (
                    <div className="mt-2 relative inline-block rounded-lg overflow-hidden border border-slate-200 bg-white p-2">
                      <img src={logoPreview} alt="Logo预览" className="h-16 w-auto max-w-[160px] object-contain" />
                      <button type="button" onClick={() => clearImage('logo')}
                        className="absolute top-0 right-0 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center text-[10px] transition-colors">✕</button>
                    </div>
                  )}
                  <p className="text-[11px] text-slate-400 mt-1">支持 JPG/PNG/GIF/WebP/SVG，最大 5MB。推荐透明底 PNG</p>
                </div>

              </div>
            </fieldset>

            {/* 费用与门店 */}
            <fieldset className="border border-slate-200 rounded-xl p-4">
              <legend className="text-sm font-semibold text-slate-700 px-2">💰 加盟信息</legend>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">加盟费 *</label>
                  <input name="franchiseFee" value={formData.franchiseFee} onChange={handleChange} required
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="例：15万元" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">总投资</label>
                  <input name="totalCost" value={formData.totalCost} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="例：35万元" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">中国门店数</label>
                  <input name="storesChina" type="number" min="0" value={formData.storesChina} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="例：500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">海外门店数</label>
                  <input name="storesOverseas" type="number" min="0" value={formData.storesOverseas} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="例：20" />
                </div>
              </div>
            </fieldset>

            {/* 品牌介绍 */}
            <fieldset className="border border-slate-200 rounded-xl p-4">
              <legend className="text-sm font-semibold text-slate-700 px-2">📝 品牌介绍</legend>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                placeholder="品牌简介、特色、优势等..." />
            </fieldset>

            {/* 加盟信息模块 */}
            <fieldset className="border border-slate-200 rounded-xl p-4">
              <legend className="text-sm font-semibold text-slate-700 px-2">📋 加盟信息模块</legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">合作模式</label>
                  <select name="cooperationMode" value={formData.cooperationMode} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                    <option value="">请选择</option>
                    <option value="单店加盟">单店加盟</option>
                    <option value="区域代理">区域代理</option>
                    <option value="联营">联营</option>
                    <option value="直营">直营</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">合同年限（年）</label>
                  <input name="contractYears" type="number" min="1" max="20" value={formData.contractYears} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="例：5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">配送地域说明</label>
                  <input name="deliveryArea" value={formData.deliveryArea} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="例：全国配送" />
                </div>
              </div>
            </fieldset>

            {/* 品牌资料 */}
            <fieldset className="border border-slate-200 rounded-xl p-4">
              <legend className="text-sm font-semibold text-slate-700 px-2">🏷️ 品牌资料</legend>
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">品牌故事</label>
                  <textarea name="brandStory" value={formData.brandStory} onChange={handleChange} rows={4}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="品牌创立故事、发展历程等..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">品牌视频 URL</label>
                  <input name="videoUrl" value={formData.videoUrl} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="https://... （YouTube / 腾讯视频 / B站链接）" />
                  {formData.videoUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 aspect-video max-w-sm">
                      <iframe src={formData.videoUrl.includes('youtube') ? formData.videoUrl.replace('watch?v=', 'embed/') : formData.videoUrl}
                        className="w-full h-full" allowFullScreen title="品牌视频预览" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">品牌特色</label>
                  <textarea name="brandFeatures" value={formData.brandFeatures} onChange={handleChange} rows={3}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="品牌特色亮点、补充说明等..." />
                </div>
              </div>
            </fieldset>

            {/* SEO 设置 */}
            <fieldset className="border border-slate-200 rounded-xl p-4">
              <legend className="text-sm font-semibold text-slate-700 px-2">🔍 SEO 设置</legend>
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">SEO 标题</label>
                  <input name="seoTitle" value={formData.seoTitle} onChange={handleChange} maxLength={60}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="留空则使用品牌名（建议不超过60字符）" />
                  <p className="text-[11px] text-slate-400 mt-0.5">当前长度：{formData.seoTitle.length}/60</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">SEO 描述</label>
                  <textarea name="seoDesc" value={formData.seoDesc} onChange={handleChange} rows={3} maxLength={160}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="留空则截取品牌介绍前160字符（建议不超过160字符）" />
                  <p className="text-[11px] text-slate-400 mt-0.5">当前长度：{formData.seoDesc.length}/160</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">SEO 关键词</label>
                  <input name="seoKeywords" value={formData.seoKeywords} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="例：柠檬茶,茶饮加盟,手打柠檬茶" />
                  <p className="text-[11px] text-slate-400 mt-0.5">多个关键词用逗号分隔</p>
                </div>
              </div>
            </fieldset>
          </div>

          {/* 右侧：实时预览 */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <p className="text-xs font-medium text-slate-500 mb-2">📱 卡片预览</p>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="relative h-36 bg-slate-100 overflow-hidden">
                  {bannerPreview ? (
                    <img src={bannerPreview} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                      <span className="text-4xl opacity-20">🏪</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 w-14 h-10 bg-white/95 rounded flex items-center justify-center overflow-hidden p-0.5">
                    {logoPreview ? (
                      <img src={logoPreview} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-[9px] text-slate-300">LOGO</span>
                    )}
                  </div>
                </div>
                <div className="p-3 space-y-1 text-xs">
                  <div className="font-bold text-slate-800 pb-1.5 border-b border-slate-100">
                    {formData.name || '品牌名称'}
                  </div>
                  <div className="flex justify-between"><span className="text-slate-400">中国门店</span><span>{formData.storesChina || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">加盟费</span><span className="font-bold text-primary">{formData.franchiseFee || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">海外门店</span><span>{formData.storesOverseas || '-'}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-3 border-t border-slate-100">
          <button type="submit" disabled={submitting}
            className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-60">
            {submitting ? '保存中...' : '💾 保存品牌'}
          </button>
          <Link href="/admin/brands" className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 inline-flex items-center">取消</Link>
        </div>
      </form>
    </div>
  );
}
