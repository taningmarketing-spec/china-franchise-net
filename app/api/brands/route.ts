import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { createSlug } from '@/lib/utils';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const industry = searchParams.get('industry');
    const category = searchParams.get('category');

    const where: Prisma.BrandWhereInput = {};
    if (isAdmin && status && status !== 'all') where.status = status;
    else where.status = 'published';
    if (industry) where.industry = industry;
    if (category) where.categorySlug = category;
    const hot = searchParams.get('hot');
    if (hot === 'true') where.isHot = true;

    const [brands, total] = await Promise.all([
      prisma.brand.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.brand.count({ where }),
    ]);

    const [totalBrands, publishedBrands, pendingBrands, todayNew, totalInquiries, totalCategories] = await Promise.all([
      prisma.brand.count(),
      prisma.brand.count({ where: { status: 'published' } }),
      prisma.brand.count({ where: { status: 'pending' } }),
      prisma.brand.count({ where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
      prisma.inquiry.count(),
      prisma.category.count(),
    ]);

    return NextResponse.json({
      brands,
      total,
      stats: { totalBrands, publishedBrands, pendingBrands, todayNew, totalInquiries, totalCategories },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, slug, industry, categorySlug, franchiseFee, totalCost,
      storesChina, storesOverseas, advantage, highlights, description, logo, banner,
      process, support, images, status,
      cooperationMode, contractYears, deliveryArea, brandStory, videoUrl, brandFeatures,
    } = body;

    if (!name) return NextResponse.json({ error: '品牌名称必填' }, { status: 400 });

    const finalSlug = slug || createSlug(name);
    const existing = await prisma.brand.findUnique({ where: { slug: finalSlug } });
    if (existing) return NextResponse.json({ error: 'Slug 已存在' }, { status: 409 });

    const brand = await prisma.brand.create({
      data: {
        name, slug: finalSlug, industry, categorySlug,
        franchiseFee: franchiseFee || '面议', totalCost: totalCost || '面议',
        storesChina: parseInt(storesChina) || 0, storesOverseas: parseInt(storesOverseas) || 0,
        advantage: advantage || null,
        highlights: highlights || null,
        description: description || '', logo, banner,
        process: typeof process === 'string' ? process : JSON.stringify(process || []),
        support: typeof support === 'string' ? support : JSON.stringify(support || []),
        images: typeof images === 'string' ? images : JSON.stringify(images || []),
        status: status || 'pending',
        publishedAt: status === 'published' ? new Date() : null,
        cooperationMode: cooperationMode || null,
        contractYears: contractYears ? parseInt(contractYears) : null,
        deliveryArea: deliveryArea || null,
        brandStory: brandStory || null,
        videoUrl: videoUrl || null,
        brandFeatures: brandFeatures || null,
      },
    });

    return NextResponse.json({ brand }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create brand' }, { status: 500 });
  }
}