import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const locale = searchParams.get('locale') || 'zh';
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (locale) where.locale = locale;
    if (category) where.category = category;
    if (status) where.status = status;

    const [faqs, total] = await Promise.all([
      prisma.faq.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      prisma.faq.count({ where }),
    ]);

    return NextResponse.json({
      faqs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, answer, category, locale, status, sortOrder } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: 'question and answer are required' }, { status: 400 });
    }

    const faq = await prisma.faq.create({
      data: {
        question,
        answer,
        category: category || 'overseas',
        locale: locale || 'zh',
        status: status || 'draft',
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
