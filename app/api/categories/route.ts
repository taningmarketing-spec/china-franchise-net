import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all categories with brand counts
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sort: 'asc' },
    });

    // Get brand counts per category
    const brandsByCategory = await prisma.brand.groupBy({
      by: ['categorySlug'],
      _count: { id: true },
    });
    const countMap: Record<string, number> = {};
    for (const row of brandsByCategory) {
      countMap[row.categorySlug] = row._count.id;
    }

    const result = categories.map(c => ({
      ...c,
      brandCount: countMap[c.slug] || 0,
    }));

    return NextResponse.json({ categories: result });
  } catch (e) {
    console.error('Categories GET error:', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Create category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, icon, desc, color, sort } = body;
    if (!name || !slug) {
      return NextResponse.json({ error: '分类名称和 Slug 不能为空' }, { status: 400 });
    }

    const cat = await prisma.category.create({
      data: {
        name,
        slug,
        icon: icon || null,
        desc: desc || null,
        color: color || '#1a56db',
        sort: sort || 0,
      },
    });
    return NextResponse.json({ category: { ...cat, brandCount: 0 } }, { status: 201 });
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug 已存在，请换一个' }, { status: 409 });
    }
    console.error('Create category error:', e);
    return NextResponse.json({ error: '创建失败' }, { status: 500 });
  }
}
