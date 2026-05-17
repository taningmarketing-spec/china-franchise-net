import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 获取所有设置
export async function GET() {
  try {
    const settings = await prisma.settings.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => {
      settingsMap[s.key] = s.value;
    });
    
    // 默认联系方式（如果数据库中没有）
    const defaults = {
      contactWechat: 'cnfranchise',
      contactWhatsapp: '+86 138 0242 9520',
      contactPhone: '+86 138 0242 9520',
      contactEmail: 'leo@weimanduo.cn',
      siteTitle: 'cnfranchise.com',
      siteDesc: '收录餐饮、茶饮、咖啡、小吃、甜品等行业加盟品牌',
    };
    
    return NextResponse.json({ ...defaults, ...settingsMap });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// 更新设置（需要管理员权限）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 批量更新设置
    const updates = Object.entries(body).map(async ([key, value]) => {
      await prisma.settings.upsert({
        where: { key },
        create: { key, value: String(value) },
        update: { value: String(value) },
      });
    });
    
    await Promise.all(updates);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}