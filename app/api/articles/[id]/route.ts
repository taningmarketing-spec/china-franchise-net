import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const article = await prisma.article.findUnique({ where: { id: params.id } });
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    // increment view count
    await prisma.article.update({ where: { id: article.id }, data: { viewCount: { increment: 1 } } });
    return NextResponse.json(article);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, content, excerpt, category, locale, status, featuredImg, author, seoTitle, seoDesc, sortOrder } = body;

    const existing = await prisma.article.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Article not found' }, { status: 404 });

    const updated = await prisma.article.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(category !== undefined && { category }),
        ...(locale !== undefined && { locale }),
        ...(status !== undefined && { status }),
        ...(featuredImg !== undefined && { featuredImg }),
        ...(author !== undefined && { author }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDesc !== undefined && { seoDesc }),
        ...(sortOrder !== undefined && { sortOrder }),
        publishedAt: status === 'published' && existing.status !== 'published' ? new Date() : existing.publishedAt,
      },
    });

    return NextResponse.json(updated);
  } catch (e: any) {
    if (e.code === 'P2025') return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.article.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e.code === 'P2025') return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
