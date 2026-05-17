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

const defaultSettings: Settings = {
  siteTitle: 'cnfranchise.com',
  siteDesc: '收录餐饮、茶饮、咖啡、小吃、甜品等行业加盟品牌',
  contactWechat: 'cnfranchise',
  contactWhatsapp: '+86 138 0242 9520',
  contactPhone: '+86 138 0242 9520',
  contactEmail: 'leo@weimanduo.cn',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({ ...defaultSettings, ...data });
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading, refetch: fetchSettings };
}