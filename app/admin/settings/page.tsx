'use client';

import { useState, useEffect } from 'react';

interface Settings {
  siteTitle: string;
  siteDesc: string;
  contactWechat: string;
  contactWhatsapp: string;
  contactPhone: string;
  contactEmail: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteTitle: '',
    siteDesc: '',
    contactWechat: '',
    contactWhatsapp: '',
    contactPhone: '',
    contactEmail: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings({
        siteTitle: data.siteTitle || 'cnfranchise.com',
        siteDesc: data.siteDesc || '收录餐饮、茶饮、咖啡、小吃、甜品等行业加盟品牌',
        contactWechat: data.contactWechat || 'cnfranchise',
        contactWhatsapp: data.contactWhatsapp || '+86 138 0242 9520',
        contactPhone: data.contactPhone || '+86 138 0242 9520',
        contactEmail: data.contactEmail || 'leo@weimanduo.cn',
      });
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-slate-400">加载中...</div>;
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-xl font-extrabold text-slate-800">系统设置</h1>
      
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <span className="text-lg">✅</span>
          <span className="font-medium">设置已保存</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SEO 设置 */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">🔍</span>
            SEO 设置
          </h2>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">网站标题</label>
            <input 
              value={settings.siteTitle}
              onChange={e => setSettings({...settings, siteTitle: e.target.value})}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">网站描述</label>
            <textarea 
              value={settings.siteDesc}
              onChange={e => setSettings({...settings, siteDesc: e.target.value})}
              rows={3} 
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
            />
          </div>
        </div>

        {/* 联系方式设置 */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">💬</span>
            联系方式设置
            <span className="text-xs font-normal text-slate-400 ml-2">（显示在"立即咨询"弹窗中）</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                <span className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#07C160"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89l-.007-.033zm-2.713 2.609c.535 0 .969.44.969.982a.976.976 0 01-.97.982.976.976 0 01-.969-.982c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.97.982.976.976 0 01-.969-.982c0-.542.434-.982.97-.982z"/></svg>
                  微信号
                </span>
              </label>
              <input 
                value={settings.contactWechat}
                onChange={e => setSettings({...settings, contactWechat: e.target.value})}
                placeholder="用于复制到剪贴板"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                <span className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp 号码
                </span>
              </label>
              <input 
                value={settings.contactWhatsapp}
                onChange={e => setSettings({...settings, contactWhatsapp: e.target.value})}
                placeholder="+86 138 0242 9520"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                <span className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  电话号码
                </span>
              </label>
              <input 
                value={settings.contactPhone}
                onChange={e => setSettings({...settings, contactPhone: e.target.value})}
                placeholder="+86 138 0242 9520"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                <span className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  邮箱地址
                </span>
              </label>
              <input 
                value={settings.contactEmail}
                onChange={e => setSettings({...settings, contactEmail: e.target.value})}
                placeholder="leo@weimanduo.cn"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" 
              />
            </div>
          </div>
        </div>

        {/* 采集配置（只读展示） */}
        <div className="bg-slate-50 rounded-xl border border-slate-100 p-6">
          <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm">🤖</span>
            采集配置
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-200/60">
              <span className="text-slate-600">每日自动采集</span>
              <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full text-xs">已启用 (06:00)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-200/60">
              <span className="text-slate-600">每次采集数量</span>
              <span className="text-slate-800 font-medium">10 个品牌</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-600">数据来源</span>
              <span className="text-slate-800 font-medium">品牌官网 + 公开数据</span>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={saving}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-600/20"
        >
          {saving ? '保存中...' : '保存设置'}
        </button>
      </form>
    </div>
  );
}