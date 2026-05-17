import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_TOKEN = 'cnfranchise_admin_session_v1';

// 登出
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
  return response;
}

// 验证会话
export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token');
  if (!token || token.value !== ADMIN_TOKEN) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, token: ADMIN_TOKEN });
}

// 登录
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: '请输入用户名和密码' }, { status: 400 });
    }

    // 1. 先查数据库管理员
    const dbAdmin = await prisma.admin.findUnique({ where: { username } });

    if (dbAdmin) {
      // 数据库账号：用 bcrypt 验证
      const valid = await bcrypt.compare(password, dbAdmin.password);
      if (!valid) {
        return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
      }
      // 登录成功
      const response = NextResponse.json({
        success: true,
        admin: { id: dbAdmin.id, username: dbAdmin.username, nickname: dbAdmin.nickname }
      });
      response.cookies.set('admin_token', ADMIN_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return response;
    }

    // 2. 数据库没有，回退到 .env 默认账号（平滑迁移用）
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // 第一次登录，自动创建数据库账号
      const hashed = await bcrypt.hash(password, 10);
      const newAdmin = await prisma.admin.create({
        data: { id: randomUUID(), username, password: hashed, nickname: '管理员' }
      });
      const response = NextResponse.json({
        success: true,
        admin: { id: newAdmin.id, username: newAdmin.username, nickname: newAdmin.nickname }
      });
      response.cookies.set('admin_token', ADMIN_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}