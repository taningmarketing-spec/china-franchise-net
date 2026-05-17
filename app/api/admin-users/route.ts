import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

// 获取所有管理员列表
export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, username: true, nickname: true, createdAt: true },
    });
    return NextResponse.json({ admins });
  } catch (error) {
    console.error('Admin list error:', error);
    return NextResponse.json({ error: '获取列表失败' }, { status: 500 });
  }
}

// 创建管理员
export async function POST(req: NextRequest) {
  try {
    const { username, password, nickname } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码必填' }, { status: 400 });
    }
    if (username.length < 3 || password.length < 6) {
      return NextResponse.json({ error: '用户名至少3位，密码至少6位' }, { status: 400 });
    }

    const existing = await prisma.admin.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json({ error: '用户名已存在' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: { id: randomUUID(), username, password: hashed, nickname: nickname || username },
      select: { id: true, username: true, nickname: true, createdAt: true },
    });

    return NextResponse.json({ admin }, { status: 201 });
  } catch (error) {
    console.error('Admin create error:', error);
    return NextResponse.json({ error: '创建失败' }, { status: 500 });
  }
}