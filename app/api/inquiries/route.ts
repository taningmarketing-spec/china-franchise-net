import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '20');

    const where: any = {};
    if (status && status !== 'all') where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * size,
        take: size,
      }),
      prisma.inquiry.count({ where }),
    ]);

    return NextResponse.json({ inquiries, total, page, size });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, brandId } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: '姓名和电话必填' }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: { name, phone, email, message, brandId },
    });

    return NextResponse.json({ inquiry }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: '提交失败' }, { status: 500 });
  }
}