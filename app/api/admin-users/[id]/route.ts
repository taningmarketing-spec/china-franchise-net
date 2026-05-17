import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// 获取单个管理员
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: params.id },
      select: { id: true, username: true, nickname: true, createdAt: true },
    });
    if (!admin) return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    return NextResponse.json({ admin });
  } catch (error) {
    console.error('Admin get error:', error);
    return NextResponse.json({ error: '获取失败' }, { status: 500 });
  }
}

// 更新管理员（用户名/昵称/密码）
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { username, nickname, password } = await req.json();
    const updateData: Record<string, string> = {};

    if (username) {
      const existing = await prisma.admin.findFirst({ where: { username, NOT: { id: params.id } } });
      if (existing) return NextResponse.json({ error: '用户名已被占用' }, { status: 409 });
      updateData.username = username;
    }
    if (nickname !== undefined) updateData.nickname = nickname;
    if (password) {
      if (password.length < 6) return NextResponse.json({ error: '密码至少6位' }, { status: 400 });
      updateData.password = await bcrypt.hash(password, 10);
    }

    const admin = await prisma.admin.update({
      where: { id: params.id },
      data: updateData,
      select: { id: true, username: true, nickname: true, createdAt: true },
    });
    return NextResponse.json({ admin });
  } catch (error) {
    console.error('Admin update error:', error);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}

// 删除管理员
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const total = await prisma.admin.count();
    if (total <= 1) return NextResponse.json({ error: '至少保留一个管理员账号' }, { status: 400 });
    await prisma.admin.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin delete error:', error);
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}