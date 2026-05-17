import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all pages or single page by slug
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const locale = searchParams.get('locale') || 'zh';
    const admin = searchParams.get('admin') === 'true';

    if (slug) {
      // Get specific page by slug
      const page = await prisma.cmsPage.findFirst({
        where: { slug, locale },
      });
      if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
      return NextResponse.json(page);
    }

    // List pages
    const where: any = {};
    if (!admin) where.status = 'published';
    if (locale && !admin) where.locale = locale;

    const pages = await prisma.cmsPage.findMany({
      where: admin ? {} : where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json(pages);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

// POST create new page
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, content, locale, status, featuredImg, seoTitle, seoDesc, showInNav } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    // Check slug uniqueness for this locale
    const existing = await prisma.cmsPage.findFirst({ where: { slug, locale: locale || 'zh' } });
    if (existing) {
      return NextResponse.json({ error: 'Slug already exists for this language' }, { status: 409 });
    }

    const page = await prisma.cmsPage.create({
      data: {
        title,
        slug,
        content: content || '',
        locale: locale || 'zh',
        status: status || 'draft',
        featuredImg: featuredImg || null,
        seoTitle: seoTitle || null,
        seoDesc: seoDesc || null,
        showInNav: showInNav || false,
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}

// PUT update page
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, slug, content, locale, status, featuredImg, seoTitle, seoDesc, showInNav, sortOrder } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const page = await prisma.cmsPage.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(content !== undefined && { content }),
        ...(locale !== undefined && { locale }),
        ...(status !== undefined && { status }),
        ...(featuredImg !== undefined && { featuredImg }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDesc !== undefined && { seoDesc }),
        ...(showInNav !== undefined && { showInNav }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });

    return NextResponse.json(page);
  } catch (e: any) {
    if (e.code === 'P2025') return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    if (e.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

// DELETE page
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.cmsPage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e.code === 'P2025') return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}
